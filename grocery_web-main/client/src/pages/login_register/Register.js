import React, { useEffect, useState } from 'react'
import FromData from 'form-data';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import img from "../../assets/accont.png"


export default function Register() {

	const navigate = useNavigate();

	const shopTypes = ["Grocery", "Electronics"];

	const [role, setRole] = useState("client");

	const [userImage, setUserImage] = useState(img);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCpassword] = useState("");
	const [shopname, setShopname] = useState("");
	const [shopType, setShopType] = useState(shopTypes[0]);
	const [address, setAddress] = useState("");

	const convertUserIMG = (e) => {
		var fileReader = new FileReader();
		fileReader.readAsDataURL(e.target.files[0]);
		fileReader.onload = () => {
			setUserImage(fileReader.result);
		}
	}

	const handleSubmit = async () => {
		if (role === "client") {
			if (userImage && name && email && password && cpassword) {
				if (password === cpassword) {
					let fromData = new FromData();
					fromData.append("role", role);
					fromData.append("userImage", userImage);
					fromData.append("name", name);
					fromData.append("email", email);
					fromData.append("password", password);

					const result = await axios.post("https://grocery-web-back.onrender.com/register", fromData,);
					navigate('/login');
				} else {
					alert("Password and Confrom Password");
				}
			} else {
				alert("Please Fill The field");
			}
		} else if(role === "shopOwner") {
			if (userImage && name && shopname && shopType && address && email && password && cpassword) {
				if (password === cpassword) {
					let fromData = new FromData();
					fromData.append("role", role);
					fromData.append("userImage", userImage);
					fromData.append("name", name);
					fromData.append("shopname", shopname);
					fromData.append("shopType", shopType);
					fromData.append("address", address);
					fromData.append("email", email);
					fromData.append("password", password);

					const result = await axios.post("https://grocery-web-back.onrender.com/register", fromData,);
					navigate('/login');
				} else {
					alert("Password and Confrom Password");
				}
			} else {
				alert("Please Fill The field");
			}
		}

	}

	return (
		<div className='register'>
			<h1 className='flex registerHeader'>Register</h1>
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
					<div className='clientRegister'>
						<div className='clientInputArea'>
							<div className='input_image_box'>
								<img className='input_image' src={userImage == "" || userImage == null ? img : userImage}></img>
								<input className='image_input' accept='image/*' type='file' name='userImage' onChange={convertUserIMG}></input>
							</div>
							<div class="input_box">
								<input className='input_box' type='text' name='name' required onChange={(e) => setName(e.target.value)}></input>
								<span>Enter User Name</span>
								<i></i>
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
							<div class="input_box">
								<input className='input_box' type='text' name='cpassword' required onChange={(e) => setCpassword(e.target.value)}></input>
								<span>Enter Confirm Password</span>
								<i></i>
							</div>
							<button className='btn' type='submit' onClick={handleSubmit}>Submit</button>
							<Link className='link' to="/login">Login your Account</Link>
						</div>
					</div>
				)
			}
			{
				role === "shopOwner" && (
					<div className='shopOwnerRegister'>
						<div className='leftSide'>
							<div className='input_image_box'>
								<img className='input_image' src={userImage == "" || userImage == null ? img : userImage}></img>
								<input className='image_input' accept='image/*' type='file' name='userImage' onChange={convertUserIMG}></input>
							</div>
							<div class="input_box">
								<input className='input_box' type='text' name='name' required onChange={(e) => setName(e.target.value)}></input>
								<span>Enter Shop Owner Name</span>
								<i></i>
							</div>
							<div class="input_box">
								<input className='input_box' type='text' name='name' required onChange={(e) => setShopname(e.target.value)}></input>
								<span>Enter Shop Name</span>
								<i></i>
							</div>
							<div className="select_box">
								<select className='select_box' onChange={(c) => setShopType(c.target.value)}>
									{
										shopTypes.map((c) => {
											return (
												<option value={c}>{c}</option>
											)
										})
									}
								</select>
							</div>
							<div class="input_box">
								<input className='input_box' type='text' name='name' required onChange={(e) => setAddress(e.target.value)}></input>
								<span>Enter Address</span>
								<i></i>
							</div>
						</div>
						<div className='rightSide'>
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
							<div class="input_box">
								<input className='input_box' type='text' name='cpassword' required onChange={(e) => setCpassword(e.target.value)}></input>
								<span>Enter Confirm Password</span>
								<i></i>
							</div>
							<button className='btn' type='submit' onClick={handleSubmit}>Submit</button>
							<Link className='link' to="/login">Login your Account</Link>
						</div>
					</div>
				)
			}
		</div>
	)
}
