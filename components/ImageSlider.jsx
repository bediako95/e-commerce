import React, { useState } from "react";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import useStyle from "../utils/style";
import slide_data from "./SliderData";
import Image from "next/dist/client/image";

const ImageSlider = ({ slides }) => {
	const [current, setCurrent] = useState(0);
	const length = slides.length;
	const classes = useStyle();

	//to display the current image

	//method to handle our next slide
	const nextSlide = () => {
		//if current image is the last image then render the first one else render the next one
		setCurrent(current === length - 1 ? 0 : current + 1);
	};
	console.log(current);

	//method to handle our previous slide
	const prevSlide = () => {
		setCurrent(current === 0 ? length - 1 : current - 1);
	};
	console.log(current);

	//if array is empty
	if (!Array.isArray(slides) || slides.length <= 0) {
		return null;
	}
	return (
		<section className={classes.slider}>
			<NavigateBeforeIcon className={classes.left_arrow} onClick={prevSlide} />
			<NavigateNextIcon className={classes.right_arrow} onClick={nextSlide} />
			{slide_data.map((slide, index) => {
				return (
					<div
						className={index === current ? "slide_active" : "slide"}
						key={index}
					>
						{index === current && (
							<img
								src={slide.image}
								alt="Slider images"
								key={slide.id}
								className={classes.asset}
							/>
						)}
					</div>
				);
			})}
		</section>
	);
};

export default ImageSlider;
