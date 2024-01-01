function obtenerListaProductos() {
  return JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
}

function obtenerSiProductoEsMarcado(id) {
  const data = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
    return data.includes(id)
}

export { obtenerListaProductos, obtenerSiProductoEsMarcado };
