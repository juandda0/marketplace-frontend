import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../modules/auth/context/AuthContext';

const PrivateRoute: React.FC = () => {
    const authContext = useContext(AuthContext);
    
    if (!authContext) {
        // Esto puede pasar si el componente no está envuelto en el AuthProvider.
        throw new Error("PrivateRoute must be used within an AuthProvider");
    }

    return authContext.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;