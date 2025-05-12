import Link from "next/link";

type HeaderLink = {
    href: string;
    label: string;
}

const navLinks: HeaderLink[] = [
  { href: "/catalog", label: "Catálogo" },
  { href: "/team", label: "Quiénes somos" },
  { href: "/support", label: "Soporte" },
];

const languageOptions = [
  { code: "es", flag: "🇪🇸" },
];

const LanguageSelector = () => (
  <button className="flex items-center space-x-1 hover:opacity-80">
    {languageOptions.map((lang) => (
      <span key={lang.code} className="text-lg">{lang.flag}</span>
    ))}
  </button>
);

const NavLink = ({ href, label }: HeaderLink) => (
  <Link href={href} className="hover:text-gray-300">
    {label}
  </Link>
);

const HeaderButtons = () => (
  <div className="flex items-center space-x-4 text-sm">
    <LanguageSelector />
    <Link
      href="#"
      className="px-4 py-1.5 bg-white text-[var(--bg-dark-blue)] rounded-md font-medium hover:opacity-90 transition"
    >
      Registrarse
    </Link>
    <Link
      href="#"
      className="px-4 py-1.5 border border-white rounded-md hover:bg-white/10 transition"
    >
      Iniciar sesión
    </Link>
  </div>
);

const Header = () => (
  <header className="bg-[var(--bg-dark-blue)] text-white">
    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold">
        LOGO
      </Link>
      <nav className="hidden md:flex space-x-8">
        {navLinks.map((link) => (
          <NavLink key={link.href} {...link} />
        ))}
      </nav>
      <HeaderButtons />
    </div>
  </header>
);

export default Header;
