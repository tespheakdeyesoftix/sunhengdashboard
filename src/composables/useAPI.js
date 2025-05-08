import { ref } from 'vue';
const params = new URLSearchParams(window.location.search);
const u = params.get("u");              
const p = params.get("p");
const outlet = params.get("outlet");              
const decodedP = atob(p);               
const BASE_URL = 'http://192.168.10.29:5008/api';
console.log(import.meta.env.BASE_URL)
const AUTH_HEADER = 'Basic ' + btoa( u + ':' + decodedP );

export function useApi() {
  const result = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const request = async (endpoint = '', method = 'GET', body = null) => {
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
        body = {procedure_parameter: outlet ,...body},
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
