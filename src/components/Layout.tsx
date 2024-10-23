import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Home from '../pages/Home';
import SecuenciaDidactica from '../pages/SecuenciaDidactica';
import Investigaciones from '../pages/Investigaciones';
import Colores from '../pages/Colores';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/direccion-academica/secuencia-didactica" element={<SecuenciaDidactica />} />
            <Route path="/direccion-investigacion/investigaciones" element={<Investigaciones />} />
            <Route path="/configuracion/colores" element={<Colores />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}
