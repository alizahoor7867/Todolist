import React from 'react'

const Singleuser = ({login,avatar_url,type,user_view_type

}) => {
  return (
    <>
    <div className=" p-5  shadow-xl">
             <img className='w-full object-cover' src={avatar_url 
} alt="" />
        <h3 className='text-gary-500 text-3xl'>{login}</h3>
        <h3 className='text-gary-500 text-3xl'>{type}</h3>
        <h3 className='text-gary-500 text-3xl'>{user_view_type
}</h3>
   
    </div>
    </>
  )
}

export default Singleuser