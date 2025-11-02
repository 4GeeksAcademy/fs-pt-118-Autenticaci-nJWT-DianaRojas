import { useEffect, useState } from "react";
import userServices from "../services/userServices";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Private = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrivate = async () => {
            try {
                const data = await userServices.private();
                dispatch({ type: "save_user", payload: data }); // Guarda usuario en store
            } catch (err) {
                console.error("Error al obtener datos privados:", err);
                dispatch({ type: "logged_out" }); // Si falla, borra usuario
            } finally {
                setLoading(false);
            }
        };

        fetchPrivate();
    }, [dispatch]);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Borra token
        dispatch({ type: "logged_out" });
        navigate("/");
    };

    if (loading) {
        return <div className="text-center p-5">Cargando...</div>;
    }

    return (
        <>
            {!store?.user ? (
                <div className="text-center p-5">
                    <h2>Esto es privado</h2>
                    <Link to="/login">Login</Link>
                </div>
            ) : (
                <div className="text-center p-5">
                    <h2>Bienvenido: {store.user?.name} a tu área privada</h2>
                    <button className="btn btn-primary" onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                </div>
            )}
        </>
    );
};

export default Private;
