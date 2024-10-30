import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/pages/login';
import DashboardLayout from './components/layout/dashboarlayout';
import { useStore } from './components/store/useStore';
import SecuenciaDidactica from './components/pages/dir_academica/secuencia_did';
import GestionInvest from './components/pages/dir_investigacion/gestion_investigaciones';
import EstadoInvest from './components/pages/dir_investigacion/estado_investigaciones';
import Colores from './components/pages/configpub/colores';
import Home from './components/pages/Home';
import DirAcademica from './components/pages/dir_academica';
import DirInvestigacion from './components/pages/dir_investigaciones';
import Configpub from './components/pages/configpub';
import Error404 from './components/pages/Error404';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useStore((state) => state.user);
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

function App() {
  const darkMode = useStore((state) => state.darkMode);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          

          <Route path="/" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="/" element={<Home />} />
            <Route path='/dir-academica' element={<DirAcademica />} />
            <Route path="dir-academica/secuencia" element={<SecuenciaDidactica />} />
            <Route path='/dir-investigacion' element={<DirInvestigacion />} />
            <Route path="dir-investigacion/gestion-invest" element={<GestionInvest />} />
            <Route path="dir-investigacion/estado-invest" element={<EstadoInvest />} />
            <Route path='/configpub' element={<Configpub />} />
            <Route path="configpub/colores" element={<Colores />} />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
