/** @format */

import React, { Component } from "react";
import { Table } from "reactstrap";
//import { Button } from "reactstrap";
import "../App.css";

class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userlist: [],
		};
		const myToken = localStorage.getItem("Token");
		console.log('myToken,', myToken);
		fetch("http://localhost:8080/api/users", {
			method: "get",
			headers: {
				"Authorization": myToken,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(`the res:`, res);
				console.log("res.data: ", res.data);
				this.setState({
					userlist: [...res.data],
				});
			});
		if (
			!localStorage.getItem("Name") &&
			!localStorage.getItem("Password")
		) {
			this.props.history.push("/users/signup");
		}
	}
	render() {
		const { userlist } = this.state;
		return (
			<div className='Userspage'>
				<h1 style={{ marginTop: 15 }}>List Users: </h1>
				<div className='listUsers'>
					<Table bordered>
						<thead style={{ backgroundColor: "#ffa5009e" }}>
							<tr>
								<th>Name/Email</th>
								{/* <th>Update Account</th> */}
							</tr>
						</thead>
						{userlist.map((u) => (
							<tbody>
								<tr>
									<td>{u.NameOrEmail}</td>
								</tr>
							</tbody>
						))}
					</Table>
				</div>
			</div>
		);
	}
}

export default Users;
