"use client";
import React, { createContext, useContext, useState } from "react";

type VoiceModalContextType = {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
};

const VoiceModalContext = createContext<VoiceModalContextType>({
    isOpen: false,
    openModal: () => { },
    closeModal: () => { },
});

export const useVoiceModal = () => useContext(VoiceModalContext);

export const VoiceModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <VoiceModalContext.Provider value={{ isOpen, openModal: () => setIsOpen(true), closeModal: () => setIsOpen(false) }}>
            {children}
        </VoiceModalContext.Provider>
    );
};
