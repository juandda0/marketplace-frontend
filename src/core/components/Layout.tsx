import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Layout: React.FC = () => {
    return (
        <>
            <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-20 px-24">
                <div className="container mx-auto">
                    {/* Barra Superior: Búsqueda y Perfil */}
                    <div className="flex justify-between items-center mb-3">
                        <Link to="/" className="text-2xl font-bold">UniMarket</Link>
                        <div className="flex-grow mx-8">
                            <input 
                                type="text" 
                                placeholder="Buscar productos, marcas y más..."
                                className="w-full px-4 py-2 text-gray-800 rounded-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                        <div className="space-x-4 flex items-center">
                            <Link to="/login" className="hover:underline">Login</Link>
                            <Link to="/register" className="hover:underline">Regístrate</Link>
                            <Link to="/profile" className="hover:underline">Mi Perfil</Link>
                        </div>
                    </div>
                    {/* Barra Inferior: Categorías y Navegación */}
                    <nav className="flex justify-between items-center text-sm">
                        <div>
                           {/* Aquí puedes agregar un menú de categorías en el futuro */}
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
                {/* Las rutas anidadas se renderizarán aquí */}
                <Outlet /> 
            </main>
        </>
    );
};

export default Layout;