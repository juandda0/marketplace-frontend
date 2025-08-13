import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../modules/auth/context/AuthContext';
import ProfileDropdown from './ProfileDropdown'; // Make sure this path is correct

const Layout: React.FC = () => {
    const authContext = useContext(AuthContext);

    return (
        <>
            <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* --- Top Bar: Logo, Search, and Profile/Auth --- */}
                    <div className="flex justify-between items-center mb-3">
                        <Link to="/" className="text-2xl font-bold">UniMarket</Link>
                        
                        <div className="flex-grow mx-4 sm:mx-8">
                            <input 
                                type="text" 
                                placeholder="Buscar productos, marcas y más..."
                                className="w-full px-4 py-2 text-gray-800 rounded-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                        
                        {/* --- Conditional Auth Section --- */}
                        <div className="space-x-4 flex items-center">
                            {authContext?.isAuthenticated ? (
                                <ProfileDropdown />
                            ) : (
                                <>
                                    <Link to="/login" className="hover:underline whitespace-nowrap">Login</Link>
                                    <Link to="/register" className="hover:underline whitespace-nowrap">Regístrate</Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* --- Bottom Bar: Categories and Navigation --- */}
                    <nav className="flex justify-between items-center text-sm">
                        <div>
                            {/* You can add a category menu here in the future */}
                            <span className="mr-4 cursor-pointer hover:underline">Categorías</span>
                            <span className="mr-4 cursor-pointer hover:underline">Ofertas</span>
                            <span className="mr-4 cursor-pointer hover:underline">Vender</span>
                        </div>
                        <div>
                            <span>Ayuda / PQR</span>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="bg-gray-100">
                {/* Nested routes will render here */}
                <Outlet /> 
            </main>
        </>
    );
};

export default Layout;
