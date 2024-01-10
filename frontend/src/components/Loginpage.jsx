import React from "react";
import { useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBInput,

} from "mdb-react-ui-kit";
import { ROOT_URL } from "./Localhost";
import swal from 'sweetalert';
//for image import
import loginphoto from "../assets/login.webp";
function Loginpage() {

    const [values, Setvalues] = useState({
        email: '',
        password: '',

    })



    //for error messages
    const [errors, setError] = useState('')
    //for success messages
    const [sucess, setSuccess] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();

        //  alert("submit");

        axios.post(ROOT_URL + '/login', values)
            .then(res => {
                // setUserId(res.data.user_id);
                if (res.data.Status === "sucess") {
                   
               
                    alert("Login Sucessful");
                    swal("Sucessfully login!", "hiii", "success");
                     window.location.assign(`/welcomepage/${values.email}`);
                     console.log(values);

                     
                    setSuccess(res.data.sucess);
                } else {

                    setError(res.data.error);
                    console.log("error occurred");
                }
            })
            .catch(err => console.log(err))
    }



    return (
        <>
            <form onSubmit={handleSubmit}>
                <MDBContainer className="container p-5 my-5 h-custom">
                    <MDBRow >
                        {/* <h2 className="text-center text-primary ">Login</h2> */}
                        <MDBCol col="10" md="6">
                            <img
                                src={loginphoto}
                                className="img-fluid"
                                alt="noimage"
                                style={{ width: "100%" }}
                            />
                        </MDBCol>

                        <MDBCol col="4" md="6" style={{ marginTop: "6%" }}>
                            <MDBInput
                                wrapperClass="mb-4"
                                placeholder="Email"
                                id="formControlLg"
                                type="text"
                                size="lg"
                                name="email"
                                value={values.username}

                                onChange={e => Setvalues({ ...values, email: e.target.value })}
                            />
                            <MDBInput
                                wrapperClass="mb-4"
                                placeholder="Password"
                                id="formControlLg"
                                type="password"
                                size="lg"
                                name="password"
                                onChange={e => Setvalues({ ...values, password: e.target.value })}
                            />
                            <div className='text-danger'>
                                {errors && errors}
                            </div>
                            <div className="d-flex justify-content-between mb-4">

                                <p className="small fw-bold mt-2 pt-1 mb-2">
                                    Don't have an account?{" "}
                                    <Link to='/' className="link-danger">
                                        Register
                                    </Link>
                                </p>
                                <Link href="!#">Forgot password?</Link>
                            </div>
                            

                            <div className="text-center text-md-start ">
                                <button className="mb-0 px-5 btn btn-primary" disabled={!values.email || !values.password} >
                                    Login
                                </button>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </form>



        </>
    );
}

export default Loginpage;
