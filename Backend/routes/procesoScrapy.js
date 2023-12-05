
const ProcesoScrapy = require('../models/procesoScrapyModel');

const almacenarProcesoScrapy = async (estado, resultado) => {
    try {
        const fechaActual = new Date();

        // Crear una nueva instancia del modelo ProcesoScrapy
        const nuevoProceso = new ProcesoScrapy({
            estado: estado,
            restultado: resultado,
            fecha: fechaActual,
        });

        // Guardar en la base de datos
        await nuevoProceso.save();

        console.log('Proceso de Scrapy almacenado exitosamente en MongoDB');
    } catch (error) {
        console.error('Error al almacenar el proceso de Scrapy en MongoDB:', error);
        throw error;
    }
};

// Exportar las funciones individualmente
module.exports = almacenarProcesoScrapy;
