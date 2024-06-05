import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SingupPage';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
  return (
    <div className="flex flex-col h-screen justify-center">
      <ToastContainer
        position="top-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
      <header className="">
        <Navbar />
      </header>
      <main className="mb-auto">
        <Outlet />
      </main>
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
    </Routes>
  );
}

export default App;
