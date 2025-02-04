import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage , SignupPage , Home , CreateProduct} from './routes.jsx';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/create-product" element={<CreateProduct />} />
                
                <Route path="/" element={<Home/>} />

            </Routes>
        </BrowserRouter>
    );
}


export default App;  