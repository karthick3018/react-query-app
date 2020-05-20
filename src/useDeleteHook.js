import { useMutation,queryCache } from 'react-query';
import axios from 'axios';

const useDeleteFn = () => {
  return useMutation(
    async (values) => {
      const data = {
        id: values.id,
        title: values.title,
        body: values.body,
        userId: values.userId
      }

      await axios.put(`https://jsonplaceholder.typicode.com/posts/${values.id}`, data).then(
        res => {
          return res.data
        }
      )
    },

    {

      onMutate: editedValue => {
        const previousValue = queryCache.getQueryData('listData')
        const updatedValue = [...previousValue]
        const removeDeleted = updatedValue.filter((eachValue) => eachValue.id !== editedValue.id)

      
          queryCache.setQueryData('listData', removeDeleted)
        

        return () => queryCache.setQueryData('listData', previousValue)
      },

      onError: (error, editedValue, rollback) => {
        rollback();
      },

      onSettled: (data, error, editedValue) => {
        queryCache.removeQueries(['listData', editedValue.id]);
        // queryCache.refetchQueries('listData');
      },

    }
  )
}

export default useDeleteFn;