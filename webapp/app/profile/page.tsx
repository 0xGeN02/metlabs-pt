"use client";
import { useEffect, useState } from "react";
import Footer from "../_components/footer";
import Header from "../_components/header";
import ProfileContent from "./_components/ProfileContent";
import { set } from "zod";

const Profile = () => {
    const [user, setUser] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            const user: string | null = localStorage.getItem('user');
            await new Promise((resolve) => setTimeout(resolve, 5000));
            if (!user) {
                console.error('No se encontró el userId de autenticación en localStorage');
                setIsLoading(false);
                return;
            }
            setUser(user);
            console.log('user:', user);
            setIsLoading(false);
        };
        fetchUser();
    }, []);

    const userId = user ? JSON.parse(user).id : null;
    console.log('userId:', userId);
    if (isLoading) {
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

    if (!userId) {
        return (
        <main className="flex flex-col max-h-screen">
            <Header />
            <div className="flex flex-col h-screen justify-center items-center bg-red-100">
                <h1 className="text-xl font-semibold text-red-600">
                    Error: No se encontró el userId de autenticación
                </h1>
            </div>
            <Footer />
        </main>
        );
    }
    return (
        <main className="flex flex-col max-h-screen">
            <Header />
            <ProfileContent userId={userId} />
            <Footer />
        </main>
    );
};

export default Profile;