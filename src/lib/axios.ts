import axios from 'axios';

// Creamos una instancia de Axios con una configuración predeterminada.
const apiClient = axios.create({
    // La URL base de tu backend en Spring Boot.
    baseURL: 'http://localhost:8080', 
    headers: {
        'Content-Type': 'application/json',
    }
});

export default apiClient;