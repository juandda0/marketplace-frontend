import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../modules/auth/context/AuthContext';
// Importa un ícono de perfil, por ejemplo de 'react-icons' (npm install react-icons)
import { FaUserCircle, FaStore, FaCog, FaSignOutAlt, FaHistory, FaShoppingCart, FaStar, FaPlusCircle } from 'react-icons/fa';

const ProfileDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        authContext?.logout();
        navigate('/login');
    };

    // Hook para cerrar el dropdown si se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    if (!authContext?.isAuthenticated) return null;

    const renderRoleSpecificItems = () => {
        switch (authContext.userRole) {
            case 'CLIENT':
                return (
                    <Link to="/become-seller" className="block w-full text-left px-4 py-3 text-sm text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition duration-300 rounded-md shadow-lg flex items-center gap-3">
                        <FaPlusCircle />
                        ¡Quiero Vender!
                    </Link>
                );
            case 'ENTREPRENEUR':
                return (
                     <Link to="/my-store" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"><FaStore /> Mi Tienda</Link>
                );
            case 'UNIVERSITY_ADMIN':
            case 'SUPER_ADMIN':
                return (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"><FaCog /> Panel de Admin</Link>
                );
            default:
                return null;
        }
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                <FaUserCircle className="w-8 h-8 text-white hover:text-blue-200 transition" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-xl z-20 origin-top-right ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"><FaUserCircle /> Ver Perfil</Link>
                        <Link to="/my-purchases" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"><FaShoppingCart /> Mis Compras</Link>
                        <Link to="/history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"><FaHistory /> Historial</Link>
                        <Link to="/reviews" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"><FaStar /> Opiniones</Link>
                        
                        <div className="border-t my-1"></div>
                        
                        <div className="px-1 py-1">
                            {renderRoleSpecificItems()}
                        </div>
                        
                        <div className="border-t my-1"></div>

                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-3">
                           <FaSignOutAlt /> Cerrar Sesión
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;