import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductCard from "./Product_Card";

const ActiveSlider = ({ productos, titulo }) => {
    const [validarRoll, setValidarScroll] = useState(true)
    // const [productos, setProductos] = useState(productos);

    useEffect(() => {
        // console.log(productos);
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
        <div className="max-w mx-auto select-none">
            <div className="grid grid-cols-1 p-5 rounded overflow-hidden text-black dark:text-white ">
                <div className="p-6">
                    <h1 className="flex items-center text-5xl font-extrabold dark:text-white">
                        {titulo}
                        {productos ? (
                            <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
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
                                    <div className="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                                        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                        </svg>
                                        <span className="sr-only">Aviso</span>
                                    </div>
                                </>
                            )}
                        </Slider> : 
                        (
                            <div className="flex  items-center p-1  text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium">NO HUBO {titulo.toUpperCase()}</span>
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

// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import ProductCard from "./Product_Card";

// const ActiveSlider = ({ productos, titulo }) => {
//     const [validarRoll, setValidarScroll] = useState(true);

//     useEffect(() => {
//         if (productos && productos.length < 4) {
//             setValidarScroll(false);
//         }
//     }, [productos]);

//     const settings = {
//         dots: true,
//         infinite: validarRoll,
//         slidesToShow: 4,
//         slidesToScroll: 4,
//         initialSlide: 0,
//         cssEase: "linear",
//         adaptiveHeight: true,
    
//     };

//     return (
//         <div className="max-w mx-auto">
//             <div className="grid grid-cols-1 p-5 rounded overflow-hidden text-black dark:text-white">
//                 <div className="p-6">
//                     <h1 className="flex items-center text-5xl font-extrabold dark:text-white">
//                         {titulo}
//                         {productos ? (
//                             <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
//                                 {productos.length}
//                             </span>
//                         ) : (
//                             ""
//                         )}
//                     </h1>
//                 </div>
//                 {/* grid grid-cols-2 md:grid-cols-4 gap-4 */}
//                 <div className="mb-2 p-2"> 
//                     {productos ? (
//                         <Slider {...settings}>
//                             {productos.map((item) => (
//                                 <ProductCard producto={item} key={item._id}></ProductCard>
//                             ))}
//                         </Slider>
//                     ) : (
//                         <div className="flex items-center p-1 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
//                             <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//                                 <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
//                             </svg>
//                             <span className="sr-only">Info</span>
//                             <div>
//                                 <span className="font-medium">NO HUBO {titulo.toUpperCase()}</span>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ActiveSlider;
