import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBInput,
    MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem

} from "mdb-react-ui-kit";
import { ROOT_URL } from "./Localhost";
import swal from 'sweetalert';
//image import
import registerphoto from "../assets/login.webp";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber  } from "firebase/auth";
import { initializeApp } from "firebase/app";
import "firebase/auth";

function Registerpage() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [DropdownValue, setDropdownValue] = useState('')
    const [mobilenumber, setMobileNumber] = useState('')

    //  const navigate = useNavigate();
    //for error messages
    const [emailerror, setemailerror] = useState(false)
    const [userError, setUserError] = useState(false)
    const [passerror, setPasserror] = useState(false)
    const [confirmpasserror, setconfirmpassworderror] = useState(false)
    //for success messages
    //  const[sucess,setSuccess] = useState('')

    useEffect(()=> {
        const firebase_config = {
            apiKey: "AIzaSyBCGhj6Hlsa8bu1SDRKI6uOTwOv8KFrGUc",
            authDomain: "otp-verification-d84c5.firebaseapp.com",
            projectId: "otp-verification-d84c5",
            storageBucket: "otp-verification-d84c5.appspot.com",
            messagingSenderId: "38447685949",
            appId: "1:38447685949:web:5f38ea786946027194a554"
        };
        
        // Initialize Firebase
        initializeApp(firebase_config);
    });


    function userHandler(e) {
        let item = e.target.value;
        if (item.length < 5) {
            setUserError(true);
        }
        else {
            setUserError(false);
        }
    }
    function passHandler(e) {
        let item = e.target.value;
        if (item.length < 5 || item.length > 7) {
            setPasserror(true);
        }
        else {
            setPasserror(false);
        }

    }

    function confirmpassHandler(e) {
        let password_value = document.getElementById('password').value;
        let item = e.target.value;
        if (password_value != item) {
            setconfirmpassworderror(true);
        } else {
            setconfirmpassworderror(false);
        }
    }
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    function emailHandler(e) {
        let item = e.target.value;
        if (!isValidEmail(item)) {
            setemailerror(true);
        } else {
            setemailerror(false);
        }
    }
    const handleDropdownChange = (event) => {
        setDropdownValue(event.target.value);
    };



    const handleSubmit = (event) => {
        let email_value = document.getElementById('email').value;
        let username_value = document.getElementById('username').value;
        let password_value = document.getElementById('password').value;
        if (email_value === "" || username_value === "" || password_value === "") {
            swal("Opps!", "Please fill out all required fields!", "error");
        }
        else {
            event.preventDefault();
            // alert("submit");
            axios.post(ROOT_URL + '/register', { email, username, password, DropdownValue })
                .then(res => {
                    console.log(res);
                    swal("Inserted!", "Registration sucessfully completed!", "success");
                    // navigate('/login');
                })
                .catch(err => console.log(err));


        }
    }

    const validateRecaptcha = () => {
        const auth = getAuth();
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit();
            },
            defaultCountry: "IN"
        });

    }

    const onSignInSubmit = (e) => {
        e.preventDefault();
        validateRecaptcha();
        const phoneNumber = "+91" + mobilenumber; 
        console.log(phoneNumber)
        const appVerifier = window.recaptchaVerifier;
        const auth = getAuth();
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                // ...
                alert("OTP sent successfully")
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                alert("OOps something went wrong")
            });
    }

    return (
        <>
            <form>
                <div id="sign-in-button" />
                <MDBContainer className="container p-3 my-5 h-custom">
                    <MDBRow>
                        <h2 className="text-center text-primary mb-6 ">Register Here!</h2>


                        <MDBCol col="4" md="6" style={{ marginTop: "5%" }}>

                            <MDBInput
                                className="mb-2"
                                placeholder="Email"
                                id="email"
                                type="text"
                                size="lg"
                                name="email"
                                onKeyUp={emailHandler}
                                // required="required"

                                onChange={e => setEmail(e.target.value)}
                            />
                            {emailerror ? <span className='link-danger'>Email invalid</span> : ""}
                            <MDBInput
                                className="mb-2"
                                placeholder="Username"
                                id="username"
                                type="text"
                                size="lg"
                                name="username"
                                onKeyUp={userHandler}
                                required="required"

                                onChange={e => setUsername(e.target.value)}
                            />
                            {userError ? <span className='link-danger'>Username invalid</span> : ""}

                            <MDBInput
                                className="mb-2"
                                placeholder="Mobille Number"
                                id="phone"
                                type="phone"
                                size="lg"
                                name="phone"
                                onChange={e => setMobileNumber(e.target.value)}
                            />

                            <button label="Verify OTP" onClick={onSignInSubmit} >Sent OTP</button>

                            <MDBInput
                                className="mb-2"
                                placeholder="Password"
                                id="password"
                                type="password"
                                size="lg"
                                name="password"
                                onKeyUp={passHandler}

                                // required="required"
                                onChange={e => setPassword(e.target.value)}
                            />
                            {passerror ? <span className='link-danger'>Password Invalid</span> : ""}
                            <MDBInput
                                className="mb-2"
                                placeholder="Confirm password"
                                id="confirmpassword"
                                type="password"
                                size="lg"
                                name="confirmpassword"
                                onKeyUp={confirmpassHandler}
                            // required="required"
                            //   onChange={e =>setconfirmpassword(e.target.value)}
                            />
                            {confirmpasserror ? <span className='link-danger'>Password not match</span> : ""}
                            <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" value={DropdownValue} onChange={handleDropdownChange}>
                                <option value="0" label=' Enter Your Role'></option>
                                <option value="Admin" label='Admin'></option>
                                <option value="User" label='User'></option>
                                <option value="Stuff" label='Stuff'></option>
                            </select>
                            <div className="d-flex justify-content-between mb-4">

                                <p className="small fw-bold mt-2 pt-1 mb-2">
                                    Have an account?{" "}
                                    <Link to='/login' className="link-sucess">
                                        Login
                                    </Link>
                                </p>
                                {/* <a href="!#">Forgot password?</a> */}
                            </div>

                            <div className="text-center text-md-start ">
                                <button type="button" className="mb-0 px-5 btn btn-primary" onClick={handleSubmit} >
                                    Submit
                                </button>

                            </div>
                        </MDBCol>
                        <MDBCol col="10" md="6">
                            <img
                                src={registerphoto}
                                className="img-fluid"
                                alt="Sampleimage"
                                style={{ width: "100%" }}

                            />
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
            </form>
        </>
    );
}
export default Registerpage