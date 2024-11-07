const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md border-t border-gray-200 dark:border-gray-600 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  pb-2 pt-3">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="w-full sm:w-auto">
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center sm:text-left">
              © 2024 Sistema Académico. Todos los derechos reservados.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
            <a 
              href="#" 
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              Términos
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              Privacidad
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;