import { Star } from "@material-ui/icons";
import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Store = createContext();

const initialState = {
	darkMode: false,
	cart: {
		//Fetching cart items from the cookie
		cartItems: Cookies.get("cartItems")
			? JSON.parse(Cookies.get("cartItems"))
			: [],
	},
};

function reducer(state, action) {
	switch (action.type) {
		case "DARK_MODE_ON":
			return { ...state, darkMode: true };
		case "DARK_MODE_OFF":
			return { ...state, darkMode: false };
		case "CART_ADD_ITEM": {
			//new item is the product we are adding to the cart
			const newItem = action.payload;
			//checking cart items in the state they are in and comparing the item id with item added to cart
			const existItem = state.cart.cartItems.find(
				(item) => item._id === newItem._id
			);

			//checking the existence of cart items and update it's quantity
			const cartItems = existItem
				? state.cart.cartItems.map((item) =>
						item.name === existItem.name ? newItem : item
				  )
				: //storing previous state and updating it when items is cart
				  [...state.cart.cartItems, newItem];

			//setting cookie to save cart items
			Cookies.set("cartItems", JSON.stringify(cartItems));
			return { ...state, cart: { ...state.cart, cartItems } };
		}

		case "CART_REMOVE_ITEM": {
			//Getting rid of items in the payload(items we want to delete based on the function)
			//remove items whose id ==action.payload._id
			const cartItems = state.cart.cartItems.filter(
				(item) => item._id !== action.payload._id
			);
			//setting cookie to save our deleted  items
			Cookies.set("cartItems", JSON.stringify(cartItems));
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		default:
			return state;
	}
}
export function StoreProvider(props) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };
	//Store provider will wrap around our store component and all components inside the store component will have access to  the store provider
	return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
