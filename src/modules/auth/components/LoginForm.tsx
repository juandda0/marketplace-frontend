import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PiEnvelopeSimple, PiEye, PiEyeSlash, PiLock, PiSparkleFill } from 'react-icons/pi';
import { useAuth } from '../hooks/useAuth';
import { loginAsDemo, loginUser } from '../services/authService';
import { errorMessage } from '../../../lib/mockDb';
import type { LoginRequest, TokenResponse } from '../types';
import AuthLayout from './AuthLayout';
import Button from '../../../core/ui/Button';

const LoginForm = () => {
    const [formData, setFormData] = useState<LoginRequest>({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [pending, setPending] = useState<'form' | 'demo' | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as { from?: string } | null)?.from ?? '/';

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const run = async (kind: 'form' | 'demo', request: () => Promise<TokenResponse>) => {
        setError('');
        setPending(kind);
        try {
            const data = await request();
            login(data.access_token);
            navigate(from, { replace: true });
        } catch (err) {
            setError(errorMessage(err, 'Credenciales inválidas. Inténtalo de nuevo.'));
            setPending(null);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        run('form', () => loginUser(formData));
    };

    return (
        <AuthLayout title="Hola de nuevo" subtitle="Inicia sesión con tu correo institucional para comprar y vender en la U.">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <label className="block">
                    <span className="label">Correo institucional</span>
                    <div className="relative">
                        <PiEnvelopeSimple className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-subtle" aria-hidden />
                        <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            placeholder="tu.nombre@correo.unicordoba.edu.co"
                            onChange={handleChange}
                            required
                            className="input pl-12"
                        />
                    </div>
                </label>
                <label className="block">
                    <span className="label">Contraseña</span>
                    <div className="relative">
                        <PiLock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-subtle" aria-hidden />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            autoComplete="current-password"
                            value={formData.password}
                            placeholder="Mínimo 6 caracteres"
                            onChange={handleChange}
                            required
                            className="input px-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-subtle hover:text-fg"
                            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        >
                            {showPassword ? <PiEyeSlash className="h-5 w-5" aria-hidden /> : <PiEye className="h-5 w-5" aria-hidden />}
                        </button>
                    </div>
                </label>

                {error && (
                    <p className="rounded-xl border border-danger-line bg-danger-soft px-3.5 py-2.5 text-[13px] text-danger-ink" role="alert">
                        {error}
                    </p>
                )}

                <Button type="submit" size="lg" block loading={pending === 'form'} disabled={pending !== null}>
                    Entrar
                </Button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs text-subtle">
                <span className="h-px flex-1 bg-line" /> o <span className="h-px flex-1 bg-line" />
            </div>

            <Button
                variant="secondary"
                size="lg"
                block
                onClick={() => run('demo', loginAsDemo)}
                loading={pending === 'demo'}
                disabled={pending !== null}
                icon={<PiSparkleFill className="h-5 w-5 text-coin-ink" aria-hidden />}
            >
                Entrar como demo
            </Button>
            <p className="mt-2 text-center text-xs text-subtle">Explora la app con la cuenta de Sofía, estudiante de Ingeniería de Sistemas.</p>

            <p className="mt-auto pt-10 text-center text-[14px] text-muted">
                ¿No tienes cuenta?{' '}
                <Link to="/registro" className="font-semibold text-primary-ink hover:underline">
                    Regístrate
                </Link>
            </p>
        </AuthLayout>
    );
};

export default LoginForm;
