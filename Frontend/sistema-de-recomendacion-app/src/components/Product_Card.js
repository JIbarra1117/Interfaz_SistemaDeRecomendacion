import React, { useEffect, useState } from 'react';
import truncarTexto from '../complements/Format';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StarRating from './estrellas_calificacion';
import { FaHeartBroken } from "react-icons/fa";


const ProductCard = ({ producto }) => {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [corazonVisible, setCorazonVisible] = useState(false);
  const [corazonRotoVisible, setCorazonRotoVisible] = useState(false);

  if (producto.descripcion !== undefined) {
    producto.descripcion = producto.descripcion ? truncarTexto(producto.descripcion) : '';
  }

  const insertarProducto = (id) => {
    // Obtener productos almacenados en localStorage
    const productosGuardados = JSON.parse(localStorage.getItem('productosSeleccionados')) || [];

    // Verificar si el producto ya está en la lista
    if (!productosGuardados.includes(id)) {
      setCorazonRotoVisible(false);
      console.log('Data ingresada');
      // Añadir el nuevo producto al array
      const nuevosProductos = [...productosGuardados, id];

      // Actualizar el estado y localStorage
      setProductosSeleccionados(nuevosProductos);
      localStorage.setItem('productosSeleccionados', JSON.stringify(nuevosProductos));
      console.log(nuevosProductos);
      setCorazonVisible(true);
      setTimeout(() => setCorazonVisible(false), 1000); // Ocultar el corazón después de 1 segundo
    } else {
      setCorazonVisible(false);
      // Avisar que se eliminó
      console.log('Data eliminada');
      const nuevosProductos = productosGuardados.filter((idArray) => idArray !== id);
      console.log(nuevosProductos);

      // Actualizar el estado y localStorage
      setProductosSeleccionados(nuevosProductos);
      // Eliminar del array el producto
      localStorage.setItem('productosSeleccionados', JSON.stringify(nuevosProductos));
      setCorazonRotoVisible(true);
      setTimeout(() => setCorazonRotoVisible(false), 1000); // Ocultar el corazón roto después de 1 segundo
    }
  };

  return (
    <div className={`rounded-lg lg:w-80 lg:h-auto`} key={producto._id}>
      <div
        className={`w-full h-full max-w-sm bg-white bg-opacity-0  ${productosSeleccionados.includes(producto._id) ? 'border-red-500 border-4 ' : 'border-black border '
          }rounded-lg shadow dark:bg-white-800  transition transform hover:scale-105 duration-300 cursor-pointer relative`}
        onDoubleClick={() => insertarProducto(producto._id)}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        <a key={producto._id}>
          <img className="w-full h-60 object-cover rounded-t-lg" src={producto.imagenes[0]} alt="product image" />
        </a>
        <div className="px-5 pb-5 pt-6">
          <a>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{producto.modelo}</h5>
          </a>
          <a>
            <h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">Color: {producto.color}</h5>
          </a>
          <div className="flex items-center mt-2.5 mb-5">
            {producto.calificacion == -1 ? (
              <span className="bg-green-800 text-white text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-green-800 dark:text-white ms-3">
                <a>Nuevo</a>
              </span>
            ) : (
              <>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <StarRating calificacion={producto.calificacion}></StarRating>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                  <a>{producto.calificacion}</a>
                </span>
              </>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">${producto.precio}</span>
            <a
              href={producto.url_calzado}
              className="text-white bg-black-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-blue-800"
            >
              Ir al sitio
            </a>
          </div>
          {corazonVisible && (
            <div className="absolute top-2 right-2 text-red-500">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 14.25 2 11.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C16.09 3.81 17.76 3 19.5 3 22.58 3 25 5.42 25 8.5c0 2.78-3.4 5.75-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          )}
          {corazonRotoVisible && (
            <div className="absolute top-2 right-2 text-red-500" >
              <FaHeartBroken className="w-6 h-6 fill-current" />
            </div>
          )}
          {tooltipVisible && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-gray-800 text-white text-sm rounded opacity-90">
              {producto.descripcion}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;



