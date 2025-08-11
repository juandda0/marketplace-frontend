import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import type { LoginRequest } from '../types';

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState<LoginRequest>({ email: '', password: '' });
    const [error, setError] = useState<string>('');
    
    // Usamos una aserción 'not-null' porque sabemos que el proveedor está en un nivel superior.
    const { login } = useContext(AuthContext)!;
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        try {
            const data = await loginUser(formData);
            if (data.access_token) {
                login(data.access_token);
                navigate('/profile');
            }
        } catch (err) {
            setError('Credenciales inválidas. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* ...el resto del JSX es igual... */}
                    <input type="email" name="email" value={formData.email} placeholder="Correo Electrónico" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
                    <input type="password" name="password" value={formData.password} placeholder="Contraseña" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
                    <button type="submit" className="w-full py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;