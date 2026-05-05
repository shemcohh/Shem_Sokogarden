import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
// import NavbarComponent from "./NavbarComponent";

const SignUpComponent = () => {
    let [username, updateUsername] = useState("");
    let [email, updateEmail] = useState("");
    let [phone, updatePhone] = useState("");
    let [password, updatePasswoord] = useState("");

    let [loading, setLoading] = useState("")
    let [error, setError] = useState("")
    let [success, setSuccess] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();

        // alertuser
        setError("")
        setSuccess("")
        setLoading("Submitting data! please wait...")

        console.log(username, email, phone, password);
        // try send data to backend api
        try {
            // create form data
            const user_data = new FormData();
            user_data.append("username", username);
            user_data.append("email", email);
            user_data.append("phone", phone);
            user_data.append("password", password);

            const response = await axios.post("https://shemriley.alwaysdata.net/api/signup", user_data)
            console.log(response);
            setSuccess(response.data.message)
            setLoading("")
        } catch (error) {
            console.log(error);
            setLoading("")
            setError(error.message);
        }
    }
    return (
        <div className="row justify-content-center mt-4">
        <div className="col-md-6 card shadow p-4">
            {/* <NavbarComponent/> */}
            <h2>Create Account</h2>
            <h5 className="text-warning">{loading}</h5>
            <h5 className="text-danger">{error}</h5>
            <h5 className="text-success">{success}</h5>
            <form  onSubmit={handleSubmit}
                 action="">
                <input
                 type="Email"
                className="form-control my-3"
                 placeholder="Enter email" 
                 onChange={(e)=>{updateEmail(e.target.value)}} 
                 required
                  value={email}/>

                <input
                 type="text" 
                 className="form-control my-3"
                  placeholder="Enter username" 
                  onChange={(e)=>{updateUsername(e.target.value)}} 
                  required 
                  value={username}/>

                <input
                 type="tel" 
                 className="form-control my-3"
                 placeholder=" Enter phone nuumber"
                 onChange={(e)=>{updatePhone(e.target.value)}} 
                 required 
                 value={phone}/>

                <input 
                type="password" 
                className="form-control my-3" 
                placeholder="Enter password" 
                onChange={(e)=>{updatePasswoord(e.target.value)}} 
                required 
                value={password}/>
                
                <button className="btn btn-danger my-3">
                    sign up
                </button>

                <br />
                <Link to="/signin">Already have an account? sign in</Link>
            </form>
        </div>
    </div>
    );
}

export default SignUpComponent