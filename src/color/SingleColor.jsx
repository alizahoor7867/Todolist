import React from 'react';
import toast from 'react-hot-toast';
import { FaRegCopy } from "react-icons/fa6";



const SingleColor = ({ rgb, hex }) => {
    const handlecopy =()=>{
        const hexCode =`#${hex}`;
        navigator.clipboard.writeText(hexCode);
toast.success(`${hexCode} copied successfully`);
    }
  return (
    <>
      <div
        style={{
          background: `rgb(${rgb.join(',')})`,
        }}
        className="p-15 shadow-xl  relative rounded-md text-center text-white font-semibold"
      >
<FaRegCopy
onClick={handlecopy}
 className="absolute right-5 top-5 cursor-pointer" size={25}  color='black'/>

        <h5 className='text-gray-900 text-2xl'>#{hex}</h5>
      </div>
    </>
  );
};

export default SingleColor;
