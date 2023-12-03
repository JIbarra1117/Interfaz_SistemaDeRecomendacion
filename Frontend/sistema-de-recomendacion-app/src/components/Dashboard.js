import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardsList from '../components/List_Cards'
import Dropdown from './Dropdowns';
import Header from './Header';
import Dashboard_muestra from './muestra';
import SideBar from '../Pages/Inicio';

const Dashboard = ({ marca }) => {
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(marca);
  const [currentPage, setCurrentPage] = useState(1);
  const [marcasData, setMarcasData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' o 'desc'
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get('http://localhost:3030/calzado_deportivo/numero_calzados_por_marca')
      .then(response => {
        setMarcasData(response.data);
      })
      .catch(error => console.error('Error al obtener datos de marcas:', error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3030/calzado_deportivo/marcas')
      .then(response => {
        const data = response.data;
        if (Array.isArray(data.marcas)) {
          setMarcas(data.marcas);
        } else {
          console.error('La respuesta de marcas no es un array:', data);
        }
      })
      .catch(error => console.error('Error al obtener marcas:', error));
  }, []);


  useEffect(() => {
    if (marcaSeleccionada) {
      axios.get(`http://localhost:3030/calzado_deportivo/productos_por_marca?marca=${marcaSeleccionada}`)
        .then(response => setProductos(response.data))
        .catch(error => console.error('Error al obtener productos por marca:', error));
    }
  }, [marcaSeleccionada]);


  useEffect(() => {
    // Realizar la solicitud al backend
    axios.get('http://localhost:3030/calzado_deportivo/numero_calzados_por_marca')
      .then(response => {
        setMarcasData(response.data);
      })
      .catch(error => console.error('Error al obtener datos de marcas:', error));
  }, []);
  
  const tuLogicaParaFiltrarProductosPorMarca = (marca) => {
    const productosFiltrados = productos.filter(producto => producto.marca === marca);
    return productosFiltrados;
  };
  const handleMarcaChange = (marca) => {
    const productosFiltrados = tuLogicaParaFiltrarProductosPorMarca(marca);
    setProductos(productosFiltrados);
    setCurrentPage(1);
    setMarcaSeleccionada(marca);
  };



  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSort = (column) => {
    setSortBy(column);

    // Si la columna es la misma que la columna actual, invertir el orden.
    setSortOrder((prevOrder) => (column === sortBy && prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedProductos = () => {
    if (!sortBy) {
      return productos;
    }

    return sortedProductos().slice(startIdx, endIdx).sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;

      if (sortBy === 'MODELO' || sortBy === 'MARCA' || sortBy === 'COLOR') {
        const propA = a[sortBy] || '';
        const propB = b[sortBy] || '';
        return propA.localeCompare(propB) * order;
      } else if (sortBy === 'PRECIO') {
        const numA = a[sortBy] || 0;
        const numB = b[sortBy] || 0;
        return (numA - numB) * order;
      }

      return 0;
    });
  };

  const totalPages = Math.ceil(productos.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = currentPage * itemsPerPage;
  const generatePagination = () => {
    const visiblePages = 5;
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - Math.floor(visiblePages / 2) &&
          i <= currentPage + Math.floor(visiblePages / 2))
      ) {
        pages.push(
          <a
            key={i}
            href="#"
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${i === currentPage ? 'bg-orange-600 text-white' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              } focus:z-20 focus:outline-offset-0`}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </a>
        );
      }
    }

    return pages;
  };


  return (
    <div>
      <SideBar />
      <Header></Header>
      <Dashboard_muestra />
      {/* <h1
        className=" mx-auto max-w-3xl text-center bg-gradient-to-r from-red-300 via-orange-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
      >
        Marcas obtenidas
      </h1> */}

      <CardsList data={marcasData}></CardsList>

      <div className="mx-auto max-w-3xl text-center">
        <h1
          className="bg-gradient-to-r from-red-300 via-orange-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
        >
          PRODUCTOS
        </h1>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div>
                <Dropdown marcas={marcas} handleMarcaChange={handleMarcaChange}></Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 text-dark-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-black bg-gray-700 text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-3 text-center text-white">
                <button
                  className="focus:outline-none"
                  onClick={() => handleSort('MODELO')}
                >
                  Modelo
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-center text-white">
                <button
                  className="focus:outline-none"
                  onClick={() => handleSort('MARCA')}
                >
                  Marca
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-center text-white">
                <button
                  className="focus:outline-none"
                  onClick={() => handleSort('PRECIO')}
                >
                  Precio
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-center text-white">
                <button
                  className="focus:outline-none"
                  onClick={() => handleSort('COLOR')}
                >
                  Color
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-center w-1/6 text-white">Tallas</th>
              <th scope="col" className="px-6 py-3 text-center text-white">Descripcion</th>
              <th scope="col" className="px-6 py-3 text-center text-white">Imagen</th>
              <th scope="col" className="px-6 py-3 text-center text-white">Donde comprar</th>
            </tr>
          </thead>
          <tbody>
            {sortedProductos().slice(startIdx, endIdx).map((prod, index) => (
              <tr className='bg-white border-b  relative w-auto transition-all '
                key={`${prod.marca}_${index}`}>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{prod.modelo}</td>
                <td className="px-6 py-4">{prod.marca}</td>
                <td className="px-6 py-4">{prod.precio}</td>
                <td className="px-6 py-4">{prod.color}</td>
                <td className="px-6 py-4">
                  {prod.tallas.map((talla, index) => (
                    (<li key={`${talla}_${index}`}>{talla}</li>)
                  ))}
                </td>
                <td className="px-6 py-4 ">{prod.descripcion}</td>
                <td className="px-6 py-4">
                  <figure className="">
                    <img className="rounded-lg " src={prod.imagenes[0]} alt="Producto" />
                    <figcaption className="absolute px-4 text-lg text-white bottom-6"></figcaption>
                  </figure>
                </td>
                <td className="px-6 py-4 text-center">
                  <a href={prod.url_calzado} >Ir al sitio web</a>
                </td>
              </tr>
            ))}
          </tbody>
          <div className='place-content-center'>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm " aria-label="Pagination">
              <a
                href="#"
                onClick={handlePrevPage}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 && 'cursor-not-allowed opacity-50'
                  }`}
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </a>
              {generatePagination()}
              <a
                href="#"
                onClick={handleNextPage}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === totalPages && 'cursor-not-allowed opacity-50'
                  }`}
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </a>
            </nav>
          </div>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;
