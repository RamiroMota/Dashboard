import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { LogIn, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Nuevo estado para mostrar/ocultar contraseña
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated login - in production, you would validate against a backend
    if (email && password) {
      setUser({
        name: 'Fernando Arreola',
        email: email,
        role: 'Docente'
      });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <LogIn className="mx-auto h-12 w-12 text-orange-500" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Bienvenido de nuevo
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Ingresa tus credenciales para acceder al sistema
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'} // Cambiar tipo según estado
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} // Cambiar estado al hacer clic
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 border-gray-300 rounded text-orange-500 bg-white checked:bg-orange-500 focus:ring-orange-500"
              />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-black hover:text-orange-500">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>

      {/* Right side - Image with diagonal slats effect */}
      <div className="hidden lg:block relative flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80"
          alt="Education background"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Diagonal slats */}
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-black opacity-30 mix-blend-multiply"></div>
            <div className="slats-container">
              <div className="slats"></div>
              <div className="slats delay-200"></div>
              <div className="slats delay-400"></div>
              <div className="slats delay-600"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles for slats */}
      <style>{`
        .slats-container {
          position: relative;
          overflow: hidden;
        }

        .slats {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: rgba(255, 255, 255, 0.5);
          transform: rotate(-30deg);
          animation: slide 5s infinite;
        }

        .slats.delay-200 {
          animation-delay: 0.2s;
        }

        .slats.delay-400 {
          animation-delay: 0.4s;
        }

        .slats.delay-600 {
          animation-delay: 0.6s;
        }

        @keyframes slide {
          0% {
            transform: translateX(-100%) rotate(-30deg);
          }
          50% {
            transform: translateX(100%) rotate(-30deg);
          }
          100% {
            transform: translateX(-100%) rotate(-30deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
