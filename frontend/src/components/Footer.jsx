import { Globe, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer bg-white dark:bg-gray-800 border-t dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex flex-col sm:flex-row sm:justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <span>
              <Globe className="mr-2 h-4 w-4 inline-block" />
              Digital Kisan Mitra &copy; {new Date().getFullYear()}
            </span>
            <span>
              Made with <span className="text-red-500">❤️</span> for farmers
            </span>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-700 dark:hover:text-gray-300"
            >
              <ExternalLink className="h-4 w-4 inline-block" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;