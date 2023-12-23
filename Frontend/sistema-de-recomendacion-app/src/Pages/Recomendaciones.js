import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/Product_Card';

const ContenidoRecomendaciones = () => {
    const [productosRecomendados, setProductosRecomendados] = useState([])
    // Obtener mediante peticion http la lista de recomendaciones
    // Enviar mediante la data insertada al localstorage
    useEffect(() => {
        const productosGuardados = JSON.parse(localStorage.getItem('productosSeleccionados')) || [];
        axios
            .get(`http://localhost:3031/recomendacion/recomendacionesByIds?ids=${productosGuardados}`)
            .then((response) => setProductosRecomendados(response.data))
            .catch((error) => console.error('Error al obtener recomendaciones:', error));
    }, [])

    return (
        <div >
            {productosRecomendados.topRecommendations && productosRecomendados.topRecommendations.map((product) => (
                <ProductCard key={product._id} producto={product} />
            ))}
        </div>
    );
};

export default ContenidoRecomendaciones;
