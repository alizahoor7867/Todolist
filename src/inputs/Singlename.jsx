import React from 'react'
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";



const Singlename = ({name,id,rem,update}) => {

  return (
    <>
    <div className="shadow-xl rounded-md p-5 my-5">
        <div className="flex justify-between items-center">
       <h5 className='font-semibold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent'>
{name}
</h5>
<div className="flex gap-2">

             <FaTrash className='text-blue-500 text-lg hover:text-blue-700 cursor-pointer' onClick={()=>rem(id)} />
             <FaEdit onClick={()=>update(id)} className="text-blue-500 text-lg hover:text-blue-700 cursor-pointer" />

                </div>
        </div>
      

    </div>
   
    </>
    
  )
}

export default Singlename