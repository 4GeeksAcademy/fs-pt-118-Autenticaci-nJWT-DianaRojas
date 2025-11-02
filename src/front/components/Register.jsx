import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import userServices from "../services/userServices";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await userServices.register(formData);

    if (data?.success) {
      setSuccess("Registro exitoso. Redirigiendo al login...");
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setError(data?.message || "Ocurrió un error al registrar.");
      setSuccess("");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
      </form>
      <div className="mt-3">
        <Link to="/login">Ir al Login</Link>
      </div>
    </div>
  );
};

export default Register;
