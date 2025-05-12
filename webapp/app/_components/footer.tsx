import { 
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from 'react-icons/fa6';

const Footer = () => (
  <footer className="bg-[var(--bg-dark-blue)] text-white">
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
      {/* Logo + Redes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">LOGO</h2>
        <div className="flex space-x-4 text-xl">
          <a href="https://www.youtube.com/" aria-label="YouTube" className="hover:text-gray-300"><FaYoutube /></a>
          <a href="https://www.facebook.com/" aria-label="Facebook" className="hover:text-gray-300"><FaFacebookF /></a>
          <a href="https://www.instagram.com/" aria-label="Instagram" className="hover:text-gray-300"><FaInstagram /></a>
          <a href="https://www.x.com" aria-label="Twitter" className="hover:text-gray-300"><FaXTwitter /></a>
          <a href="https://www.youtube.com/" aria-label="LinkedIn" className="hover:text-gray-300"><FaLinkedinIn /></a>
        </div>
        <p className="text-sm mt-4">&copy; 2025. All rights reserved.</p>
      </div>

      {/* Categorías */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Categorías</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="/" className="hover:text-gray-300">Inmobiliaria</a></li>
          <li><a href="/" className="hover:text-gray-300">Agrícola</a></li>
          <li><a href="/" className="hover:text-gray-300">Solar</a></li>
        </ul>
      </div>

      {/* Ayuda */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Ayuda</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-gray-300">Quiénes somos</a></li>
          <li><a href="#" className="hover:text-gray-300">Soporte</a></li>
        </ul>
      </div>

      {/* Legal */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Legal</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-gray-300">Política de Privacidad</a></li>
          <li><a href="#" className="hover:text-gray-300">Términos y Condiciones</a></li>
          <li><a href="#" className="hover:text-gray-300">Política de Cookies</a></li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
