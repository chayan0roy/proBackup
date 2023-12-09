import React, { useState } from 'react'
import FromData from 'form-data';
import axios from 'axios';
import './Login.css'
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import img from "../../assets/accont.png"


export default function Login({ setIsLogin }) {

	const navigate = useNavigate();

	const [role, setRole] = useState("client");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async () => {
		
		if (email && password) {
			let fromData = new FromData();
			fromData.append("email", email);
			fromData.append("password", password);
			fromData.append("role", role);
			const result = await axios.post("https://grocery-web-back.onrender.com/login", fromData,);
			Cookies.set('auth_token', result.data.auth_token, { expires: 7 });
			setIsLogin(true);
			navigate('/');
		} else {
			alert("Please Fill The field");
		}
	}


	return (
		<div className='login'>
			<h1 className='flex loginHeader'>Login</h1>
			<div className='checkboxArea flex2'>
				<div class="check_box_inpt_area flex">
					<input className='check_box' type='radio' name='role' value={"client"} onChange={(e) => setRole(e.target.value)} defaultChecked></input>
					<h2>Client</h2>
				</div>
				<div class="check_box_inpt_area flex">
					<input className='check_box' type='radio' name='role' value={"shopOwner"} onChange={(e) => setRole(e.target.value)}></input>
					<h2>Shop Owner</h2>
				</div>
			</div>
			{
				role === "client" && (
					<div className='clientlogin'>
						<div className='clientInputArea'>
							<div className='input_image_box'>
								<img className='input_image' src={img}></img>
							</div>
							<div class="input_box">
								<input className='input_box' type='email' name='email' required onChange={(e) => setEmail(e.target.value)}></input>
								<span>Enter Email</span>
								<i></i>
							</div>
							<div class="input_box">
								<input className='input_box' type='text' name='password' required onChange={(e) => setPassword(e.target.value)}></input>
								<span>Enter Password</span>
								<i></i>
							</div>
							<button className='btn' type='submit' onClick={handleSubmit}>Submit</button>
							<Link className='link' to="/register">Create a new account</Link>
						</div>
					</div>
				)
			}
			{
				role === "shopOwner" && (
					<div className='shopOwnerlogin'>
						<div className='shopOwnerInputArea'>
							<div className='input_image_box'>
								<img className='input_image' src={img}></img>
							</div>
							<div class="input_box">
								<input className='input_box' type='email' name='email' required onChange={(e) => setEmail(e.target.value)}></input>
								<span>Enter Email</span>
								<i></i>
							</div>
							<div class="input_box">
								<input className='input_box' type='text' name='password' required onChange={(e) => setPassword(e.target.value)}></input>
								<span>Enter Password</span>
								<i></i>
							</div>
							<button className='btn' type='submit' onClick={handleSubmit}>Submit</button>
							<Link className='link' to="/register">Create a new account</Link>
						</div>
					</div>
				)
			}
		</div>

	)
}
