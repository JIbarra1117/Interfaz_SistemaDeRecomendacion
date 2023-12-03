// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './Product_Card';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Dashboard_muestra = () => {
    const [productosNuevosPorMarca, setProductosNuevosPorMarca] = useState([]);

    useEffect(() => {
        const fetchProductosNuevos = async () => {
            try {
                const response = await axios.get('http://localhost:3030/calzado_deportivo/productos_nuevos');
                setProductosNuevosPorMarca(response.data);
            } catch (error) {
                console.error('Error al obtener productos nuevos:', error);
            }
        };
    
        if (productosNuevosPorMarca.length === 0) {
            fetchProductosNuevos();
        }
    }, [productosNuevosPorMarca]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Ajusta el número de productos por fila
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    // console.log(productosNuevosPorMarca)
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Productos Nuevos por Marca</h1>

            <Slider {...settings}>
                {productosNuevosPorMarca.map(({ marca, productos }) => {
                    console.log('Marca:', marca);
                    console.log('Productos:', productos);

                    return (
                        <div key={marca} className="mb-8">
                            <h2 className="text-2xl font-semibold mb-2">{marca}</h2>
                            <div className="flex space-x-4 overflow-x-auto">
                                {productos && productos.map((producto, index) => (
                                    <div key={index} className="max-w-xs">
                                        <ProductCard
                                            calificacion={producto.calificacion}
                                            color={producto.color}
                                            descripcion={producto.descripcion}
                                            imagenes={producto.imagenes}
                                            marca={producto.marca}
                                            modelo={producto.modelo}
                                            precio={producto.precio}
                                            tallas={producto.tallas}
                                        ></ProductCard>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );

};

// ...

export default Dashboard_muestra;

