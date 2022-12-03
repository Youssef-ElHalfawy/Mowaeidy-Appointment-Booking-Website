import React from "react";
import { Carousel } from "3d-react-carousal";

let slides = [
	<img src="Assets/Images/1.jpg" alt="1" />,
	<img src="Assets/Images/3.jpg" alt="2" />,
	<img src="Assets/Images/4.jpg" alt="3" />,
];

export default function Industry() {
	return (
		<>
			<Carousel slides={slides} autoplay={true} interval={2000} />
		</>
	);
}
