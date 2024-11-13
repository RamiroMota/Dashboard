import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/pages/login';
import DashboardLayout from './components/layout/dashboarlayout';
import { useStore } from './components/store/useStore';
import SecuenciaDidactica from './components/pages/dir_academica/secuencia_did';
import Investigaciones from './components/pages/dir_investigacion/investigaciones';
import Home from './components/pages/Home';
import DirAcademica from './components/pages/dir_academica';
import DirInvestigacion from './components/pages/dir_investigaciones';
import Configuracion from './components/pages/configuracion';
import Error404 from './components/pages/Error404';
import UploadFile from './components/pages/FileUpload';
import ConfigGeneral from './components/pages/config/general';
import UserGestion from './components/pages/config/userGestion';
import SistemaReg from './components/pages/config/sistemaReg';
import UserList from './components/pages/config/usergest/userlist';

// Componente de ruta protegida
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useStore((state) => state.user);
  if (!user) return <Navigate to="/login" />;  // Redirigir a login si no hay usuario autenticado
  return <>{children}</>;
};

function App() {
  const darkMode = useStore((state) => state.darkMode);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />  {/* Ruta pública para login */}

          {/* Rutas protegidas */}
          <Route path="/" element={
            <ProtectedRoute>  {/* Ruta protegida */}
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="/" element={<Home />} />
            <Route path='/dir-academica' element={<DirAcademica />} />
            <Route path="dir-academica/secuencia" element={<SecuenciaDidactica />} />
            <Route path='/dir-investigacion' element={<DirInvestigacion />} />
            <Route path="dir-investigacion/investigaciones" element={<Investigaciones />} />
            <Route path='/configuracion' element={<Configuracion />} />
            <Route path="configuracion/gestionusuarios/" element={<UserGestion />} >
              <Route path="/configuracion/gestionusuarios/userlist" element={<UserList />} />
            </Route>
            <Route path="configuracion/general" element={<ConfigGeneral />} />
            <Route path="configuracion/regsistema" element={<SistemaReg />} />
            <Route path="/uploadfile" element={<UploadFile />} />
            <Route path="*" element={<Error404 />} />
          </Route>

          {/* Si el usuario no está autenticado y trata de acceder a una ruta privada, lo redirigimos al login */}
          <Route path="*" element={<Navigate to="/login" />} /> {/* Redirige a login si no es ruta válida */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;