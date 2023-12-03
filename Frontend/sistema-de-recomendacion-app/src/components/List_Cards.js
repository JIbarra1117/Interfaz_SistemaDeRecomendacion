import React, {  useState } from 'react';

const CardsList = ({ data }) => {
    const [links_images] = useState([
        { marca: "Vans", links: "https://logodownload.org/wp-content/uploads/2014/10/vans-logo-0.png", num: 0 },
        { marca: "Reebok", links: "https://i.pinimg.com/originals/d5/82/3e/d5823e979dcc07405154c72f9210c1aa.png", num: 0 },
        { marca: "Nike", links: "https://seeklogo.com/images/N/nike-just-do-it-logo-5F8374ABB9-seeklogo.com.png", num: 0 },
        { marca: "Adidas", links: "https://www.freepnglogos.com/uploads/adidas-logo-png-black-0.png", num: 0 },
        { marca: "Puma", links: "https://static.vecteezy.com/system/resources/previews/020/336/284/non_2x/puma-logo-puma-icon-free-free-vector.jpg", num: 0 },
        { marca: "Under Armour", links: "https://i.pinimg.com/originals/c0/49/c8/c049c866c97ce8cab98fdff432e8497d.png", num: 0 },
        {marca:"Converse", links:"https://1000logos.net/wp-content/uploads/2016/12/Converse-Logo-2003.png",num: 0}]);

    const obtener_img = (marca) => {
        const linkEncontrado = links_images && links_images.find(obj => obj.marca.toLowerCase() === marca.toLowerCase());
        return linkEncontrado ? linkEncontrado.links : '';
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto p-8">
                {data.map((marca) => (
                    <div key={marca.marca}>
                        <div className="relative overflow-hidden transition duration-300 ease-in-out transform bg-white shadow-lg rounded-xl hover:scale-90 w-1/2">
                            <img className="object-cover w-full h-48 md:h-36" src={obtener_img(marca.marca)} alt={marca.marca} />
                            <div className="p-4">
                                <h4 className="text-xl font-semibold text-neutral-600">{marca.marca}</h4>
                                <p className="mt-2 text-base font-normal text-gray-500 leading-relaxed">{marca.numeroCalzados}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardsList;
