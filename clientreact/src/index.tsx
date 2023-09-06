import './index.css';
import './styles/Buttons.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Upload from './pages/Upload';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);



function App(){
  return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/upload" element={<Upload />}/>
            <Route path="/upload/:id" element={<Upload />}/>
        </Routes>
    </BrowserRouter>
  )
}
