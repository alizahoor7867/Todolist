import React, { useEffect, useState } from 'react';
import Singleuser from './Singleuser';
import { CircleLoader } from 'react-spinners';


const Api = () => {
  const [user, setUser] = useState([]);
  const [loading ,setloading]=useState(true);
  const api = 'https://api.github.com/users';

  const getdata = async () => {
    const response = await fetch(api);
    const data = await response.json();
    setUser(data);
    setloading(false);
    console.log(data);
  };

  useEffect(() => {
    getdata();

  }, []);
 if ( loading) {
  return (
    <div className="flex justify-center items-center h-screen ">
      <CircleLoader color="#36d7b7" size={100} />
    </div>
  );
}

  return (
    <div className="container grid mx-auto grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {user.map((item, index) => (
        <Singleuser key={index} {...item} />
      ))}
    </div>
  );
};

export default Api;
