import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ActiveSlider from './Carrusel';
import PaginacionProductos from './PaginacionProductos';

const Contenido_Inicio = ({ marca, icono }) => {
    // const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
    const [productos, setProductos] = useState([]);
    const [productosNuevos, setProductosNuevos] = useState([]);
    const [mejoresProductos, setMejoresProductos] = useState([]);

    useEffect(() => {
        if (marca) {
            axios
                .get(`http://localhost:3031/calzado_deportivo/productos_por_marca?marca=${marca}`)
                .then((response) => setProductos(response.data))
                .catch((error) => console.error('Error al obtener productos por marca:', error));

            axios
                .get(`http://localhost:3031/calzado_deportivo/productos_nuevos_por_marca?marca=${marca}`)
                .then((response) => setProductosNuevos(response.data))
                .catch((error) => {
                    setProductosNuevos([])
                    console.error('Error al obtener productos por marca:', error);
                });

            axios
                .get(`http://localhost:3031/calzado_deportivo/mejores_productos_por_marca?marca=${marca}`)
                .then((response) => setMejoresProductos(response.data))
                .catch((error) => {
                    setMejoresProductos([])
                    console.error('Error al obtener productos por marca:', error)
                });
        }
    }, [marca]);

    useEffect(() => {
        console.log(productosNuevos)
    }, [productosNuevos])

    return (
        <div >
            {/*  Grid horizontal de 3 columnas */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center justify-center h-24 rounded">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">

                    </p>
                </div>
                <div className="flex items-center justify-center rounded bg-white-50 dark:bg-white-800 grid grid-cols-10">
                    <div className="flex items-center justify-center col-span-2 h-24 rounded"></div>
                    <div className="flex items-center justify-center col-span-2 h-24 rounded">
                        <p className="text-8xl text-black dark:text-white">
                            {icono}
                        </p>
                    </div>
                    <div className="flex items-center justify-center col-span-1 h-24 ">
                        <a className='text-5xl text-black dark:text-white'>/</a>
                    </div>
                    <div className="flex items-center justify-left col-span-5 h-24 rounded">
                        <p className="text-5xl text-black dark:text-white">
                            {marca}
                        </p>
                    </div>

                </div>
                <div className="flex items-center justify-center h-24 rounded">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">

                    </p>
                </div>
            </div>
            {productosNuevos.productos !== null && productosNuevos.productos && productosNuevos.productos.length > 0 ? (
                <div className="p-1 mb-4 rounded backdrop-blur-lg">
                    <ActiveSlider productos={productosNuevos.productos} titulo={"Nuevos productos"} />

                </div>) : (
                ''
            )}

            <div className="p-1 mb-4 rounded backdrop-blur-lg">

                {mejoresProductos.productos !== null && mejoresProductos.productos && mejoresProductos.productos.length > 0 ? (
                    <ActiveSlider productos={mejoresProductos.productos} titulo={"Mejores calificados"} />
                ) : (
                    <p></p>
                )}
            </div>
            {productos !== null && productos && productos.length > 0 ? (
                <div className="p-1 mb-4 rounded backdrop-blur-lg">
                    <PaginacionProductos productos={productos} />

                </div>) : (
                ''
            )}
            {/* <div className="p-1 mb-4 rounded bg-gray-50 dark:bg-gray-800">

            </div>
 */}
            {/* <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
            </div> */}
        </div>
    );
};

export default Contenido_Inicio;
