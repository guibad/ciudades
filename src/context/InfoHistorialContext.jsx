import { createContext } from 'react';

export const InfoHistorialContext = createContext({
    infoPolitica: [],
    setInfoPolitica: () => { },
    historial: [],
    setHistorial: () => { }
});