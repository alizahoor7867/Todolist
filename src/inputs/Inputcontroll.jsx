import React, { useState } from "react";
import toast from "react-hot-toast";
import Singlename from "./Singlename";

const Inputcontroll = () => {
  const [name, setname] = useState("");
  const [error, seterror] = useState(false);
  const [data, setdata] = useState([]);
  const [update, setupdate] = useState(false);
  const [myid, setmyid] = useState(null);

  const handleclick = (e) => {
    e.preventDefault();

    let checknum = name?.split("").find((item) => !isNaN(item) && item !== " ");
    if (checknum) {
      seterror(true);
      toast.error("Name should not contain numbers");
      return;
    }

    const isDuplicate = data.find(
      (item) => item.name.toLowerCase() === name.toLowerCase() && item.id !== myid
    );
    if (isDuplicate) {
      toast.error("you entered doblicate entry");
      setname("");
      return;
    }

    if (!name) {
      seterror(true);
      toast.error("Please enter a value");
    } else if (!isNaN(name)) {
      toast.error("name should  not be a number");
    } else {
      if (update && myid !== null) {
        const updatedList = data.map((item) =>
          item.id === myid ? { ...item, name } : item
        );
        setdata(updatedList);
        toast.success("Updated successfully");
        setupdate(false);
        setmyid(null);
      } else {
        toast.success("Added successfully");
        setdata([...data, { name, id: Date.now() }]);
      }
      setname("");
      seterror(false);
    }

    setTimeout(() => seterror(false), 3000);
  };

  const remove = (id) => {
    const del = data.filter((item) => item.id !== id);
    setdata(del);
  };

  const updatedata = (id) => {
    setupdate(true);
    setmyid(id);
    let finddata = data?.find((item) => {
      return item.id == id;
    });
    setname(finddata.name);
  };

  return (
    <>
      <div className="container mx-auto p-6 max-w-lg bg-white shadow-xl rounded-lg mt-8">
        <form className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h5 className="text-lg font-bold text-blue-600">
              Total Entries: {data.length}
            </h5>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              value={name}
              onChange={(e) => setname(e.target.value)}
              type="text"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-400 outline-none transition duration-300"
              placeholder="Enter your name"
            />
            {error && (
              <p className="text-sm text-red-600 mt-1">
                Please enter a value.
              </p>
            )}
          </div>

          <button
            onClick={handleclick}
            className="w-full py-3 rounded-md font-semibold text-white bg-gradient-to-r from-red-500 to-emerald-600 hover:from-green-500 hover:to-red-600 transition duration-300"
          >
            {update ? "UpdateData" : "Add Data"}
          </button>
        </form>
      </div>

      <div className="container mx-auto my-10 px-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((item, index) => (
          <Singlename key={index} {...item} rem={remove} update={updatedata} />
        ))}
      </div>
    </>
  );
};

export default Inputcontroll;
