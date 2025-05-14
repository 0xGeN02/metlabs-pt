"use client";
import { useEffect, useState } from "react";
import Footer from "../_components/footer";
import Header from "../_components/header";
import ProfileContent from "./_components/ProfileContent";

interface UserData {
    name: string;
    email: string;
}
interface WalletData {
    public_key: string;
    balance: number;
}

const Profile = () => {
    const [user, setUser] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
    const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [walletData, setWalletData] = useState<WalletData | null>(null);

    const handleWalletChange = (isConnected: boolean) => {
        setIsWalletConnected(isConnected);
        if (isConnected) {
            const wallet = localStorage.getItem("walletAddress");
            setWalletAddress(wallet);
        } else {
            setWalletAddress(null);
        }
    };

    useEffect(() => {
        const checkWalletConnection = () => {
            const wallet = localStorage.getItem("walletAddress");
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
                const user: string | null = localStorage.getItem("user");
                await new Promise((resolve) => setTimeout(resolve, 5000));
                if (!user) {
                    console.error(
                        "No se encontró el userId de autenticación en localStorage"
                    );
                    setIsFetchingData(false);
                    return;
                }
                setUser(user);
                console.log("user:", user);
                setIsFetchingData(false);
            };
            fetchUser();
        }
    }, [walletAddress]);

    const userId = user ? JSON.parse(user).id : null;

    useEffect(() => {
        const fetchUserData = async (userId: string): Promise<UserData | null> => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/user/`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userId }),
                    }
                );

                if (!response.ok) {
                    console.error(
                        "Error fetching user data:",
                        response.statusText
                    );
                    return null;
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching user data:", error);
                return null;
            }
        };

        const fetchWalletData = async (
            userId: string
        ): Promise<WalletData | null> => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/wallet/`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userId }),
                    }
                );

                if (!response.ok) {
                    console.error(
                        "Error fetching wallet data:",
                        response.statusText
                    );
                    return null;
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching wallet data:", error);
                return null;
            }
        };

        if (userId) {
            setIsFetchingData(true);
            Promise.all([fetchUserData(userId), fetchWalletData(userId)])
                .then(([userData, walletData]) => {
                    setUserData(userData);
                    setWalletData(walletData);
                })
                .finally(() => setIsFetchingData(false));
        }
    }, [userId]);

    if (!isWalletConnected) {
        return (
            <main className="flex flex-col max-h-screen">
                <Header onWalletChange={handleWalletChange} />
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
                <Header onWalletChange={handleWalletChange} />
                <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
                    <h1 className="text-xl font-semibold text-gray-700">
                        Cargando datos...
                    </h1>
                </div>
                <Footer />
            </main>
        );
    }

    if (!userData || !walletData) {
        return (
            <main className="flex flex-col max-h-screen">
                <Header onWalletChange={handleWalletChange} />
                <div className="flex flex-col h-screen justify-center items-center bg-red-100">
                    <h1 className="text-xl font-semibold text-red-600">
                        Error al cargar los datos del perfil.
                    </h1>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="flex flex-col max-h-screen">
            <Header onWalletChange={handleWalletChange} />
            <h1 className="text-2xl font-bold text-center mt-4">
                Perfil de Usuario
            </h1>
            <ProfileContent
                userId={userId}
                userData={userData}
                walletData={walletData}
            />
            <Footer />
        </main>
    );
};

export default Profile;
