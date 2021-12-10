import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className=" text-white pt-5 pb-4 mx-3">

	<div className="fluid-container text-center text-md-start">

		<div className="row text-center text-md-start">

			<div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
				<h5 className="text-uppercase mb-4 font-weight-bold text-warning">Company Name</h5>
				<p>Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
          ital consectetur lorem ipsum dolor sit amet adipisicing elit.</p>
				
			</div>

			<div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
				<h5 className="text-uppercase mb-4 font-weight-bold text-warning">Products</h5>
			<p>
				<a href="#" className="text-white" style={{ textDecoration: "none"}}> TheProviders</a>
			</p>
			<p>
				<a href="#" className="text-white" style={{ textDecoration: "none"}}> Creativity</a>
			</p>
			<p>
				<a href="#" className="text-white" style={{ textDecoration: "none"}}> SourceFiles</a>
			</p>
			<p>
				<a href="#" className="text-white" style={{ textDecoration: "none"}}> bootstrap 5 alpha</a>
			</p>

			</div>

			<div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
				<h5 className="text-uppercase mb-4 font-weight-bold text-warning">Useful links</h5>
			<p>
				<a href="#" className="text-white"style={{ textDecoration: "none"}}> Your Account</a>
			</p>
			<p>
				<a href="#" className="text-white" style={{ textDecoration: "none"}}> Become an Affiliates</a>
			</p>
			<p>
				<a href="#" className="text-white" style={{ textDecoration: "none"}}>Shipping Rates</a>
			</p>
			<p>
				<a href="#" className="text-white" style={{ textDecoration: "none"}}> Help</a>
			</p>
			</div>

			<div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
				<h5 className="text-uppercase mb-4 font-weight-bold text-warning" >Contact</h5>
				<p>
					<i className="fas fa-home me-3"></i>New York, NY 2333, US
				</p>
				<p>
					<i className="fas fa-envelope me-3"></i>theproviders98@gmail.com
				</p>
				<p>
					<i className="fas fa-phone me-3"></i>+92 3162859445
				</p>
				<p>
					<i className="fas fa-print me-3"></i>+01 335 633 77
				</p>
			</div>
			
		</div>

		<hr className="mb-4" />

		<div className="row align-items-center mx-3">

			<div className="col-md-7 col-lg-8">
				<p>	Copyend ©2020 All ends reserved by:
					<a href="#" style={{ textDecoration: "none"}}>
						<strong className="text-warning"> The Providers</strong>
					</a></p>
				
			</div>

			<div className="col-md-5 col-lg-4">
				<div className="text-center text-md-end">

                <ul className="list-unstyled list-inline">
						<li className="list-inline-item">
							<a href="#" className="btn-floating btn-sm text-white" style={{fontSize: "23px"}}><i className="fab fa-facebook"></i></a>
						</li>
						<li className="list-inline-item">
							<a href="#" className="btn-floating btn-sm text-white" style={{fontSize: "23px"}}><i className="fab fa-twitter"></i></a>
						</li>
						<li className="list-inline-item">
							<a href="#" className="btn-floating btn-sm text-white" style={{fontSize: "23px"}}><i className="fab fa-google-plus"></i></a>
						</li>
						<li className="list-inline-item">
							<a href="#" className="btn-floating btn-sm text-white" style={{fontSize: "23px"}}><i className="fab fa-linkedin-in"></i></a>
						</li>
						<li className="list-inline-item">
							<a href="#" className="btn-floating btn-sm text-white" style={{fontSize: "23px"}}><i className="fab fa-youtube"></i></a>
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
