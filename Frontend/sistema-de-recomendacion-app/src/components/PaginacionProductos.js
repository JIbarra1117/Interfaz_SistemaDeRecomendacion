import React, { useEffect, useState } from "react";
import ProductCard from "./Product_Card";
import {obtenerSiProductoEsMarcado} from '../utils/localDataUtil'

const PaginacionProductos = ({ productos }) => {
  const itemsPerPage = 12; // Número de productos por página
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productos.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(productos.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getPageNumbers = () => {
    const totalPages = Math.ceil(productos.length / itemsPerPage);

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const leftBound = Math.max(1, currentPage - 2);
    const rightBound = Math.min(currentPage + 2, totalPages);

    const result = [];

    if (leftBound > 1) {
      result.push(1, "...");
    }

    for (let i = leftBound; i <= rightBound; i++) {
      result.push(i);
    }

    if (rightBound < totalPages) {
      result.push("...", totalPages);
    }

    return result;
  };
  return (
    <div className="max-w mx-auto">
      <h1 className="flex items-center text-5xl font-extrabold dark:text-white animate-fade animate-ease-in-out p-6">
        Todos los productos
        {productos ? (
          <span
            key={productos.length}
            className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2"
          >
            {productos.length}
          </span>
        ) : (
          ""
        )}
      </h1>
      <div
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4 animate-fade animate-ease-in-out"
        key={currentItems[0]._id}
      >
        {currentItems.map((product) => (
          <>
            <div className="flex items-center justify-center">
              <div className="max-w-sm w-full">
                <ProductCard producto={product} estado={obtenerSiProductoEsMarcado(product._id)} key={product._id}/>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className=" pt-6">
        <div className="flex rounded-lg items-center  border-t border-gray-200 bg-white py-3 sm:px-11">
          <div className="flex flex-1 justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Se muestran
                <span className="font-medium">
                  <> </>1 <> </>
                </span>
                a
                <span className="font-medium">
                  <> </>
                  {currentItems.length}
                  <> </>
                </span>
                de
                <span className="font-medium">
                  <> </>
                  {productos.length}
                  <> </>
                </span>
                productos
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {getPageNumbers().map((item, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof item === "number" ? paginate(item) : null
                    }
                    className={
                      currentPage === item
                        ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    }
                    disabled={typeof item === "string"}
                  >
                    {item}
                  </button>
                ))}
                <button
                  onClick={nextPage}
                  disabled={
                    currentPage === Math.ceil(productos.length / itemsPerPage)
                  }
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginacionProductos;
