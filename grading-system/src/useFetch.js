import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setController(abortController);
    setLoading(true);
    // Opciones personalizadas para el fetch
    const requestOptions = {
      method: 'GET', // Método GET
      headers: {
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem('token')
      }
     
    };
  

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => setData(data))
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Request aborted');
        } else {
          setError(error);
        }
      })
      .finally(() => setLoading(false));

    return () => abortController.abort();
  }, [url, data]);

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setError('Request aborted');
    }
  };

  return { data, loading, error, handleCancelRequest };
}
