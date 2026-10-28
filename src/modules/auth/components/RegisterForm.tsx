import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { loginUser, registerUser } from '../services/authService';
import { errorMessage } from '../../../lib/mockDb';
import { campuses, programs, WELCOME_BONUS } from '../../../mocks/users';
import type { RegisterRequest } from '../types';
import AuthLayout from './AuthLayout';
import Button from '../../../core/ui/Button';
import { UnicoinIcon } from '../../../core/ui/Unicoin';

const RegisterForm = () => {
    const [formData, setFormData] = useState<RegisterRequest>({
        name: '',
        lastName: '',
        email: '',
        password: '',
        studentId: '',
        campusId: 1,
        program: programs[0],
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: name === 'campusId' ? parseInt(value, 10) : value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        if (!formData.name.trim() || !formData.lastName.trim()) {
            setError('Escribe tu nombre y apellido.');
            return;
        }
        setLoading(true);
        try {
            await registerUser(formData);
            const session = await loginUser({ email: formData.email, password: formData.password });
            login(session.access_token);
            navigate('/', { replace: true });
        } catch (err) {
            setError(errorMessage(err, 'Error al registrar. Verifica tus datos.'));
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Crea tu cuenta" subtitle="Únete a la comunidad de compra y venta de la Universidad de Córdoba.">
            <div className="mb-5 flex items-center gap-3 rounded-2xl border border-coin/25 bg-coin/10 p-3 text-[13px]">
                <UnicoinIcon className="h-8 w-8" />
                <p className="text-muted">
                    Recibe <span className="font-semibold text-coin">{WELCOME_BONUS} UNICOIN</span> de bienvenida al registrarte.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                        <span className="label">Nombre</span>
                        <input type="text" name="name" autoComplete="given-name" value={formData.name} onChange={handleChange} required className="input" placeholder="Valentina" />
                    </label>
                    <label className="block">
                        <span className="label">Apellido</span>
                        <input type="text" name="lastName" autoComplete="family-name" value={formData.lastName} onChange={handleChange} required className="input" placeholder="Ruiz" />
                    </label>
                </div>
                <label className="block">
                    <span className="label">Correo institucional</span>
                    <input type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required className="input" placeholder="vruiz@correo.unicordoba.edu.co" />
                </label>
                <label className="block">
                    <span className="label">Contraseña</span>
                    <input type="password" name="password" autoComplete="new-password" value={formData.password} onChange={handleChange} required className="input" placeholder="Mínimo 6 caracteres" />
                </label>
                <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                        <span className="label">Código estudiantil</span>
                        <input type="text" name="studentId" inputMode="numeric" value={formData.studentId} onChange={handleChange} required className="input" placeholder="1067…" />
                    </label>
                    <label className="block">
                        <span className="label">Sede</span>
                        <select name="campusId" value={formData.campusId} onChange={handleChange} className="input appearance-none">
                            {campuses.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <label className="block">
                    <span className="label">Programa</span>
                    <select name="program" value={formData.program} onChange={handleChange} className="input appearance-none">
                        {programs.map((p) => (
                            <option key={p}>{p}</option>
                        ))}
                    </select>
                </label>

                {error && (
                    <p className="rounded-xl border border-danger/30 bg-danger/10 px-3.5 py-2.5 text-[13px] text-danger" role="alert">
                        {error}
                    </p>
                )}

                <Button type="submit" size="lg" block loading={loading}>
                    Crear cuenta
                </Button>
            </form>
            <p className="mt-8 text-center text-[14px] text-muted">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="font-semibold text-primary hover:underline">
                    Inicia sesión
                </Link>
            </p>
        </AuthLayout>
    );
};

export default RegisterForm;
