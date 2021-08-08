import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Einstein from './mainComponents/Einstein';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

const App = () => {

  useEffect(() => {

  }, []);

  return (
    <BrowserRouter>
      <Einstein />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
