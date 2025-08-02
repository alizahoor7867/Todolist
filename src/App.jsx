import React from 'react'
import '/globals.css';
import Api from './api/Api';
import Productapi from './api/Productapi';
import Inputcontroll from './inputs/Inputcontroll';
import { Toaster } from 'react-hot-toast';
import LoremCreater from './inputs/lorem/LoremCreater';
import ColorGen from './color/ColorGen';
import Values from 'values.js'


const App = () => {
  return (
    // <Api/>
    <>
    {/* // <Productapi/> */}

     {/* <Inputcontroll/> */}
    <Toaster   position="top-center"
/>
{/* <LoremCreater/> */}
<ColorGen/>

    </>
  )
} 

export default App