import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className=" text-white pt-5 pb-4 mx-3">

	<div className="fluid-container text-center text-md-start">

		<div className="row align-items-center mx-3">

			<div className="col-md-7 col-lg-8">
				<p>	Copyright ©2021 All rights reserved by:
					<a href="#" style={{ textDecoration: "none"}}>
						<strong style={{color: "#ff1744"}} > The Blitzkreig</strong>
					</a></p>
				
			</div>

			<div className="col-md-5 col-lg-4">
				<div className="text-center text-md-end">

                <ul className="list-unstyled list-inline">
						<li className="list-inline-item">
							<a href="/game" className="btn-floating btn-sm text-white" style={{fontSize: "23px"}}><i className="fas fa-gamepad"></i></a>
						</li>
						<li className="list-inline-item">
							<a href="/leaderboard" className="btn-floating btn-sm text-white" style={{fontSize: "23px"}}><i className="fas fa-chart-bar"></i></a>
						</li>
						<li className="list-inline-item">
							<a href="/market" className="btn-floating btn-sm text-white" style={{fontSize: "23px"}}><i className="fas fa-shopping-cart"></i></a>
						</li>
						<li className="list-inline-item">
							<a href="#" className="btn-floating btn-sm text-white" style={{fontSize: "23px"}}><i className="fab fa-app-store-ios"></i></a>
						</li>
						<li className="list-inline-item">
							<a href="/faq" className="btn-floating btn-sm text-white" style={{fontSize: "23px"}}><i className="fas fa-question-circle"></i></a>
						</li>
					</ul>
					
				</div>
				
			</div>
			
		</div>

	</div>
	
</footer>
  );
}

export default Footer;
