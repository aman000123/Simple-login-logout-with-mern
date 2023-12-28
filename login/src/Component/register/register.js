
import { useState } from "react";
import "./register.css";
import axios from "axios"
import { useNavigate } from "react-router-dom"
const Register = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    })


    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        //if name email,password enter then register
        if (name && email && password && (password === reEnterPassword)) {
            axios.post("http://localhost:4001/register", user)
                .then(res => {
                    alert(res.data.message)
                    navigate("/login")
                })
                .catch((error) => {
                    alert(error.response.data.message); // Show an alert if there's an error during registration
                    console.log("error in registration", error);
                });
        } else {
            alert("Invalid input. Please fill all fields and ensure passwords match.");
        }

    }

    return (
        <>
            <div className="register">
                {console.log("User", user)}
                <h1>Register</h1>
                <input type="text" name="name"
                    value={user.name} placeholder="Your Name" onChange={handleChange}
                ></input>
                <input type="text" name="email"
                    value={user.email} placeholder="Your Email" onChange={handleChange}
                ></input>
                <input type="password" name="password"
                    value={user.password} placeholder="Your Password" onChange={handleChange}
                ></input>
                <input type="password" name="reEnterPassword"
                    value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange}
                ></input>
                <div className="button"
                    onClick={register}
                >Register</div>
                <div>or</div>
                <div className="button" onClick={() => navigate("/login")}
                >Login</div>
            </div>

        </>
    )
}
export default Register