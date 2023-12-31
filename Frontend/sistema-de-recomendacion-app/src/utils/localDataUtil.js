
function obtenerListaProductos() {
    return JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
}

export {obtenerListaProductos};