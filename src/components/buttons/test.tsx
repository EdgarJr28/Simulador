'use client'
import { useState } from 'react';

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;

    return (
        <>
            <div>
                <button
                    className="flex flex-col h-12 w-12 border-2 border-black rounded justify-center items-center group"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div
                        className={`${genericHamburgerLine} ${isOpen
                            ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
                            : "opacity-50 group-hover:opacity-100"
                            }`}
                    />
                    <div
                        className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
                            }`}
                    />
                    <div
                        className={`${genericHamburgerLine} ${isOpen
                            ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
                            : "opacity-50 group-hover:opacity-100"
                            }`}
                    />
                </button>

            </div>
            {
                isOpen && (
                    <div
                        className={`fixed top-0 left-0 h-full w-64 bg-white text-black p-4 transform lg:translate-x-0 lg:opacity-100 transition-transform duration-300 ${isOpen
                                ? 'translate-x-0 translate-y-28 opacity-100'
                                : '-translate-x-full opacity-0'
                            }`}
                    >
                        <ul>
                            <li className="my-2">Item 1</li>
                            <li className="my-2">Item 2</li>
                            <li className="my-2">Item 3</li>
                            {/* Agrega más elementos del menú aquí */}
                        </ul>
                    </div>
                )
            }
        </>
    );
};

export default BurgerMenu;
