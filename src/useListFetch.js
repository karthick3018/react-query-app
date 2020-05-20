import { useQuery } from 'react-query';
import axios from 'axios';

const useListDataFetch = () => {
  
  const fetchFromApi = async()=>{
    try{
      let response ;
      await axios.get('https://jsonplaceholder.typicode.com/posts').then(
        res => {
          response = res.data;
        }
      )
      return response;
    }
    catch(e){
      console.log('error',e)
    }
   
  }

  const { status, data, error } = useQuery('listData',fetchFromApi);

  return {
     status,
     data,
     error
  }


}

export default useListDataFetch;