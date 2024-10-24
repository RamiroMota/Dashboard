const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md mt-auto border-t border-gray-200 dark:border-gray-600">
      <div className="max-w-full mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            © 2024 Sistema Académico. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Términos
            </a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;