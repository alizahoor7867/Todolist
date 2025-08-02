import React, { useEffect, useState } from 'react';
import { lorem } from './lorem';
import toast from 'react-hot-toast';

const LoremCreater = () => {
  const [number, setnumber] = useState('');
  const [mydata, setmydata] = useState([]);
  const [error, seterror] = useState(false);

  const handeleclick = (e) => {
    e.preventDefault();
    if (!number) {
      seterror(true);
      toast.error('please enter anumber');
    } else {
      if (number > lorem.length) {
        seterror(true);
        toast.error(`number should be less than ${lorem.length}`);
      } else {
        seterror(false);
        let newdata = lorem.slice(0, number);
        setmydata(newdata);
      }
    }

    setTimeout(() => {
      seterror(false);
    }, 3000);
  };

  useEffect(()=>{
    if(number >lorem.length){
        seterror(true)
    }
    else
    {
        seterror(false)
             let newdata = lorem.slice(0, number);
        setmydata(newdata);
    }

  },[number])
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className={`w-full max-w-md bg-white shadow-md rounded-xl p-6 ${error ? 'border border-red-600' : ''}`}>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Lorem Ipsum Generator
        </h2>
        <form>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Paragraphs
          </label>
          <input
            onChange={(e) => setnumber(e.target.value)}
            type="number"
            placeholder="Enter a number"
            className={`w-full px-4 py-2 rounded-md border ${error ? 'border-red-800' : 'border-gray-500'} focus:outline-none focus:ring-2 focus:ring-amber-400 transition`}
          />
{error && <p className='text-red-500 font-semibold'>Number should be less than or equal to {lorem.length}</p>}
          <button
            onClick={handeleclick}
            className="w-full mt-4 bg-amber-500 text-white py-2 rounded-md font-semibold hover:bg-amber-600 transition duration-300"
          >
            Generate
          </button>
        </form>
      </div>

      <div className="w-full max-w-4xl mt-10 space-y-6 px-4">
        {mydata.map((item, index) => (
          <p key={index} className="text-gray-700 text-base leading-relaxed bg-white p-4 rounded-lg shadow">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default LoremCreater;
