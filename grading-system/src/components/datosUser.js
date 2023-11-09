import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const DataUser = () => {

    const [data, setData] = useState({});
   

  
    useEffect(() => {
     
       
    const token = sessionStorage.getItem('token');
   
  
    const decodedToken = jwtDecode(token);
    
      const requestOptions = {
        method: 'GET', // Método GET
        headers: {
          'Content-Type': 'application/json',
          'authorization': sessionStorage.getItem('token')
        }
       
      };
    
  
      fetch(`http://localhost:8080/api/user/${decodedToken.email}`, requestOptions)
        .then(response => response.json())
        .then(data => setData(data))
        
        
        .catch((error) => {
          if (error.name === 'AbortError') {
            console.log('Request aborted');}})
         
        
        
  
    
    }, []);
    return {data}
}

export default DataUser