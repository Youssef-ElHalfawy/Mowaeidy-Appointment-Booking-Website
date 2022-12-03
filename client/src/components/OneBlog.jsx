import React, { useState } from "react";
import "../css/OneBlog.min.css";

export default function OneBlog({ blog }) {
	const { blogHeader, blogBody, blogDate, blogPicture } = blog;

	const [showText, setShowText] = useState(false);

	return (
		<>
			<div className="card border-light mb-5 mt-5 Box">
				<div className="row g-0">
					<div className="col-md-4">
						<img src={blogPicture} className="img-fluid  myImg" alt="..." />
					</div>
					<div className="col-md-8 d-flex flex-column justify-content-between">
						<div className="card-body">
							<div className="d-flex justify-content-between">
								<h3 className="card-title text-primary text-start">
									{blogHeader}
								</h3>
								<img
									src="/Assets/Images/Group 46.png"
									className="bg-blog-img d-md-block"
									alt="..."
								/>
							</div>
							<p className="card-text text-dark lead text-start ">
								<span>
									{showText ? blogBody : `${blogBody.slice(0, 100)}...`}
								</span>
								<button
									className="btn btn-sm border-0 p-0 ms-1 text-dark text-decoration-underline"
									onClick={() => setShowText(!showText)}
								>
									{showText ? "Less" : "Show"} More
								</button>
							</p>
						</div>
						<p className="card-text text-dark text-start mx-4 mb-3">
							<small className="text-muted  ">
								{blogDate.slice(0, blogDate.indexOf("T"))}
							</small>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
