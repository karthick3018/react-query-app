import { useMutation, queryCache } from 'react-query';
import axios from 'axios';

const useEditFn = () => {

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
        const index = updatedValue.findIndex((eachValue) => eachValue.id === editedValue.id)

        if (index !== -1) {
          updatedValue[index] = {
            ...updatedValue[index],
            ...editedValue,
          }
          queryCache.setQueryData('listData', updatedValue)
        }

        return () => queryCache.setQueryData('listData', previousValue)
      },

      onError: (error, editedValue, rollback) => {
        rollback();
      },

      onSettled: (data, error, editedValue) => {
        queryCache.removeQueries(['listData', editedValue.id]);
        // queryCache.refetchQueries('listData');
      },
      onSuccess: (data, variables) => {
        queryCache.setQueryData(['listData', { id: variables.id }], variables)
      },

    }

  )
}

export default useEditFn;