
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { toast } from "react-toastify";



const Login = ({ setLoginUsers }) => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleLogin = async () => {
        const { email, password } = user;
        // Check if both email and password are provided
        if (!email || !password) {
            toast.error("Please enter your email and password.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:4001/login", { email, password });
            const { message, user } = response.data;
            // const { _id } = user
            // console.log(_id, 'id')
            toast.success(message);
            setLoginUsers(user);
            navigate("/");
        }
        catch (error) {

            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
                //console.log('error.response.data.message', error.response.data.message)
            }
        };
    };





    return (
        <>
            <div className="login">
                <h1>Login</h1>
                <input type="text" name="email" value={user.email} onChange={handleChange}
                    placeholder="Enter your Email"></input>
                <input type="password" name="password" value={user.password} onChange={handleChange}
                    placeholder="Enter your Password" ></input>
                <div className="button" onClick={handleLogin}
                >Login</div>
                <div>or</div>
                <div className="button" onClick={() => navigate("/register")}
                >Register</div>
            </div>

        </>
    )
}
export default Login