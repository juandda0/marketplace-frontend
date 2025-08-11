import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import type { RegisterRequest } from '../types';

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState<RegisterRequest>({
        name: '', lastName: '', email: '', password: '', studentId: '', campusId: 1
    });
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'campusId' ? parseInt(value, 10) : value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        try {
            await registerUser(formData);
            navigate('/login');
        } catch (err) {
            setError('Error al registrar. Verifica tus datos.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Crear Cuenta</h2>
                {/* ...el resto del JSX es igual... */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
                    <input type="text" name="lastName" placeholder="Apellido" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
                    <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
                    <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
                    <input type="text" name="studentId" placeholder="ID Estudiante" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
                    <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;