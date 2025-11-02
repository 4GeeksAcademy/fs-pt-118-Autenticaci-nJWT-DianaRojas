import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // <-- Link agregado
import userServices from "../services/userServices";
import useGlobalReducer from "../hooks/useGlobalReducer";




const Login = () => {
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [formData, setFormData] = useState({
        email: "",
        password: ""

    })
    const { store, dispatch } = useGlobalReducer()
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        userServices.login(formData).then(data => {

            if (data.success) {
                localStorage.setItem('token', data.token)
                dispatch({ type: 'logged_in' })

                navigate('/private')
            } else {
                setError(data.data)
            }
        })
    }

    return (
        <div className="container justify-items-center w-50 my-5">
                    <h1 className="text-center">Login <br /> <span className="span-text">Diana</span></h1>
                    
                    <div className="d-flex justify-content-center">
                        <form className="form-style p-4" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    name="email"
                                    onChange={handleChange}
                                    className="form-control form-input"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    required
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    name="password"
                                    onChange={handleChange}
                                    className="form-control form-input"
                                    id="exampleInputPassword1"
                                    required
                                ></input>
                            </div>
                            <div className="d-flex justify-content-center my-2" >
                                <button type="submit" className="cta-send">Iniciar Sesion</button>
                            </div>
                         <Link to={`/`}>Volver a inicio</Link>
                        </form>
                    </div>
                </div>
            );
        };

export default Login;