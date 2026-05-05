import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import NavbarComponent from "./NavbarComponent";

const SignInComponent = () => {

    let  [email, getemail] = useState("");
    let  [password, getPassword] = useState("");

    let [loading,setLoading] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");

    // use a hook called useNavigate for automatically changing the route/url
    let navigator = useNavigate()

    const handleSubmit = async (e)=> {
        e.preventDefault();

        setError("")
        setSuccess("")
        setLoading("please wait..........");

        try {
            // create a form data
            const user_data = new FormData();

            // add the email and password to user data
            user_data.append("email", email);
            user_data.append("password", password);

            // use axios to send data to server/ backend and get response
            const response = await axios.post("https://shemriley.alwaysdata.net/api/signin", user_data)
            console.log(response);
            if(response.data.user){
                setLoading("")
                setSuccess(response.data.message)
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigator("/")
            } else {
                setLoading("")
                setError(response.data.message)
            }

        } catch (error) {
            setLoading("")
            setError(error.message);
        }
    };


    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4">
                {/* <NavbarComponent/> */}
            <h2>Sign In</h2>
            <h5 className="text-warning">{loading}</h5>
            <h5 className="text-danger">{error}</h5>
            <h5 className="text-success">{success}</h5>
            <form onSubmit={handleSubmit}
                action="">
                <input type="email" 
                className="form-control my-3" 
                placeholder="Enter Email" 
                required
                onChange={(e)=>{getemail(e.target.value)}} 
                value={email}/>

                <input type="password" 
                className="form-control my-3" 
                placeholder="Enter Password" 
                required
                onChange={(e)=>{getPassword(e.target.value)}}
                value={password}/>

                <button className="btn btn-danger my-3">
                    sign in
                </button>

                <br />
                <Link to="/signUp">Don't have an account? sign up</Link>
            </form> 
            </div>
            
            
        </div>
    );
}

export default SignInComponent