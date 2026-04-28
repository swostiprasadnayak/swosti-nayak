"use client";

import React, { createContext, useContext, useState } from "react";

type AboutModalContextType = {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
};

const AboutModalContext = createContext<AboutModalContextType>({
    isOpen: false,
    openModal: () => { },
    closeModal: () => { },
});

export const useAboutModal = () => useContext(AboutModalContext);

export const AboutModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <AboutModalContext.Provider value={{ isOpen, openModal: () => setIsOpen(true), closeModal: () => setIsOpen(false) }}>
            {children}
        </AboutModalContext.Provider>
    );
};
