import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PiSneakerFill, PiSneakerMoveLight } from "react-icons/pi";
import { SiReebok, SiNike, SiAdidas, SiPuma, SiUnderarmour } from "react-icons/si";
import Contenido_Inicio from '../components/Contenido_Inicio';
// import './App.css';

const Inicio = () => {

    const [marcas, setMarcas] = useState([]);
    const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
    const [links_images] = useState([
        { marca: "Vans", links: "", num: 0 },
        { marca: "Reebok", links: (<SiReebok className="w-6 h-6" />), num: 0 },
        { marca: "Adidas", links: (<SiAdidas className="w-6 h-6" />), num: 0 },
        { marca: "Nike", links: (<SiNike className="w-6 h-6" />), num: 0 },
        { marca: "Puma", links: (<SiPuma className="w-6 h-6" />), num: 0 },
        { marca: "Under Armour", links: (<SiUnderarmour className="w-6 h-6" />), num: 0 },
        { marca: "Converse", links: "", num: 0 }]);

    useEffect(() => {
        axios.get('http://localhost:3030/calzado_deportivo/numero_calzados_por_marca')
            .then(response => {
                const data = response.data;
                if (Array.isArray(data)) {
                    setMarcas(data);
                } else {
                    console.error('La respuesta de marcas no es un array:', data);
                }
            })
            .catch(error => console.error('Error al obtener marcas:', error));
    }, []);
    // Metodos para dise;o
    const obtener_img = (marca) => {
        const linkEncontrado = links_images && links_images.find(obj => obj.marca.toLowerCase() === marca.toLowerCase());
        return linkEncontrado ? linkEncontrado.links : (<a>No hay logo</a>);
    };
    const handle_actualizarMarca = (marca) => {
        setMarcaSeleccionada(marca)
    }

    return (
        <>

            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <a className="flex items-center ps-2.5 mb-5">
                        <PiSneakerMoveLight className="w-20 h-20" />
                        {/* <img src="" className="w-20 h-20" alt="SHOEMMENDER Logo" /> */}
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">SHOEMMENDER</span>
                    </a>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                    <PiSneakerFill />
                                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Marcas Registradas</span>
                                    <span
                                        className="shrink-0 transition duration-300 group-open:-rotate-180"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </summary>
                                <ul className="mt-1 space-y-1 px-1 ">
                                    <div className="grid grid-cols-2 md:grid-cols-2  items-center">
                                        {marcas.map((marca) => (
                                            <div key={marca.marca}>
                                                <button type="button"
                                                    className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none transition hover:scale-110 hover:shadow-xl focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                                                    onClick={() => {
                                                        console.log("Valor de marca:", marca);
                                                        marca && handle_actualizarMarca(marca.marca);
                                                    }} >
                                                    {obtener_img(marca.marca)}
                                                    {marca.marca}
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                </ul>
                            </details>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Sistema de recomendacion</span>
                            </a>
                        </li>

                    </ul>
                </div>
            </aside>
            {/* Contenido del sidebar */}
            <div className="p-4 sm:ml-80">
                {/* <Dashboard marca={marcaSeleccionada}></Dashboard> */}
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <Contenido_Inicio marca={marcaSeleccionada} />
                </div>
            </div>
        </>
    );
};

export default Inicio;