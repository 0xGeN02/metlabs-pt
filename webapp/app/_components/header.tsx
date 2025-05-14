"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaWallet } from "react-icons/fa";
import { onboard } from "@/lib/web3-onboard";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

type HeaderLink = { href: string; label: string };
const navLinks: HeaderLink[] = [
  { href: "/catalog", label: "Catálogo" },
  { href: "/team", label: "Quiénes somos" },
  { href: "/support", label: "Soporte" },
];
const languageOptions = [{ code: "es", flag: "🇪🇸" }];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletData, setWalletData] = useState<any>(null);

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
      await fetch("http://localhost:3000/api/wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ address, userId: user?.id }),
      });
      toast.info(`Wallet conectada`);
      setWalletAddress(address);
    }
  };

  const disconnectWallet = () => {
    onboard.disconnectWallet({ label: "MetaMask" }); 
    setWalletAddress(null);
    setWalletData(null);
    toast.info("Wallet desconectada");
  };

  useEffect(() => {
    // Fetch wallet section data when wallet is connected
    const fetchWalletData = async () => {
      if (walletAddress) {
          const response = await fetch(
            `http://localhost:3000/api/wallet/`,
            {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
              method: "GET",
              body: JSON.stringify({ userId: user?.id }),
            }
          );
          if (response.status === 201) {
            const data = await response.json();
            setWalletData(data);
            toast.success("Datos de la wallet cargados correctamente");
            localStorage.setItem("walletAddress", walletAddress);
          } 
      }
    };

    fetchWalletData();
  }, [walletAddress, user?.token]);

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const isProfileRoute = pathname === "/profile";

  return (
    <header className="bg-[var(--bg-dark-blue)] text-white fixed w-full top-0 z-20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-4xl font-bold">
          LOGO
        </Link>

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
          <button className="hidden sm:flex items-center space-x-1 hover:opacity-80">
            <span className="text-lg">{languageOptions[0].flag}</span>
          </button>

          {isProfileRoute ? (
            walletAddress ? (
              <div className="flex items-center space-x-4">
                <span className="hidden sm:flex items-center space-x-2 px-4 py-1.5 bg-orange-500 text-white rounded-md font-medium">
                  <FaWallet className="mr-2" />
                  <span>{formatWalletAddress(walletAddress)}</span>
                </span>
                <button
                  onClick={disconnectWallet}
                  className="hidden sm:flex items-center space-x-1 px-3 py-1 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition"
                >
                  <FaTimes className="mr-1" />
                  <span>Desconectar</span>
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="hidden sm:flex items-center space-x-2 px-4 py-1.5 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 transition"
              >
                <FaWallet className="mr-2" />
                <span>Conectar Wallet</span>
              </button>
            )
          ) : (
            <>
              {user?.profilePicture && (
                <img
                  src="/user_profile.png"
                  alt="Foto de perfil"
                  width={40}
                  height={40}
                  className="hidden sm:block w-10 h-10 rounded-full object-cover"
                />
              )}
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

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-xl"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

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

          {/* Wallet options */}
          {isProfileRoute && (
            <div className="mt-4 space-y-4">
              {walletAddress ? (
                <div className="flex flex-col items-stretch space-y-4">
                  <span className="flex items-center justify-center space-x-2 px-3 py-2 bg-orange-500 text-white rounded-md text-sm font-medium shadow-md">
                    <FaWallet className="mr-2" />
                    <span>{formatWalletAddress(walletAddress)}</span>
                  </span>
                  <button
                    onClick={() => {
                      disconnectWallet();
                      setMobileOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition shadow-md"
                  >
                    <FaTimes className="mr-2" />
                    <span>Desconectar</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    connectWallet();
                    setMobileOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600 transition shadow-md"
                >
                  <FaWallet className="mr-2" />
                  <span>Conectar Wallet</span>
                </button>
              )}
            </div>
          )}
        </nav>
      )}
    </header>
  );
}