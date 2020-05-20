import * as React from 'react';
import useEditHook from './useEditHook';
import useDeleteHook from './useDeleteHook';


const EditDeleteData = ({
 values
})=>{

  const [editValues,setEditValues] = React.useState(null);
  const [valueEdit,{ status }] = useEditHook();
  const [deleteFn] = useDeleteHook();

  React.useEffect(()=>{
    setEditValues(values);
  },[values])

  const handleInputChange =(e)=>{
    setEditValues({
      ...editValues,
      title : e.target.value
    })
  }

  const handleEdit = () => {
    valueEdit(editValues);
  }

  const handleDelete = () => {
    deleteFn(editValues);
  }

  return(
    <>
     <input
      value = { (editValues && editValues.title) ||'' }
      onChange = { handleInputChange }
     />
     <button onClick={ handleEdit }>Edit</button>
     <button onClick={ handleDelete }>Delete</button>
    </>
  )
}

export default EditDeleteData;