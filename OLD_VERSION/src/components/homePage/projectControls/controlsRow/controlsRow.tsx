/**
* ControlsRow.tsx
*
* Horizontal flex-row wrapper for the project control buttons
* (filter, control panel, code reveal). Provides a context for
* child controls to report their open/close state.
*/

"use client";

import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import classes from "./controlsRow.module.css";

type ControlsRowContextType = {
    anyPanelOpen: boolean;
    reportOpen: (open: boolean) => void;
};

const ControlsRowContext = createContext<ControlsRowContextType>({
    anyPanelOpen: false,
    reportOpen: () => { },
});

export const useControlsRow = () => useContext(ControlsRowContext);

type ControlsRowProps = {
    children: React.ReactNode;
};

const ControlsRow: React.FC<ControlsRowProps> = ({ children }) => {
    const openCount = useRef(0);
    const [anyPanelOpen, setAnyPanelOpen] = useState(false);

    const reportOpen = useCallback((open: boolean) => {
        openCount.current += open ? 1 : -1;
        openCount.current = Math.max(0, openCount.current);
        setAnyPanelOpen(openCount.current > 0);
    }, []);

    return (
        <ControlsRowContext.Provider value={{ anyPanelOpen, reportOpen }}>
            <div className={classes.controlsContainer}>{children}</div>
        </ControlsRowContext.Provider>
    );
};

export default ControlsRow;
