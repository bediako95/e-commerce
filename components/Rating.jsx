import React from "react";
import StarIcon from "@material-ui/icons/Star";

export default function Rating(props) {
	const { rating, numReviews } = props;
	//if rating is greater than 1 show 1 star, else if its half show half star else just show outline of the star
	return (
		<div className="rating">
			<span>
				<i
					className={
						rating >= 1 ? (
							<StarIcon />
						) : rating >= 0.5 ? (
							"fa fa-star-half-o"
						) : (
							"fa fa-star-o"
						)
					}
				></i>
			</span>
			<span>
				<i
					className={
						rating >= 2 ? (
							<StarIcon />
						) : rating >= 1.5 ? (
							"fa fa-star-half-o"
						) : (
							"fa fa-star-o"
						)
					}
				></i>
			</span>
			<span>
				<i
					className={
						rating >= 3 ? (
							<StarIcon />
						) : rating >= 2.5 ? (
							"fa fa-star-half-o"
						) : (
							"fa fa-star-o"
						)
					}
				></i>
			</span>
			<span>
				<i
					className={
						rating >= 4 ? (
							<StarIcon />
						) : rating >= 3.5 ? (
							"fa fa-star-half-o"
						) : (
							"fa fa-star-o"
						)
					}
				></i>
			</span>
			<span>
				<i
					className={
						rating >= 5 ? (
							<StarIcon />
						) : rating >= 4.5 ? (
							"fa fa-star-half-o"
						) : (
							"fa fa-star-o"
						)
					}
				></i>
			</span>

			<span> {numReviews + " reviews"}</span>
		</div>
	);
}
