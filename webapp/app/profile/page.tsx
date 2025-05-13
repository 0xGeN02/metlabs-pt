"use client";
import { useEffect, useState } from "react";
import Footer from "../_components/footer";
import Header from "../_components/header";
import ProfileContent from "./_components/ProfileContent";

const Profile = () => {
    const [jwt, setJwt] = useState<string | null>(null);

    useEffect(() => {
        const token: string | null = localStorage.getItem('jwt');
        if (!token) {
            console.error('No se encontró el token de autenticación en localStorage');
            return;
        }
        setJwt(token);
        console.log('Token:', token);
    }, []);

    if (!jwt) {
        return <div>Error: No se encontró el token de autenticación</div>;
    }

    return (
        <div>
            <Header />
            <ProfileContent jwt={jwt} />
            <Footer />
        </div>
    );
};

export default Profile;