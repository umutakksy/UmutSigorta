import React from 'react';

export default function Navbar() {
    return (
        <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">UmutSigorta</h1>
            <ul className="flex space-x-6">
                <li><a href="#anasayfa" className="hover:underline">Anasayfa</a></li>
                <li><a href="#hizmetler" className="hover:underline">Hizmetler</a></li>
                <li><a href="#teklif" className="hover:underline">Teklif Al</a></li>
            </ul>
        </nav>
    );
}
