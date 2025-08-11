import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './modules/auth/context/AuthContext';

// Importaciones
import Layout from './core/components/Layout';
import PrivateRoute from './core/components/PrivateRoute';
import AuthRoutes from './modules/auth/routes';
import ProfileRoutes from './modules/profile/routes';
import MarketplaceRoutes from './modules/marketplace/routes'; // <-- IMPORTAR NUEVAS RUTAS

function App() {
  return (
    <AuthProvider>
            <Router>
                <Routes>
                    <Route element={<Layout />}>
                        {/* Rutas Públicas */}
                        {AuthRoutes}

                        {/* Rutas Privadas */}
                        <Route element={<PrivateRoute />}>
                            {MarketplaceRoutes} {/* <-- AÑADIR RUTA PRINCIPAL */}
                            {ProfileRoutes}
                        </Route>

                        {/* Ruta por defecto */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
  )
}

export default App