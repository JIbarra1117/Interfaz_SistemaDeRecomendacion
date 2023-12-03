
function truncarTexto(texto) {
    const palabras = texto.split(' ');

    if (palabras.length > 20) {
        const truncado = palabras.slice(0, 20).join(' ') + '...';
        return truncado;
    }

    return texto;
}

export default truncarTexto;