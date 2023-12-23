import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LiveMessagesScrapy from '../components/messages/ScrapyMessage';

const Inicio_fecha = () => {
    const [fecha, setFecha] = useState('');
    const [datosActuales, setDatosActuales] = useState(null);
    const [procesoExtraccion, setProcesoExtraccion] = useState(null)

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                // Convertir la fecha de cadena a objeto Date
                let fechaActual = new Date();
                fechaActual.setHours(0, 0, 0, 0);
                // Formatear la fecha como cadena ISO 8601
                const fechaFormateada = fechaActual.toISOString().split('T')[0];

                setFecha(fechaFormateada);

                // Realizar la solicitud a la API
                const response = await axios.get(`http://localhost:3031/calzado_deportivo/productos_en_fecha?fecha=${fechaFormateada}`);
                setDatosActuales(response.data.hayProductosEnFecha);
            } catch (error) {
                console.error('Error al obtener productos por fecha:', error);
            }
        };

        obtenerDatos();
    }, []);

    useEffect(() => {
        localStorage.setItem('Fecha', fecha)
    }, [datosActuales]);

    // Muestra un mensaje mientras se realiza la solicitud
    if (datosActuales === null) {
        return <p>Cargando...</p>;
    }

    return (
        <div style={{ position: 'relative', zIndex: 2 }}>
            {/* Preguntar al usuario si desea ver datos del dia de ayer */}
            {/* Si pone si, cargar y mostrar el proceso de extraccion de datos */}
            {/* Si pone no, esperar a que se extraigan los datos de la informacion */}
            {datosActuales ? (
                <p>¡Sí hay datos!</p>
            ) : (
                <p>El proceso de Extraccion aun no ha culminado</p>
            )}
            <LiveMessagesScrapy />
        </div>
    );
};

export default Inicio_fecha;
