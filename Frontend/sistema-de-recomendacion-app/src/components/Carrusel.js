import React, { useEffect } from "react";
import Slider from "react-slick";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import ProductCard from "./Product_Card";

const ActiveSlider = ({ productos, titulo }) => {

    useEffect(() => {
        console.log(productos);
    }, [productos]);

    const estiloBoton = 'w-10 h-10 text-black'

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        // nextArrow: <CustomNextArrow />, // Usa componentes o elementos HTML para las flechas
        // prevArrow: <CustomPrevArrow />, // Usa componentes o elementos HTML para las flechas
        // key: JSON.stringify(productos._id),
    };

    return (
        <div className="max-w mx-auto">
            <div className="grid grid-cols-1 p-5 rounded overflow-hidden text-black dark:text-white">
                <h1 className="text-2xl font-bold ">{titulo}</h1>
                <div className="mb-2 p-2">
                    <Slider {...settings} >
                        {productos ? productos.map((item) => (
                            <ProductCard producto={item} key={item._id}></ProductCard>
                        )) : (<a>No hay data</a>)}
                    </Slider>
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