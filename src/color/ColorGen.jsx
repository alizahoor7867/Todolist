import React, { useState } from 'react';
import Values from 'values.js';
import SingleColor from './SingleColor';

const ColorGen = () => {
  const [val, setval] = useState('');
  const [error, seterror] = useState(false);
  const [list, setlist] = useState([]);

  const handlechange = (e) => {
    e.preventDefault();
    try {
      seterror(false);
      const Color = new Values(val).all(10);
      setlist(Color);
      console.log(Color);
    } catch (error) {
      seterror(true);
      console.log('Invalid color code');
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Generate Your Color
          </h2>
          <form>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <input
              value={val}
              onChange={(e) => setval(e.target.value)}
              type="text"
              placeholder="Enter a color (e.g. #f15025 or red)"
              className={`w-full px-4 py-2 rounded-md border ${
                error ? 'border-red-600' : 'border-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-amber-400 transition`}
            />
            {error && (
              <p className="text-red-500 font-semibold mt-1">
                Invalid color name
              </p>
            )}
            <button
              onClick={handlechange}
              className="w-full mt-4 bg-amber-500 text-white py-2 rounded-md font-semibold hover:bg-amber-600 transition duration-300"
            >
              Generate
            </button>
          </form>
        </div>

        {list.length > 0 && (
          <div className="w-full max-w-6xl mt-10 px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {list.map((item, index) => (
                <SingleColor key={index} hex={item.hex} {...item}/>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ColorGen;
