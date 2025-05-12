import { 
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from 'react-icons/fa6';

type FooterLink = {
  href: string;
  label: string;
}

type SocialLink = {
  href: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

const socialLinks: SocialLink[] = [
  { href: "https://www.youtube.com/", icon: <FaYoutube />, ariaLabel: "YouTube" },
  { href: "https://www.facebook.com/", icon: <FaFacebookF />, ariaLabel: "Facebook" },
  { href: "https://www.instagram.com/", icon: <FaInstagram />, ariaLabel: "Instagram" },
  { href: "https://www.x.com", icon: <FaXTwitter />, ariaLabel: "Twitter" },
  { href: "https://www.linkedin.com/", icon: <FaLinkedinIn />, ariaLabel: "LinkedIn" },
];

const categoryLinks: FooterLink[] = [
  { href: "/real-state", label: "Inmobiliaria" },
  { href: "/agrobusiness", label: "Agrícola" },
  { href: "/solar", label: "Solar" },
];

const helpLinks: FooterLink[] = [
  { href: "/team", label: "Quiénes somos" },
  { href: "/support", label: "Soporte" },
];

const legalLinks: FooterLink[] = [
  { href: "/privacy-policy", label: "Política de Privacidad" },
  { href: "/terms-conditions", label: "Términos y Condiciones" },
  { href: "/cookies-policy", label: "Política de Cookies" },
];

const FooterLink = ({ href, label }: FooterLink) => (
  <li>
    <a href={href} className="hover:text-gray-300">
      {label}
    </a>
  </li>
);

const SocialLinks = () => (
  <div className="flex space-x-4 text-xl">
    {socialLinks.map((link) => (
      <a 
        key={link.ariaLabel} 
        href={link.href} 
        aria-label={link.ariaLabel} 
        className="hover:text-gray-300"
      >
        {link.icon}
      </a>
    ))}
  </div>
);

const FooterSection = ({ title, links }: { title: string, links: FooterLink[] }) => (
  <div>
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <ul className="space-y-2 text-sm">
      {links.map((link) => (
        <FooterLink key={link.label} {...link} />
      ))}
    </ul>
  </div>
);

const BrandSection = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">LOGO</h2>
    <SocialLinks />
    <p className="text-sm mt-4">&copy; 2025. All rights reserved.</p>
  </div>
);

const Footer = () => (
  <footer className="bg-[var(--bg-dark-blue)] text-white">
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
      <BrandSection />
      <FooterSection title="Categorías" links={categoryLinks} />
      <FooterSection title="Ayuda" links={helpLinks} />
      <FooterSection title="Legal" links={legalLinks} />
    </div>
  </footer>
);

export default Footer;