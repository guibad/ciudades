import React, { createContext, useState } from 'react';

export const InfoHistorialContext = createContext();

export const InfoHistorialProvider = ({ children }) => {
    const [historial, setHistorial] = useState([]);
    const [infoPolitica, setInfoPolitica] = useState([]);

    return (
        <InfoHistorialContext.Provider value={{ historial, setHistorial, infoPolitica, setInfoPolitica }} >
            {children}
        </InfoHistorialContext.Provider >
    );
};
