const express = require('express');
const CalzadoDeportivo = require('../models/calzadoModel');
const natural = require('natural');
const { TfIdf } = natural;
const router = express.Router();

async function calculateRecommendations(res) {
    try {
        // Obtener datos de MongoDB
        const data = await CalzadoDeportivo.find();

        // Crear un DataFrame simulado
        const df = {
            modelo: data.map(item => item.modelo),
            marca: data.map(item => item.marca),
            precio: data.map(item => item.precio),
            color: data.map(item => item.color),
            descripcion: data.map(item => item.descripcion),
        };

        // Combinar las características de texto en una lista de strings
        df['text_features'] = df.modelo.map((modelo, index) => {
            return `${modelo} ${df.marca[index]} ${df.precio[index]} ${df.color[index]} ${df.descripcion[index]}`;
        });

        // Aplicar TF-IDF a las características de texto
        const tfidf = new TfIdf();
        df['text_features'].forEach(text => tfidf.addDocument(text));

        // Calcular la similitud del coseno
        const selectedIndices = [0, 2, 1000, 23, 123, 3244];
        const cosineSimilarities = {};

        selectedIndices.forEach(index => {
            const selectedText = df['text_features'][index];
            tfidf.tfidfs(selectedText, function (i, measure) {
                cosineSimilarities[i] = cosineSimilarities[i] || 0;
                cosineSimilarities[i] += measure;
            });
        });

        // Normalizar las similitudes
        const numSelected = selectedIndices.length;
        Object.keys(cosineSimilarities).forEach(key => {
            cosineSimilarities[key] /= numSelected;
        });

        // Obtener los índices de los productos más similares
        const sortedSimilarities = Object.entries(cosineSimilarities).sort((a, b) => b[1] - a[1]);
        const topRecommendationsIndices = sortedSimilarities.slice(1, 31).map(([index]) => parseInt(index));

        // Obtener los objetos completos de los productos recomendados
        const topRecommendations = topRecommendationsIndices.map(index => data[index]);

        // Enviar las recomendaciones como respuesta al cliente
        res.json({ topRecommendations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function calculateRecommendationsByIds(res, selectedIds) {
    try {
        // Obtener datos de MongoDB
        const data = await CalzadoDeportivo.find();

        // Crear un DataFrame simulado
        const df = {
            _id: data.map(item => item._id),
            modelo: data.map(item => item.modelo),
            marca: data.map(item => item.marca),
            precio: data.map(item => item.precio),
            color: data.map(item => item.color),
            descripcion: data.map(item => item.descripcion),
        };

        // Combina las características de texto en una lista de strings
        df['text_features'] = df.modelo.map((modelo, index) => {
            return `${modelo} ${df.marca[index]} ${df.precio[index]} ${df.color[index]} ${df.descripcion[index]}`;
        });

        // Aplica TF-IDF a las características de texto
        const tfidf = new TfIdf();
        df['text_features'].forEach(text => tfidf.addDocument(text));

        // Filtra los datos para incluir solo los seleccionados por _id
        const selectedData = data.filter(item => selectedIds.includes(item._id.toString()));

        // Calcula la similitud del coseno para los productos seleccionados
        const cosineSimilarities = {};
        selectedData.forEach(selectedItem => {
            const selectedIndex = df._id.indexOf(selectedItem._id.toString());
            const selectedText = df['text_features'][selectedIndex];
            tfidf.tfidfs(selectedText, function (i, measure) {
                cosineSimilarities[i] = cosineSimilarities[i] || 0;
                cosineSimilarities[i] += measure;
            });
        });

        // Normaliza las similitudes
        const numSelected = selectedData.length;
        Object.keys(cosineSimilarities).forEach(key => {
            cosineSimilarities[key] /= numSelected;
        });

        // Obtiene los índices de los productos más similares
        const sortedSimilarities = Object.entries(cosineSimilarities).sort((a, b) => b[1] - a[1]);
        const topRecommendationsIndices = sortedSimilarities.slice(1, 31).map(([index]) => parseInt(index));

        // Obtiene los objetos completos de los productos recomendados
        const topRecommendations = topRecommendationsIndices.map(index => data[index]);

        // Envia las recomendaciones como respuesta al cliente
        res.json({ topRecommendations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Ruta para obtener recomendaciones de productos
router.get('/', (req, res) => {
    console.time();
    calculateRecommendations(res);
    console.timeEnd();
});

// Ruta para obtener recomendaciones de productos mediantes ids
router.get('/recomendacionesByIds', (req, res) => {
    const selectedIds = req.query.ids || [];
    console.time();
    calculateRecommendations(res, selectedIds);
    console.timeEnd();
});

module.exports = router;
