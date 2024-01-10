import React from 'react'
import { ROOT_URL } from "./Localhost";
import { useState, useEffect } from 'react';
import axios from 'axios'

function Welcomepage(props) {
    const [user, setuser] = useState([])

    useEffect(() => {
        const _useremail = window.location.href.split("/")[window.location.href.split("/").length - 1]
        axios.get(ROOT_URL + `/welcomepage/${_useremail}`)
            .then((res) => { console.log(res); setuser(res.data) })

            .catch(err => console.log(err));

    }, []);

    return (
        <>
            {/* <div style={{ background: "linear-gradient(to bottom, #33ccff 0%, #ff99cc 100%" }}>
                {
                    user.map((data) => {
                        return (
                            <h1 className="display-5 text-center" style={{ marginTop: "20%" }}>Welcome {data.username} As a {data.role} </h1>

                        )
                    })

                }
            </div> */}
            <div>
            <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="card col-md-4 bg-white shadow-md p-5">
                <div className="mb-4 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-success bi bi-check-circle" width="75" height="75"
                        fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path
                            d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                    </svg>
                </div>
                <div class="text-center">
                    <h1>Welcome !</h1>
                    {
                    user.map((data) => {
                        return (
                            <p>{data.username} AS a {data.role} </p>
                        )
                    })

                }
                    
                    <button className="btn btn-outline-success" >Back Home</button>
                </div>
            </div>
            </div>
            </div>
        </>  
    )         

        



            {/* <h2>welcome</h2>

        <table className='table'>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.map((data,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{data.email_id}</td>
                                    <td>{data.username}</td>
                                    <td>{data.role}</td>
                                </tr>
                            )
                        })
                  
                   }
                </tbody>
            </table> */}

}

export default Welcomepage
