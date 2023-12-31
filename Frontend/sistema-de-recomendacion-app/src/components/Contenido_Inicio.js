import axios from "axios";
import React, { useState, useEffect } from "react";
import ActiveSlider from "./Carrusel";
import PaginacionProductos from "./PaginacionProductos";
import MensajeScrapy from "./messages/ScrapyMessage";
import ActiveSliderSkeleton from "./skeletons/ActiveSliderSkeleton";

const ContenidoInicio = ({ marca, icono }) => {
  // const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
  const [productos, setProductos] = useState([]);
  const [productosNuevos, setProductosNuevos] = useState([]);
  const [mejoresProductos, setMejoresProductos] = useState([]);
  const [loadingProductosNuevos, setLoadingProductosNuevos] = useState(true);

  useEffect(() => {
    if (marca) {
      setLoadingProductosNuevos(true);

      axios
        .get(
          `http://localhost:3031/calzado_deportivo/productos_por_marca?marca=${marca}`
        )
        .then((response) => {
          setProductos(response.data);
          setLoadingProductosNuevos(false);
        })
        .catch((error) => {
          setProductos([]);
          setLoadingProductosNuevos(false);
          console.error("Error al obtener productos por marca:", error);
        });

      axios
        .get(
          `http://localhost:3031/calzado_deportivo/productos_nuevos_por_marca?marca=${marca}`
        )
        .then((response) => {
          setProductosNuevos(response.data);
          setLoadingProductosNuevos(false);
        })
        .catch((error) => {
          setProductosNuevos([]);
          setLoadingProductosNuevos(false);
          console.error("Error al obtener productos por marca:", error);
        });

      axios
        .get(
          `http://localhost:3031/calzado_deportivo/mejores_productos_por_marca?marca=${marca}`
        )
        .then((response) => {
          setMejoresProductos(response.data);
          setLoadingProductosNuevos(false);
        })
        .catch((error) => {
          setMejoresProductos([]);
          setLoadingProductosNuevos(false);
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
      <div>
        {productosNuevos.productos !== null &&
        productosNuevos.productos &&
        productosNuevos.productos.length > 0 ? (
          <div className="p-1 mb-4 rounded backdrop-blur-sm shadow-2xl">
            <ActiveSlider
              productos={productosNuevos.productos}
              titulo={"Nuevos productos"}
            />
          </div>
        ) : (
          ""
        )}

        <div className="p-1 mb-4 rounded backdrop-blur-sm shadow-2xl">
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
          <div className="p-1 mb-4 rounded backdrop-blur-sm shadow-2xl">
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
