/** @format */

import React, { Component } from "react";
import { Table } from "reactstrap";
import { Button } from "reactstrap";
import "../App.css";

class Students extends Component {
	constructor(props) {
		super(props);
		this.state = {
			studentlist: [],
		};

		this.getStudents();

		if (
			!localStorage.getItem("Name") &&
			!localStorage.getItem("Password")
		) {
			this.props.history.push("/users/signup");
		}
	}
	render() {
		const { studentlist } = this.state;
		return (
			<div className='Studentspage'>
				<div className='titleStudentPage'>
					<h1 style={{ margin: 22, display: "inline-block" }}>
						List Students:{" "}
					</h1>
					<Button
						outline
						color='warning'
						onClick={() => {
							this.props.history.push(
								"/students/addorupdateStudent"
							);
						}}>
						<a
							href='/students/addorupdateStudent'
							style={{ textDecoration: "none", color: "black" }}>
							Add new Student
						</a>
					</Button>{" "}
				</div>
				<div className='listStudents'>
					<Table bordered>
						<thead style={{ backgroundColor: "#ffa5009e" }}>
							<tr>
								<th>Fullname</th>
								<th>DateOfBirth</th>
								<th>Class</th>
								<th>Address</th>
								<th>Update</th>
							</tr>
						</thead>
						{studentlist.map((stu) => (
							<tbody>
								<tr>
									<td>{stu.Fullname}</td>
									<td>{stu.DateOfBirth}</td>
									<td>{stu.Class}</td>
									<td>{stu.Address}</td>
									<td>
										<Button
											outline
											color='success'
											className='btnupdateUser'
											onClick={() => {
												this.props.history.push(
													"/students/addorupdateStudent",
													{ student: stu }
												);
											}}>
											Edit
										</Button>
										<Button
											outline
											color='danger'
											onClick={() => {
												window.confirm(
													"Are you sure you wish to delete this item?"
												) &&
													this.handleClickDelete(stu);
											}}>
											Delete
										</Button>
									</td>
								</tr>
							</tbody>
						))}
					</Table>
				</div>
			</div>
		);
	}

	getStudents = () => {
		fetch("http://localhost:8080/api/students", {
			method: "get",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json()) //convert to json
			.then((res) => {
				// check message, error, show dialog ...
				console.log(`get users:`, res);
				console.log("res.data: ", res.data);
				this.setState({
					studentlist: [...res.data],
				});
			});
	};

	handleClickDelete = (student) => {
		console.log("id: ", student._id);
		fetch(`http://localhost:8080/students/${student._id}`, {
			method: "delete",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json()) //convert to json
			.then((res) => {
				switch (res.success) {
					case true:
						// reload data here
						this.getStudents();
						break;
					case false:
						alert("Deletion failed!");
						break;
				}
			});
	};
	handleClickEdit = (student) => {
		console.log("id: ", student._id);
		fetch(`http://localhost:8080/students/${student._id}`, {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => {
				switch (res.success) {
					case true:
						this.props.history.pop();
						break;
					case false:
						alert("Update failed!");
						break;
				}
			});
	};
}

export default Students;
