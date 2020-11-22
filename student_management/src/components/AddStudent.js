/** @format */

import React, { Component } from "react";
import "../App.css";
import logo from "../images/calvary-logo.png";

class AddStudent extends Component {
	constructor(props) {
		super(props);

		let student = undefined;
		if (this.props.location.state) {
			student = this.props.location.state.student;
		}
		this.state = {
			studentId: (student && student._id) || "",
			Fullname: (student && student.Fullname) || "",
			DateOfBirth: (student && student.DateOfBirth) || "",
			Class: (student && student.Class) || "",
			Address: (student && student.Address) || "",
		};
	}
	render() {
		const { Fullname, DateOfBirth, Class, Address } = this.state;
		return (
			<div className='addStudent_form'>
				<div className='sub_container'>
					<div className='form_addStudent'>
						<div className='card'>
							<article className='card-body'>
								<img
									src={logo}
									alt='logo_academy'
									className='logo_academy'
								/>
								<h4 className='card-title text-center mb-4 mt-1'>
									Add new Student
								</h4>
								<hr />

								<form onSubmit={this.handleSubmit}>
									<div className='form-group'>
										<div className='input-group'>
											<div className='input-group-prepend'>
												<span className='input-group-text'>
													<i className='fa fa-user' />
												</span>
											</div>
											<input
												name
												className='form-control'
												placeholder='Fullname?'
												type='name'
												onChange={(event) => {
													this.setState({
														Fullname:
															event.target.value,
													});
												}}
												value={Fullname || ""}
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
												placeholder='DateOfBirth?'
												type='name'
												onChange={(event) => {
													this.setState({
														DateOfBirth:
															event.target.value,
													});
												}}
												value={DateOfBirth || ""}
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
												placeholder='class?'
												type='name'
												onChange={(event) => {
													this.setState({
														Class:
															event.target.value,
													});
												}}
												value={Class || ""}
											/>
										</div>{" "}
										{/* input-group.// */}
									</div>{" "}
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
												placeholder='address?'
												type='name'
												onChange={(event) => {
													this.setState({
														Address:
															event.target.value,
													});
												}}
												value={Address || ""}
											/>
										</div>{" "}
										{/* input-group.// */}
									</div>{" "}
									<p className='note_signup'>
										Please add enough information!
									</p>
									<div className='form-group'>
										<button
											type='submit'
											className='btn btn-primary btn-block'>
											{" "}
											Add
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
		const { studentId, Fullname, DateOfBirth, Class, Address } = this.state;
		const url = !studentId
			? "http://localhost:8080/students/addnewStudent"
			: `http://localhost:8080/students/update/${studentId}`;
		const method = !studentId ? "post" : "put";
		const errorMessage = !studentId
			? "Invalid Adding!Fill enough 4 information follow the  ( ex: Nguyen Van A; day/month/year ; 6A; abc,def)"
			: "To edit: You must fill enough 4 information follow the rule( ex: Nguyen Van A; day/month/year ; 6A; abc,def)";
		fetch(url, {
			method,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				Fullname,
				DateOfBirth,
				Class,
				Address,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.success) {
					this.props.history.push("/students");
				} else {
					alert(errorMessage);
				}
			});
	};
}

export default AddStudent;
