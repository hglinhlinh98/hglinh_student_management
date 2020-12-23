/** @format */

import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "../App.css";
import logo from "../images/calvary-logo.png";
import background from "../images/backgroundhome.jpg";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: localStorage.getItem("Name"),
			NameOrEmail: "",
			Password: "",
		};
	}

	render() {
		const { username } = this.state;
		return (
			<div
				className='Homepage'
				style={{ backgroundImage: `url(${background})` }}>
				<Helmet>
					<script
						src='https://code.jquery.com/jquery-3.5.1.slim.min.js'
						integrity='sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj'
						crossorigin='anonymous'></script>
					<script
						src='https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js'
						integrity='sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx'
						crossorigin='anonymous'></script>
				</Helmet>
				<div class='container'>
					<div class='card border-0 shadow my-5'>
						<div class='card-body p-5'>
							<img
								src={logo}
								alt='logo_academy'
								className='logo_academy'
							/>
							<h1 class='font-weight-light'>
								Welcome to Student management website!
							</h1>
							<p class='lead'>
								Education is the most powerful weapon we can use
								to change the world!
							</p>

							{!username && (
								<div>
									<p class='lead2'>
										Please Sign in or Sign up!
									</p>
									<div className='sub_container'>
										<div className='form_singin'>
											<div className='card'>
												<article className='card-body'>
													<h4 className='card-title text-center mb-4 mt-1'>
														Sign in
													</h4>
													<hr />
													<p className='text-success text-center'>
														Enter your account!
													</p>
													<form
														onSubmit={
															this.handleSubmit
														}>
														<div className='form-group'>
															<div className='input-group'>
																<div className='input-group-prepend'>
																	<span className='input-group-text'>
																		{" "}
																		<i className='fa fa-user' />{" "}
																	</span>
																</div>
																<input
																	name
																	className='form-control'
																	placeholder='Email or Name'
																	type='name'
																	onChange={(
																		event
																	) => {
																		this.setState(
																			{
																				NameOrEmail:
																					event
																						.target
																						.value,
																			}
																		);
																	}}
																/>
															</div>{" "}
															{/* input-group.// */}
														</div>{" "}
														{/* form-group// */}
														<div className='form-group'>
															<div className='input-group'>
																<div className='input-group-prepend'>
																	<span className='input-group-text'>
																		{" "}
																		<i className='fa fa-lock' />{" "}
																	</span>
																</div>
																<input
																	className='form-control'
																	placeholder='******'
																	type='password'
																	onChange={(
																		event
																	) => {
																		this.setState(
																			{
																				Password:
																					event
																						.target
																						.value,
																			}
																		);
																	}}
																/>
															</div>{" "}
															{/* input-group.// */}
														</div>{" "}
														{/* form-group// */}
														<div className='form-group'>
															<button
																type='submit'
																className='btn btn-primary btn-block'>
																{" "}
																Login
															</button>
														</div>{" "}
														{/* form-group// */}
														<p className='text-center'>
															<a
																href='#'
																className='btn'
																style={{
																	color:
																		"green",
																}}>
																Forgot password?
															</a>
														</p>
													</form>
												</article>
											</div>
										</div>

										<a
											href='/users/signup'
											className='singup'>
											Sign up?
										</a>
									</div>
								</div>
							)}

							{username && (
								<div>
									<p className='lead2'>Hello {username}</p>
									<div className='sub_container'>
										<button className = "logout_btn" onClick={this.onLogout}>
											{" "}
											Logout{" "}
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const { NameOrEmail, Password } = this.state;
		fetch("http://localhost:8080/api/login", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				NameOrEmail,
				Password,
			}),
		})
			.then((res) => res.json()) 
			.then((res) => {
				// console.log(`res:`, res);
				switch (res.success) {
					case true:
						localStorage.setItem("Token",
						"Bearer " + res.token);
						localStorage.setItem("Name", NameOrEmail);
						localStorage.setItem("Password", Password);
						this.props.history.push("/students");
						break;
					case false:
						alert("Incorrect account!");
						break;
				}
			});
	};

	onLogout = () => {
		localStorage.setItem("Name", "");
		localStorage.setItem("Password", "");
		this.setState({ username: null });
	};
}

export default Home;
