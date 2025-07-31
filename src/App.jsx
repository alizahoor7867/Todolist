import React from 'react'
import '/globals.css';
import Api from './api/Api';
import Productapi from './api/Productapi';
import Inputcontroll from './inputs/Inputcontroll';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    // <Api/>
    <>
    {/* // <Productapi/> */}
    <Inputcontroll/>
    <Toaster   position="top-center"
/>
    </>
  )
} 

export default App