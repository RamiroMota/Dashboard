import React from 'react';

const AnimatedBackground = React.memo(() => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-gray-600 via-orange-500 to-blue-950">
          {[...Array(20)].map((_, i) => (
            <div
                key={`animated-background-${i}`}
                className={`
                absolute rounded-full mix-blend-screen filter blur-md opacity-70
                animate-float-slow
                ${i % 3 === 0 ? 'bg-orange-600' : i % 3 === 1 ? 'bg-gray-700' : 'bg-yellow-200'}
                `}
                style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${Math.random() * 40 + 25}s`,
                position: 'absolute',
                }}
            />          
          ))}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0z' fill='rgba(255,255,255,0.05)'/%3E%3C/svg%3E")`
            }}
          />
        </div>
      );
    });
    
    export default AnimatedBackground;