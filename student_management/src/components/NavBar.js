/** @format */

import React, { useState } from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from "reactstrap";
import { useHistory } from "react-router-dom";

import iconSchool from "../images/mortarboard.svg";
const NavBar = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const history = useHistory();
	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color='light' light expand='md'>
				<NavbarBrand href='/'>Welcome!</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className='mr-auto' navbar>
						<NavItem>
							<NavLink href='/'>Home</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								onClick={() => {
									if (
										localStorage.getItem("Name") &&
										localStorage.getItem("Password")
									) {
										history.push("/users");
									} else {
										alert(
											"đăng nhập để xem danh sách người dùng!"
										);
									}
								}}>
								Users
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								onClick={() => {
									if (
										localStorage.getItem("Name") &&
										localStorage.getItem("Password")
									) {
										history.push("/students");
									} else {
										alert(
											"đăng nhập để xem danh sách học sinh!"
										);
									}
								}}>
								Students
							</NavLink>
						</NavItem>
					</Nav>
					<NavbarBrand style={{ fontSize: "17px" }}>
						<img src={iconSchool} alt='icon1' width={20} />
						Calvary Christian Academy
					</NavbarBrand>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default NavBar;
