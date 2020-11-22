/** @format */

import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Users from "./components/Users";
import Students from "./components/Students";
import Signup from "./components/Signup";
import AddStudent from "./components/AddStudent";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className='App'>
				<NavBar />
				<Route path='/' exact component={Home} />
				<Route path='/users' exact component={Users} />
				<Route path='/students' exact component={Students} />
				<Route path='/users/signup' exact component={Signup} />
				<Route
					path='/students/addorupdateStudent'
					exact
					component={AddStudent}
				/>
			</div>
		</Router>
	);
}




export default App;
