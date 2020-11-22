/** @format */

import React, { Component } from "react";
import logo from "../images/calvary-logo.png";

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			NameOrEmail: "",
			Password: "",
		};
	}
	render() {
		return (
			<div className='signup_form'>
				<div className='sub_container'>
					<div className='form_singin'>
						<div className='card'>
							<article className='card-body'>
								<img
									src={logo}
									alt='logo_academy'
									className='logo_academy'
								/>
								<h4 className='card-title text-center mb-4 mt-1'>
									Sign up
								</h4>
								<hr />
								<p className='text-success text-center'>
									We need some information!
								</p>
								<form onSubmit={this.handleSubmit}>
									<div className='form-group'>
										<div className='input-group'>
											<div className='title_signup'>
												<p>
													Enter your Email or Fullname
													(don't leave blank!)
												</p>
											</div>
											<div className='input-group-prepend'>
												<span className='input-group-text'>
													<i className='fa fa-user' />
												</span>
											</div>
											<input
												name
												className='form-control'
												placeholder='email/name?'
												type='name'
												onChange={(event) => {
													this.setState({
														NameOrEmail:
															event.target.value,
													});
												}}
											/>
										</div>{" "}
										{/* input-group.// */}
									</div>{" "}
									{/* form-group// */}
									<div className='form-group'>
										<div className='input-group'>
											<p className='title_signup'>
												Enter your password (at least 6
												characters,both numbers and
												letters)
											</p>
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
												onChange={(event) => {
													this.setState({
														Password:
															event.target.value,
													});
												}}
											/>
										</div>{" "}
										{/* input-group.// */}
									</div>{" "}
									{/* form-group// */}
									<p className='note_signup'>
										If you use your email to sign up, your
										userName is exact your email
									</p>
									<div className='form-group'>
										<button
											type='submit'
											className='btn btn-primary btn-block'>
											{" "}
											Sign up
										</button>
									</div>
									{/* form-group// */}
								</form>
							</article>
						</div>
					</div>
				</div>
			</div>
		);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { NameOrEmail, Password } = this.state;
		fetch("http://localhost:8080/users/signup", {
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
				// check message, error, show dialog ...
				console.log(`res:`, res);
				switch (res.success) {
					case true:
						localStorage.setItem("Name", NameOrEmail);
						localStorage.setItem("Password", Password);
						this.props.history.push("/");
						break;
					case false:
						alert("Invalid account!");
						break;
				}
			});
	};
}

export default Signup;
