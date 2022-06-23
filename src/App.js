import React, { useEffect } from 'react'
import Main from './components/Main.js'
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return(
   <>
   <Main/>
   </>
  );
}

export default App;
