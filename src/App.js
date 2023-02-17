
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Nav from './components/Nav';
import Footer from './components/Footer';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import Profile from './components/Profile';
import AddProduct from './components/AddProduct';
import ProductLIst from './components/ProductLIst';
import UpdateProduct from './components/UpdateProduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Nav/>
       <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path="/"      element={<ProductLIst/>}/>
        <Route path="/add"   element={<AddProduct/>}/>
        <Route path="/update/:id" element={<UpdateProduct/>}/>
        <Route path="/logout" element={<h1>Logout Component</h1>}/>
        <Route path="/profile"element={<Profile/>}/>
        </Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login"  element={<Login/>}/>
        </Routes>
       </BrowserRouter>
       <Footer/>
    </div>
  );
}
export default App;
