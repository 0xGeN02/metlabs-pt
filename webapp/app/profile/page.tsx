"use client";
import { useEffect, useState } from "react";
import Footer from "../_components/footer";
import Header from "../_components/header";
import ProfileContent from "./_components/ProfileContent";

const Profile = () => {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const user: string | null = localStorage.getItem('user');
        if (!user) {
            console.error('No se encontró el userId de autenticación en localStorage');
            return;
        }
        setUser(user);
        console.log('user:', user);
    }, []);

    const userId = user ? JSON.parse(user).id : null;
    console.log('userId:', userId);
    if (!userId) {
        return (
            <div className="flex flex-col max-h-screen">
                <Header />
                    <div><h1>Error: No se encontró el userId de autenticación</h1></div>;
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col max-h-screen">
            <Header />
            <ProfileContent jwt={userId} />
            <Footer />
        </div>
    );
};

export default Profile;