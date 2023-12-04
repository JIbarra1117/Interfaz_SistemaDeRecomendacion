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
      <div className="w-full max-w-sm bg-white bg-opacity-0 border border-gray-200 rounded-lg shadow dark:bg-white-800 dark:border-gray-700">
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

          <div className="flex items-center mt-2.5 mb-5">
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

/*
// Ejemplo data retornadda
/**
  {
    "_id": "6569e6846d148cf82fbe723a",
    "modelo": "Nike Court Legacy Next Nature",
    "marca": "Nike",
    "color": "Blanco cumbre/Vela/Rosa perla/Palo de rosa",
    "descripcion": "Calzado para mujer",
    "url_raiz": "https://www.nike.com/us/es/w/calzado-y7ok",
    "url_calzado": "https://www.nike.com/us/es/t/calzado-court-legacy-next-nature-8r07x0/DH3161-106",
    "imagenes": [
      "https://static.nike.com/a/images/t_default/b38395a0-3d85-4bfe-b897-14717ba923ae/calzado-court-legacy-next-nature-8r07x0.png",
      "https://static.nike.com/a/images/t_default/f1cbaabe-1509-41c4-88d1-5d860fbe7bd0/calzado-court-legacy-next-nature-8r07x0.png",
      "https://static.nike.com/a/images/t_default/1e189f35-3c7f-49ca-a60b-4ef4449adf15/calzado-court-legacy-next-nature-8r07x0.png",
      "https://static.nike.com/a/images/t_default/74a7ffb7-faae-4614-ab4d-c752233d6dc0/calzado-court-legacy-next-nature-8r07x0.png",
      "https://static.nike.com/a/images/t_default/4c4f298c-0469-4637-9c99-ee8259c40a2e/calzado-court-legacy-next-nature-8r07x0.png",
      "https://static.nike.com/a/images/t_default/19969d45-3d68-4b96-9a3d-e6fd8a3a3df1/calzado-court-legacy-next-nature-8r07x0.png",
      "https://static.nike.com/a/images/t_default/0026ec7a-1972-4a16-a688-e2817cc6a4fd/calzado-court-legacy-next-nature-8r07x0.png",
      "https://static.nike.com/a/images/t_default/23db8ed4-1c83-4149-b69d-fe3c7b332c19/calzado-court-legacy-next-nature-8r07x0.png"
    ],
    "tallas": [
      "5",
      "5.5",
      "6",
      "6.5",
      "7",
      "7.5",
      "8",
      "8.5",
      "9",
      "9.5",
      "10",
      "10.5",
      "11",
      "11.5",
      "12"
    ],
    "precio": 70,
    "calificacion": 4.5
  },
 */