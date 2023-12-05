import React from 'react';
import truncarTexto from '../complements/Format';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StarRating from './estrellas_calificacion';

const ProductCard = ({ producto }) => {

  if (producto.descripcion !== undefined) {
    producto.descripcion = truncarTexto(producto.descripcion)
  }

  return (
    <div className="rounded-lg shadow lg:w-80 lg:h-auto h-[300px]" key={producto._id}>
      <div className="w-full h-full max-w-sm bg-white bg-opacity-0  border border-gray-200 rounded-lg shadow dark:bg-white-800 dark:border-gray-700">
        <a key={producto._id}>
          <img className="scale-125 p-8 rounded-t-lg" src={producto.imagenes[0]} alt="product image" />
        </a>
        <div className="px-5 pb-5 pt-6">
          <a >
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{producto.modelo}</h5>
          </a>
          <a >
            <h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">Color: {producto.color}</h5>
          </a>

          <div className="flex items-center mt-2.5 mb-5 ">
            {
              producto.calificacion == -1 ? (
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

              )
            }
          </div>
          <div className="flex items-center justify-between" >
            <span className="text-3xl font-bold text-gray-900 dark:text-white">${producto.precio}</span>
            <a href={producto.url_calzado} className="text-white bg-black-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-blue-800">
              Ir al sitio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;