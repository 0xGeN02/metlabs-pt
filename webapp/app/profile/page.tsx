"use client";
import { useEffect, useState } from "react";
import Footer from "../_components/footer";
import Header from "../_components/header";
import ProfileContent from "./_components/ProfileContent";
import { set } from "zod";

const Profile = () => {
    const [user, setUser] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

    useEffect(() => {
        const checkWalletConnection = () => {
            const wallet = localStorage.getItem('walletAddress');
            if (wallet) {
                setWalletAddress(wallet);
            }
        };
        checkWalletConnection();
    }, []);

    useEffect(() => {
        if (walletAddress) {
            setIsFetchingData(true);
            const fetchUser = async () => {
                const user: string | null = localStorage.getItem('user');
                await new Promise((resolve) => setTimeout(resolve, 5000));
                if (!user) {
                    console.error('No se encontró el userId de autenticación en localStorage');
                    setIsFetchingData(false);
                    return;
                }
                setUser(user);
                console.log('user:', user);
                setIsFetchingData(false);
            };
            fetchUser();
        }
    }, [walletAddress]);

    const userId = user ? JSON.parse(user).id : null;

    if (!walletAddress) {
        return (
            <main className="flex flex-col max-h-screen">
                <Header />
                <div className="flex flex-col h-screen justify-center items-center bg-red-100">
                    <h1 className="text-xl font-semibold text-red-600">
                        Por favor, conecta tu wallet para acceder al contenido del perfil.
                    </h1>
                </div>
                <Footer />
            </main>
        );
    }

    if (isFetchingData) {
        return (
            <main className="flex flex-col max-h-screen">
                <Header />
                <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
                    <h1 className="text-xl font-semibold text-gray-700">Cargando datos...</h1>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="flex flex-col max-h-screen">
            <Header />
            <h1 className="text-2xl font-bold text-center mt-4">Perfil de Usuario</h1>
            <ProfileContent userId={userId} />
            <Footer />
        </main>
    );
};

export default Profile;