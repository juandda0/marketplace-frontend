import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../modules/auth/hooks/useAuth';

/** Login y registro: si ya hay sesión, ir al inicio. */
const PublicOnlyRoute = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicOnlyRoute;
