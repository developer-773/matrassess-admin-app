import axios from 'axios';
import { useQuery } from 'react-query';
import { Token } from '../auth';
const baseUrl = import.meta.env.VITE_APP_BASE_URL


export const useQueryData = (queryKey,path) => {

  return useQuery(queryKey, async () => {
    const { data } = await axios.get(`${baseUrl}/${path}`, {headers: {Authorization: Token}})
    return data;
  });
}




