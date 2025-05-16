import { ref } from 'vue';
const params = new URLSearchParams(window.location.search);
const u = params.get("u");              
const p = params.get("p");
const decodedP = atob(p);          
const BASE_URL = import.meta.env.VITE_BASE_URL;
const AUTH_HEADER = 'Basic ' + btoa( u + ':' + decodedP );

export function useApi() {

  const result = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const request = async (endpoint = '', method = 'GET', body = null) => {
    const outlet = localStorage.getItem('selectedOutlet'); 
    loading.value = true;
    try {
      const options = {
        method,
        headers: {
          'Authorization': AUTH_HEADER,
          'Content-Type': 'application/json',
        },
      };

      if (body) {
        if (outlet) {
          body = {procedure_parameter: `'${outlet}'`  ,...body}  
        }
        options.body = JSON.stringify(body);
      }
    
      const res = await fetch(`${BASE_URL}${endpoint}`, options);

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      result.value = await res.json();
     
      return result.value; 
    } catch (err) {
      error.value = err;
      console.error('Fetch error:', err);
    } finally {
      loading.value = false;
    }
  };
  
  return { result, error, loading, request };
  
}
