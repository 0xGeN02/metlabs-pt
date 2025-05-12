"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaWallet } from "react-icons/fa";
import Image from "next/image";
import onboard from "@/lib/web3-onboard"
import { toast } from "sonner";
import { usePathname } from "next/navigation";

type HeaderLink = { href: string; label: string; };
const navLinks: HeaderLink[] = [
  { href: "/catalog",    label: "Catálogo" },
  { href: "/team",       label: "Quiénes somos" },
  { href: "/support",    label: "Soporte" },
];
const languageOptions = [{ code: "es", flag: "🇪🇸" }];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null); // Add state for wallet address

  useEffect(() => {
    // Leer usuario de localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const connectWallet = async () => {
    const wallets = await onboard.connectWallet();
    if (wallets && wallets.length > 0) {
      const address = wallets[0].accounts[0].address;
      await fetch('/api/user/wallet', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify({ address }),
      });
      toast.info(`Wallet conectada`);
      setWalletAddress(address);
    }
  };

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`; // Show first 6 and last 4 characters
  };

  const shouldShowWalletButton = !["/auth/login", "/auth/register"].includes(pathname);

  return (
    <header className="bg-[var(--bg-dark-blue)] text-white fixed w-full top-0 z-20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-4xl font-bold">LOGO</Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-gray-300">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right buttons */}
        <div className="flex items-center space-x-4">
          {/* idioma */}
          <button className="hidden sm:flex items-center space-x-1 hover:opacity-80">
            <span className="text-lg">{languageOptions[0].flag}</span>
          </button>

          {/* Botones condicionales según estado de login */}
          {isLoggedIn ? (
            <>
              {/* Botón de conectar wallet */}
              {walletAddress ? (
                <span className="hidden sm:flex items-center space-x-2 px-4 py-1.5 bg-orange-500 text-white rounded-md font-medium">
                  <FaWallet className="mr-2" />
                  <span>{formatWalletAddress(walletAddress)}</span>
                </span>
              ) : (
                shouldShowWalletButton && (
                  <button
                    onClick={connectWallet}
                    className="hidden sm:flex items-center space-x-2 px-4 py-1.5 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 transition"
                  >
                    <FaWallet className="mr-2" />
                    <span>Conectar Wallet</span>
                  </button>
                )
              )}
              
              {/* Imagen perfil usuario */}
              <Image src="/user_profile.png" alt="Profile" className="w-8 h-8 rounded-full" width={10} height={10}/>

            </>
          ) : (
            <>
              {/* register / login para usuarios no logueados */}
              <Link
                href="/?form=register"
                className="hidden sm:inline-block px-4 py-1.5 bg-white text-[var(--bg-dark-blue)] rounded-md font-medium hover:opacity-90 transition"
              >
                Registrarse
              </Link>
              <Link
                href="/?form=login"
                className="hidden sm:inline-block px-4 py-1.5 border border-white rounded-md hover:bg-white/10 transition"
              >
                Iniciar sesión
              </Link>
            </>
          )}

          {/* mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-xl"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-[var(--bg-dark-blue)] px-6 pb-6 space-y-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-lg hover:text-gray-300"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          {/* idiomas + botones en mobile */}
          <div className="border-t border-white/20 pt-4 space-y-3">
            <button className="flex items-center space-x-2">
              <span className="text-xl">{languageOptions[0].flag}</span>
              <span>ES</span>
            </button>
            
            {/* Botones condicionales para móvil */}
            {isLoggedIn ? (
              <>
                {walletAddress ? (
                  <span className="flex items-center justify-center w-full px-4 py-2 bg-orange-500 text-white rounded-md">
                    <FaWallet className="mr-2" />
                    {formatWalletAddress(walletAddress)}
                  </span>
                ) : (
                  shouldShowWalletButton && (
                    <button onClick={connectWallet} className="flex items-center justify-center w-full px-4 py-2 bg-orange-500 text-white rounded-md">
                      <FaWallet className="mr-2" />
                      Conectar Wallet
                    </button>
                  )
                )}
              </>
            ) : (
              <>
                <Link href="/?form=register" className="block px-4 py-2 bg-white text-[var(--bg-dark-blue)] rounded-md text-center">
                  Registrarse
                </Link>
                <Link href="/?form=login" className="block px-4 py-2 border border-white rounded-md text-center">
                  Iniciar sesión
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}