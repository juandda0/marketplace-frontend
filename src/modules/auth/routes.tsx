import { Navigate, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const AuthRoutes = (
    <>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registro" element={<RegisterForm />} />
        <Route path="/register" element={<Navigate to="/registro" replace />} />
    </>
);

export default AuthRoutes;
