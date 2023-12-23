import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UltimoProcesoComponent = () => {
  const [ultimoProceso, setUltimoProceso] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const obtenerUltimoProceso = async () => {
    try {
      const response = await fetch('http://localhost:3031/procesoScrapy/ultimoProceso');
      const data = await response.json();
      setUltimoProceso(data);
      setError(null);

      // Verificar si la fecha del último proceso coincide con la fecha actual
      const fechaUltimoProceso = new Date(data.fecha).toDateString();
      const fechaActual = new Date().toDateString();
      // if (ultimoProceso.resultado == false) {
      //   // Redirigir a la página /home
      //   navigate('/home');
      // }
    } catch (error) {
      console.error('Error al obtener el último proceso:', error);
      setError('Error al obtener el último proceso');
    }
  };

  useEffect(() => {
    // Obtener el último proceso al cargar el componente
    obtenerUltimoProceso();

    // Configurar intervalo para obtener el último proceso cada minuto
    const intervalId = setInterval(() => {
      obtenerUltimoProceso();
    }, 60000); // 60000 milisegundos = 1 minuto

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []); // El segundo parámetro del useEffect es un array de dependencias, [] significa que se ejecutará solo al montar y desmontar

  useEffect(() => {
    if (ultimoProceso) {
      // Redirigir a la página /home
      navigate('/home');
    }
  }, [ultimoProceso])
  return (
    <div>
      {ultimoProceso ? (
        <div>
          <h2>Último Proceso:</h2>
          <p>Estado: {ultimoProceso.estado}</p>
          <p>Resultado: {ultimoProceso.resultado ? 'Aún extrayendo Datos' : 'Datos extraídos finalizados'}</p>
          <p>Fecha: {new Date(ultimoProceso.fecha).toLocaleString()}</p>
        </div>
      ) : (
        <p>{error || 'Cargando...'}</p>
      )}
    </div>
  );
};

export default UltimoProcesoComponent;
