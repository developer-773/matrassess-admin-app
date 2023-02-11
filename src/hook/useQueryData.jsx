import axios from 'axios';
import { useQuery } from 'react-query';
import { Token } from '../auth';
const baseUrl = import.meta.env.VITE_APP_BASE_URL


export const useQueryData = (path) => {

  return useQuery("posts", async () => {
    const { data } = await axios.get(`${baseUrl}/${path}`, {headers: {Authorization: Token}})
    return data;
  });
}


export const useQueryDat = (path) => {
    return useQuery("posts", async () => {
      const { data } = await axios.get(`${baseUrl}/${path}`, {headers: {Authorization: Token}})
      return data;
    });
}


