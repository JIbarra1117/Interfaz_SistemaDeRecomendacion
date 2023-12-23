const express = require('express');
const CalzadoDeportivo = require('../models/calzadoModel');

const router = express.Router();

// Obtener todos los calzados deportivos
router.get('/', async (req, res) => {
    try {
        const calzados = await CalzadoDeportivo.find();
        res.json(calzados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Obtener el número total de productos con un nombre de marca específico
router.get('/total_por_marca', async (req, res) => {
    try {
        const { marca } = req.query;

        if (!marca) {
            return res.status(400).json({ error: 'Se requiere el parámetro "marca" en la consulta.' });
        }

        const totalPorMarca = await CalzadoDeportivo.countDocuments({ marca });
        res.json({ total: totalPorMarca });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/marcas', async (req, res) => {
    try {
        const marcas = await CalzadoDeportivo.distinct('marca');
        res.json({ marcas });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/precios', async (req, res) => {
    try {
        const precios = await CalzadoDeportivo.distinct('precio');
        const preciosEnDecimales = precios.map(precio => parseFloat(precio.replace('$', '')));

        res.json({ preciosEnDecimales });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener los precios únicos y el número de productos por precio dependiendo de la marca
router.get('/precios_por_marca', async (req, res) => {
    try {
        const { marca } = req.query;

        if (!marca) {
            return res.status(400).json({ error: 'Se requiere el parámetro "marca" en la consulta.' });
        }

        const preciosYCantidad = await CalzadoDeportivo.aggregate([
            { $match: { marca } },
            {
                $group: {
                    _id: '$precio',
                    cantidad: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    precio: '$_id',
                    cantidad: 1,
                },
            },
            { $sort: { precio: 1 } }, // Opcional: ordenar por precio ascendente
        ]);

        const resultados = preciosYCantidad.map((item) => ({
            precio: parseFloat(item.precio.replace('$', '')),
            cantidad: item.cantidad,
        }));

        res.json({ resultados });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener todos los productos según la marca
router.get('/productos_por_marca', async (req, res) => {
    try {
        const { marca } = req.query;
        const productosPorMarca = await CalzadoDeportivo.find({ marca });

        if (productosPorMarca.length === 0) {
            return res.status(404).json({ error: 'No se encontraron productos para la marca proporcionada.' });
        }

        res.json(productosPorMarca);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener información de un producto por modelo
router.get('/producto_por_modelo/:modelo', async (req, res) => {
    try {
        const { modelo } = req.params;
        const producto = await CalzadoDeportivo.findOne({ modelo });

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/numero_calzados_por_marca', async (req, res) => {
    try {
        const result = await CalzadoDeportivo.aggregate([
            {
                $group: {
                    _id: '$marca',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0, // Excluimos el _id del resultado
                    marca: '$_id', // Renombramos _id a marca
                    numeroCalzados: '$count'
                }
            }
        ]);

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




// Obtener los 25 mejores calificados por marca
router.get('/top25', async (req, res) => {
    try {
        const result = await CalzadoDeportivo.aggregate([
            {
                $sort: { calificacion: -1 }, // Ordenar por calificación descendente
            },
            {
                $group: {
                    _id: '$marca',
                    productos: { $push: '$$ROOT' }, // Agrupar productos por marca
                },
            },
            {
                $project: {
                    marca: '$_id',
                    _id: 0,
                    productos: { $slice: ['$productos', 25] }, // Limitar a los 25 mejores por marca
                },
            },
        ]);

        res.json(result);
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).json({ error: 'Error al realizar la consulta' });
    }
});
router.get('/mejores_productos_por_marca', async (req, res) => {
    try {
        const marcaParametro = req.query.marca;

        if (!marcaParametro) {
            return res.status(400).json({ error: 'La marca es un parámetro requerido.' });
        }

        const result = await CalzadoDeportivo.aggregate([
            {
                $match: { marca: marcaParametro }, // Filtrar por la marca proporcionada
            },
            {
                $sort: { calificacion: -1 }, // Ordenar por calificación descendente
            },
            {
                $group: {
                    _id: '$marca',
                    productos: { $push: '$$ROOT' }, // Agrupar productos por marca
                },
            },
            {
                $project: {
                    marca: '$_id',
                    _id: 0,
                    productos: { $slice: ['$productos', 5] }, // Limitar a los 5 mejores por marca (puedes ajustar este número según tus necesidades)
                },
            },
        ]);

        if (result.length === 0) {
            return res.status(404).json({ error: `No se encontraron productos para la marca: ${marcaParametro}.` });
        }

        res.json(result[0]); // Devolver el primer elemento del resultado ya que solo debería haber una marca en la respuesta
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).json({ error: 'Error al realizar la consulta' });
    }
});

// Obtener los productos nuevos por marca
router.get('/productos_nuevos', async (req, res) => {
    try {
        const productosNuevos = await CalzadoDeportivo.find({ calificacion: -1 });

        if (productosNuevos.length === 0) {
            return res.status(404).json({ error: 'No se encontraron productos nuevos.' });
        }

        // Agrupar productos nuevos por marca y limitar a 25 por marca
        const productosNuevosPorMarca = productosNuevos.reduce((acumulador, producto) => {
            const { marca } = producto;
            if (!acumulador[marca]) {
                acumulador[marca] = [];
            }

            // Limitar a 25 productos por marca
            if (acumulador[marca].length < 25) {
                acumulador[marca].push(producto);
            }

            return acumulador;
        }, {});

        // Formatear la respuesta para que coincida con el formato del top25
        const resultadoFormateado = Object.entries(productosNuevosPorMarca).map(([marca, productos]) => ({
            marca,
            productos,
        }));

        res.json(resultadoFormateado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Obtener los productos nuevos por marca
router.get('/productos_nuevos_por_marca', async (req, res) => {
    try {
        const { marca } = req.query;

        if (!marca) {
            return res.status(400).json({ error: 'Se debe proporcionar la marca como parámetro de consulta.' });
        }

        const productosNuevosPorMarca = await CalzadoDeportivo.find({ marca, calificacion: -1 }).limit(25);

        if (productosNuevosPorMarca.length === 0) {
            console.log('/productos_nuevos_por_marca RESPONSE No hay productos nuevos en la marca')
            return res.status(404).json({ error: `No se encontraron productos nuevos para la marca ${marca}.` });
        }

        res.json({ marca, productos: productosNuevosPorMarca });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para verificar si hay productos en una fecha
router.get('/productos_en_fecha', async (req, res) => {
    try {
        const { fecha } = req.query;

        if (!fecha) {
            return res.status(400).json({ error: 'Se debe proporcionar la fecha como parámetro de consulta.' });
        }

        // Convertir la fecha de cadena a objeto Date
        const fechaObjeto = new Date(fecha);

        // Extraer el componente de fecha (sin la hora) de la fecha proporcionada
        const fechaSinHora = new Date(fechaObjeto.getFullYear(), fechaObjeto.getMonth(), fechaObjeto.getDate());

        // Buscar productos con el componente de fecha (sin la hora) igual al proporcionado
        const resultados = await CalzadoDeportivo.find({
            fecha: {
                $gte: fechaSinHora,
                $lt: new Date(fechaSinHora.getTime() + 24 * 60 * 60 * 1000), // 24 horas después
            },
        });

        const hayProductosEnFecha = resultados.length > 0;

        res.json({ hayProductosEnFecha });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
