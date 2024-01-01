import React, { useState, useEffect } from "react";
import ActiveSlider from "./Carrusel";
import PaginacionProductos from "./PaginacionProductos";
import {obtenerMejoresProductosPorMarca, obtenerProductosPorMarca, obtenerProductosNuevosPorMarca} from '../api/calzado-deportivo';

const ContenidoInicio = ({ marca, icono, onProductosLoading }) => {
  // const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
  const [productos, setProductos] = useState([]);
  const [productosNuevos, setProductosNuevos] = useState([]);
  const [mejoresProductos, setMejoresProductos] = useState([]);

  const handleLoadingProducto = (data) =>{
    onProductosLoading(data)
  };
  useEffect(() => {
    if (marca) {
      handleLoadingProducto(true);

      Promise.all([
        obtenerProductosPorMarca(marca), obtenerProductosNuevosPorMarca(marca),obtenerMejoresProductosPorMarca(marca)

      ])
        .then(
          ([
            productosResponse,
            productosNuevosResponse,
            mejoresProductosResponse,
          ]) => {
            setProductos(productosResponse.data);
            setProductosNuevos(productosNuevosResponse.data);
            setMejoresProductos(mejoresProductosResponse.data);
            
            handleLoadingProducto(false);
          }
        )
        .catch((error) => {
          setProductos([]);
          setProductosNuevos([]);
          setMejoresProductos([]);
          handleLoadingProducto(false);
          console.error("Error al obtener productos por marca:", error);
        });
    }
  }, [marca]);

  useEffect(() => {
    // console.log(productosNuevos)
  }, [productosNuevos]);

  return (
    <div>
      {/*  Grid horizontal de 3 columnas */}
      <div className="grid grid-cols-3 gap-4 mb-4 select-none">
        <div className="flex items-center justify-center h-24 rounded">
          <p className="text-2xl text-gray-400 dark:text-gray-500"></p>
          {/* <MensajeScrapy /> */}
        </div>
        <div className=" items-center justify-center rounded bg-white-50 dark:bg-white-800 grid grid-cols-10">
          <div className="flex items-center justify-center col-span-2 h-24 rounded"></div>
          <div className="">
            <p className="text-8xl text-black dark:text-white">{icono}</p>
          </div>
          <div className="flex items-center justify-center col-span-1 h-24 ">
            <a className="text-5xl text-black dark:text-white"></a>
          </div>
          <div className="flex items-center justify-left col-span-5 h-24 rounded">
            <p className="text-5xl text-black dark:text-white">{marca}</p>
          </div>
        </div>
        <div className="flex items-center justify-center h-24 rounded">
          <p className="text-2xl text-gray-400 dark:text-gray-500"></p>
        </div>
      </div>
      <div className="animate-fade animate-ease-in-out">
        {productosNuevos.productos !== null &&
        productosNuevos.productos &&
        productosNuevos.productos.length > 0 ? (
          <div
            className="p-1 mb-4 rounded backdrop-blur-sm shadow-2xl"
          >
            <ActiveSlider
              productos={productosNuevos.productos}
              titulo={"Nuevos productos"}
            />
          </div>
        ) : (
          ""
        )}

        <div
          className="p-1 mb-4 rounded backdrop-blur-sm shadow-2xl"
        >
          {mejoresProductos !== null &&
          mejoresProductos &&
          mejoresProductos.length > 0 ? (
            <ActiveSlider
              key={mejoresProductos}
              productos={mejoresProductos}
              titulo={"Mejores calificados"}
            />
          ) : (
            <p></p>
          )}
        </div>
        {productos !== null && productos && productos.length > 0 ? (
          <div
            className="p-1 mb-4 rounded backdrop-blur-sm shadow-2xl"
          >
            <PaginacionProductos key={productos} productos={productos} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ContenidoInicio;
