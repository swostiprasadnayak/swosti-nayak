"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ViewportContextType = {
    isMobile: boolean;
    mounted: boolean;
};

const ViewportContext = createContext<ViewportContextType>({
    isMobile: false,
    mounted: false,
});

export const useViewport = () => useContext(ViewportContext);

export const ViewportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <ViewportContext.Provider value={{ isMobile: false, mounted }}>
            {children}
        </ViewportContext.Provider>
    );
};
