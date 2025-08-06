import React from 'react'
import '/globals.css';
import Api from './api/Api';
import Productapi from './api/Productapi';
import Inputcontroll from './inputs/Inputcontroll';
import { Toaster } from 'react-hot-toast';
import LoremCreater from './inputs/lorem/LoremCreater';
import ColorGen from './color/TextToSpeechApp';
import Values from 'values.js'
import TextToSpeechApp from './color/TextToSpeechApp';


const App = () => {
  return (
    // <Api/>
    <>
    {/* // <Productapi/> */}

     {/* <Inputcontroll/> */}
    <Toaster   position="top-center"
/>
{/* <LoremCreater/> */}
<TextToSpeechApp/>

    </>
  )
} 

export default App