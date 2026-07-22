
import './App.css';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/pages/Navbar';
import HomePage from './components/pages/HomePage';

import Footer from './components/pages/Footer';
import Registration from './components/pages/Registeration'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from './components/pages/Users';
import Admin from './components/pages/Admin';
import Profile from './components/pages/Profile';
import Login from './components/pages/Login';
import Booksdetails from './components/pages/Booksdetails';
import Mybooks from './components/pages/Mybooks';
import AddBook from './components/pages/AddBook';

import Users from './components/pages/Users';
import Requests from './components/pages/Requests';
import DueBooks from './components/pages/DueBooks';
import FineHistory from './components/pages/FineHistory';




function App() {
  return (
    <div>
      <BrowserRouter>

        <Navbar />


        <Routes>

          {/* public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />

          {/* user routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookDetails" element={<Booksdetails />} />
          <Route path="/mybooks" element={<Mybooks />} />


          {/* admin routes  */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/add-book" element={<AddBook />} />
         
          <Route path="/users" element={<Users />} />
          <Route path="/requests" element={<Requests />} />
          
          <Route path="/due-books" element={<DueBooks />} />
           <Route path="/fine-history" element={<FineHistory />} />


        </Routes>

      </BrowserRouter>


    
      <Footer />
      <ToastContainer />


    </div>

  );
}

export default App;
