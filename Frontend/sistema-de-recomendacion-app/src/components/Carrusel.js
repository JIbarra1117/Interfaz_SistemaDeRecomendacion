import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import ProductCard from "./Product_Card";

const ActiveSlider = ({ productos, titulo }) => {
    const [validarRoll, setValidarScroll] = useState(true)
    // const [productos, setProductos] = useState(productos);

    useEffect(() => {
        console.log(productos);
        if (productos && productos.length < 4) {
            setValidarScroll(false);
        }
    }, [productos]);

    const settings = {
        dots: true,
        infinite: validarRoll,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        cssEase: "linear",
    };

    return (
        <div className="max-w mx-auto ">
            <div className="grid grid-cols-1 p-5 rounded overflow-hidden text-black dark:text-white ">
                <div className="p-6">
                    <h1 className="flex items-center text-5xl font-extrabold dark:text-white">
                        {titulo}
                        {productos ? (
                            <span class="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
                                {productos.length}
                            </span>
                        ) : ''}

                    </h1>
                </div>
                <div className="mb-2 p-2">
                    {productos ?
                        <Slider {...settings}>
                            {productos ? productos.map((item) => (
                                <ProductCard producto={item} key={item._id}></ProductCard>
                            )) : (
                                <>
                                    <div class="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                                        <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                        </svg>
                                        <span class="sr-only">Aviso</span>
                                    </div>
                                </>
                            )}
                        </Slider> : (
                            <div class="flex  items-center p-1  text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span class="sr-only">Info</span>
                                <div>
                                    <span class="font-medium">NO HUBO {titulo.toUpperCase()}</span>
                                </div>
                            </div>
                            // Renderizar algo cuando productos es undefined
                        )}
                </div>
            </div>
        </div>

    );
};

export default ActiveSlider;
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