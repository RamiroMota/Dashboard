import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isFading, setIsFading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Correo: email, Password: password }),
      });
  
      if (!response.ok) {
        const message = await response.json();
        setError(message.message || 'Error al iniciar sesión');
        return;
      }
  
      const data = await response.json();
  
      if (data.token && data.user) {
        localStorage.setItem('authToken', data.token);
        setUser({
          name: `${data.user.Nombre} ${data.user.Apellidos}`,
          email: data.user.Correo,
          role: data.user.Rol,
        });
  
        navigate('/');
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.log(error);
      setError('Error de red o servidor');
    }
  };

  const handleCloseAlert = () => {
    setIsFading(true);
    setTimeout(() => setError(''), 500);
  };

  useEffect(() => {
    if (error) {
      setIsFading(false);
      const timer = setTimeout(() => {
        handleCloseAlert();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      <AnimatedBackground />
      <div className="relative flex items-center justify-center min-h-screen">
        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-lg p-8 w-96 relative border border-white/20">
          <div className="text-center mb-6">
            <LogIn className="mx-auto h-12 w-12 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-800">Bienvenido de nuevo</h2>
          </div>

          {error && (
            <div
              className={`absolute top-0 left-0 w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md z-50 transition-opacity duration-500 ${
                isFading ? 'opacity-0' : 'opacity-100'
              }`}
              role="alert"
            >
              <strong className="font-bold mr-2">Aviso</strong>
              <span>{error}</span>
              <button
                type="button"
                onClick={handleCloseAlert}
                className="absolute top-0 right-0 mt-2 mr-2 text-red-500 hover:text-red-700"
                aria-label="Cerrar alerta"
              >
                <svg className="fill-current h-6 w-6" viewBox="0 0 20 20">
                  <title>Cerrar alerta</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white/5 border-gray-800/70 focus:border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/70 text-gray-800 placeholder-gray-800/70"
                placeholder="correoinstitucional@upgch.mx"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-800">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white/5 border-gray-800/70 focus:border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/70 text-gray-800 placeholder-gray-800/70"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-800/70"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600/80 text-gray-800/70 font-semibold py-2 rounded-lg hover:bg-gray-800 hover:text-white/80 transition duration-200"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;