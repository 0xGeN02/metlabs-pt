import { 
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from 'react-icons/fa6';

type FooterLink = { href: string; label: string; };
type SocialLink = { href: string; icon: React.ReactNode; ariaLabel: string; };

const socialLinks: SocialLink[] = [
  { href: "https://youtube.com", icon: <FaYoutube />, ariaLabel: "YouTube" },
  { href: "https://facebook.com", icon: <FaFacebookF />, ariaLabel: "Facebook" },
  { href: "https://instagram.com", icon: <FaInstagram />, ariaLabel: "Instagram" },
  { href: "https://x.com", icon: <FaXTwitter />, ariaLabel: "Twitter" },
  { href: "https://linkedin.com", icon: <FaLinkedinIn />, ariaLabel: "LinkedIn" },
];

const categoryLinks: FooterLink[] = [
  { href: "/real-state",    label: "Inmobiliaria" },
  { href: "/agrobusiness",  label: "Agrícola" },
  { href: "/solar",         label: "Solar" },
];

const helpLinks: FooterLink[] = [
  { href: "/team",    label: "Quiénes somos" },
  { href: "/support", label: "Soporte" },
];

const legalLinks: FooterLink[] = [
  { href: "/privacy-policy",   label: "Política de Privacidad" },
  { href: "/terms-conditions", label: "Términos y Condiciones" },
  { href: "/cookies-policy",   label: "Política de Cookies" },
];

const Footer = () => (
  <footer className="bg-[var(--bg-dark-blue)] text-white mt-16">
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">

      {/* Brand + copyright */}
      <div className="order-1 md:order-1 space-y-4">
        <h2 className="text-2xl font-bold">LOGO</h2>
        <p className="hidden md:block text-sm">&copy; 2025. All rights reserved.</p>
      </div>

      {/* Categorías */}
      <div className="order-2 md:order-2">
        <h3 className="text-lg font-semibold mb-3">Categorías</h3>
        <ul className="space-y-2 text-sm">
          {categoryLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-gray-300">{l.label}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Ayuda */}
      <div className="order-3 md:order-3">
        <h3 className="text-lg font-semibold mb-3">Ayuda</h3>
        <ul className="space-y-2 text-sm">
          {helpLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-gray-300">{l.label}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Legal */}
      <div className="order-4 md:order-4">
        <h3 className="text-lg font-semibold mb-3">Legal</h3>
        <ul className="space-y-2 text-sm">
          {legalLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-gray-300">{l.label}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Social */}
      <div className="order-5 md:order-5 space-y-4">
        {/* Título sólo en móvil */}
        <h3 className="text-lg font-semibold mb-2 md:hidden">Síguenos</h3>
        <div className="flex space-x-4 text-xl">
          {socialLinks.map((l) => (
            <a
              key={l.ariaLabel}
              href={l.href}
              aria-label={l.ariaLabel}
              className="hover:text-gray-300"
            >{l.icon}</a>
          ))}
        </div>
        {/* copyright en móvil */}
        <p className="text-sm mt-4 md:hidden">&copy; 2025. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
