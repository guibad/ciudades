import React, { createContext, useState } from 'react';

export const IdiomaContext = createContext();

export const IdiomaContextProvider = ({ children }) => {
    const [idioma, setIdioma] = useState("es");

    return (
        <IdiomaContext.Provider value={{ idioma, setIdioma }} >
            {children}
        </IdiomaContext.Provider >
    );
}