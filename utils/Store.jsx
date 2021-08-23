import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
	darkMode: false,
	cart: {
		cartItems: [],
	},
};

function reducer(state, action) {
	switch (action.type) {
		case "DARK_MODE_ON":
			return { ...state, darkMode: true };
		case "DARK_MODE_OFF":
			return { ...state, darkMode: false };
		case "CART_ADD_ITEM":
			//new item is the product we are adding to the cart
			const newItem = action.payload;
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
