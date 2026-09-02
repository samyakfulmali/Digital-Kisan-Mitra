import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {t('appName')} - Smart Farming Assistant for Indian Farmers
          </p>
          <p className="mt-2 text-xs text-gray-400">
            {t('poweredBy') || 'Powered by AI & Agriculture Technology'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;