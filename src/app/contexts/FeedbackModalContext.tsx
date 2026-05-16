"use client";

import React, { createContext, useContext, useState } from "react";

type FeedbackModalContextType = {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
};

const FeedbackModalContext = createContext<FeedbackModalContextType>({
    isOpen: false,
    openModal: () => { },
    closeModal: () => { },
});

export const useFeedbackModal = () => useContext(FeedbackModalContext);

export const FeedbackModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <FeedbackModalContext.Provider value={{ isOpen, openModal: () => setIsOpen(true), closeModal: () => setIsOpen(false) }}>
            {children}
        </FeedbackModalContext.Provider>
    );
};
