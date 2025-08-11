import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../modules/auth/context/AuthContext';

const ProfilePage: React.FC = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        if (authContext) {
            authContext.logout();
            navigate('/login');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-green-50 text-center">
            <div className="p-10 bg-white rounded-lg shadow-xl">
                <h1 className="text-4xl font-bold text-green-600">¡Estás Autenticado! ✅</h1>
                <p className="mt-4 text-lg text-gray-700">Has accedido a una ruta protegida.</p>
                <button 
                    onClick={handleLogout}
                    className="mt-8 px-6 py-2 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;