import axios from 'axios';

const URI = "http://localhost:3031/procesoScrapy"

const obtenerUltimoProceso = async () => {
    try {
        // Realizar la solicitud a la API
        const response = await axios.get(URI + '/ultimoProceso');
        return response
    } catch (error) {
        console.error('Error al obtener productos por fecha:', error);
        return null
    }
};

export {obtenerUltimoProceso}