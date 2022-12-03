import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { NavLink } from "react-router-dom";
import "../css/Hero.css";

export default function Hero() {
	return (
		<>
			<Carousel className="hero" fade>
				<Carousel.Item>
					<div className="imgOne"></div>
					<Carousel.Caption>
						<h1>Easy Scheduling ahead</h1>
						<p>
							Mowaeidy adapts to both you and your team's scheduling
							preferences. Co-host aclient call with a colleague, email
							reminders and follow-ups, and integrate everything with your
							preferred software tools
						</p>
						<NavLink to="/signUp" className="btn btn-warning">
							Get Started
						</NavLink>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<div className="imgTwo"></div>
					<Carousel.Caption>
						<h1>Easy Scheduling ahead</h1>
						<p className="mt-3">
							Mowaeidy adapts to both you and your team's scheduling
							preferences. Co-host aclient call with a colleague, email
							reminders and follow-ups, and integrate everything with your
							preferred software tools
						</p>
						<NavLink to="/signUp" className="btn btn-warning">
							Get Started
						</NavLink>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<div className="imgThree"></div>
					<Carousel.Caption>
						<h1>Easy Scheduling ahead</h1>
						<p className="mt-3">
							Mowaeidy adapts to both you and your team's scheduling
							preferences. Co-host aclient call with a colleague, email
							reminders and follow-ups, and integrate everything with your
							preferred software tools
						</p>
						<NavLink to="/signUp" className="btn btn-warning">
							Get Started
						</NavLink>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
		</>
	);
}
