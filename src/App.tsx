import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './core/theme/ThemeProvider';
import { ToastProvider } from './core/toast/ToastProvider';
import { AuthProvider } from './modules/auth/context/AuthProvider';
import { WalletProvider } from './modules/wallet/context/WalletProvider';
import { CartProvider } from './modules/cart/context/CartProvider';

import Layout from './core/components/Layout';
import PrivateRoute from './core/components/PrivateRoute';
import PublicOnlyRoute from './core/components/PublicOnlyRoute';
import AuthRoutes from './modules/auth/routes';
import MarketplaceRoutes from './modules/marketplace/routes';
import AuctionRoutes from './modules/auctions/routes';
import RaffleRoutes from './modules/raffles/routes';
import WalletRoutes from './modules/wallet/routes';
import CartRoutes from './modules/cart/routes';
import ProfileRoutes from './modules/profile/routes';

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <WalletProvider>
                    <CartProvider>
                        <ToastProvider>
                            <Router>
                                <Routes>
                                    {/* Rutas públicas */}
                                    <Route element={<PublicOnlyRoute />}>{AuthRoutes}</Route>

                                    {/* Rutas privadas */}
                                    <Route element={<PrivateRoute />}>
                                        <Route element={<Layout />}>
                                            {MarketplaceRoutes}
                                            {AuctionRoutes}
                                            {RaffleRoutes}
                                            {WalletRoutes}
                                            {CartRoutes}
                                            {ProfileRoutes}
                                        </Route>
                                    </Route>

                                    {/* Ruta por defecto */}
                                    <Route path="*" element={<Navigate to="/" replace />} />
                                </Routes>
                            </Router>
                        </ToastProvider>
                    </CartProvider>
                </WalletProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
