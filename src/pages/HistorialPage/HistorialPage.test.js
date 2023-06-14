/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { useNavigate } from 'react-router-dom';
import { IdiomaContextProvider } from '../../context/IdiomaContext';
import { InfoHistorialContext } from '../../context/InfoHistorialContext';
import HistorialPage from './HistorialPage';

jest.mock("react-router-dom", () => {
    return {
        NavLink: jest.fn(),
        useNavigate: jest.fn(),
        useLocation: jest.fn(),
    };
});

describe('HistorialPage', () => {
    let container = null;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
    });

    it('Componente se renderiza correctamente (con historial vacío)', () => {
        const mockContextValue = {
            infoPolitica: {},
            setInfoPolitica: jest.fn(),
            historial: [],
            setHistorial: jest.fn(),
        };

        act(() => {
            render(
                <InfoHistorialContext.Provider value={mockContextValue}>
                    <IdiomaContextProvider value={{ idioma: "es" }}>
                        <HistorialPage />
                    </IdiomaContextProvider>
                </InfoHistorialContext.Provider>,
                container
            );
        });

        expect(container.querySelector(".container-historial")).not.toBe(null);
        expect(container.querySelector(".busqueda-container")).toBe(null);
        expect(container.querySelector("button")).toBe(null);
        expect(container.querySelector(".texto-no-historial")).not.toBe(null);
        expect(container.querySelector(".texto-no-historial").textContent).toBe("No hay búsquedas recientes");
    });

    it('Componente se renderiza correctamente (con historial)', () => {
        const mockContextValue = {
            infoPolitica: {},
            setInfoPolitica: jest.fn(),
            historial: [
                {
                    "cp": "08020",
                    "ciudad": "Barcelona",
                    "comunidad": "Cataluna"
                }
            ],
            setHistorial: jest.fn(),
        };

        act(() => {
            render(
                <InfoHistorialContext.Provider value={mockContextValue}>
                    <IdiomaContextProvider value={{ idioma: "es" }}>
                        <HistorialPage />
                    </IdiomaContextProvider>
                </InfoHistorialContext.Provider>,
                container
            );
        });

        expect(container.querySelector(".container-historial")).not.toBe(null);
        expect(container.querySelector(".busqueda-container")).not.toBe(null);
        expect(container.querySelector(".codigo-postal").textContent).toBe("08020");
        expect(container.querySelector(".info").textContent).toBe("Barcelona (Cataluna)");
        expect(container.querySelector("button")).not.toBe(null);
        expect(container.querySelector(".texto-no-historial")).toBe(null);
    });

    it('Historial se borra al hacer click al boton', async () => {
        const mockContextValue = {
            infoPolitica: {},
            setInfoPolitica: jest.fn(),
            historial: [
                {
                    "cp": "08020",
                    "ciudad": "Barcelona",
                    "comunidad": "Cataluna"
                }
            ],
            setHistorial: jest.fn(),
        };

        act(() => {
            render(
                <InfoHistorialContext.Provider value={mockContextValue}>
                    <IdiomaContextProvider value={{ idioma: "es" }}>
                        <HistorialPage />
                    </IdiomaContextProvider>
                </InfoHistorialContext.Provider>,
                container
            );
        });

        expect(container.querySelector(".container-historial")).not.toBe(null);
        expect(container.querySelector(".busqueda-container")).not.toBe(null);

        act(() => {
            const botonBorrar = container.querySelector("button");
            botonBorrar.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(mockContextValue.setHistorial).toHaveBeenCalledTimes(1);
        expect(mockContextValue.setHistorial).toHaveBeenCalledWith([]);

        act(() => {
            render(
                <InfoHistorialContext.Provider value={{ ...mockContextValue, historial: [] }}>
                    <IdiomaContextProvider value={{ idioma: 'es' }}>
                        <HistorialPage />
                    </IdiomaContextProvider>
                </InfoHistorialContext.Provider>,
                container
            );
        });

        expect(container.querySelector(".busqueda-container")).toBe(null);
    });

    it('Navega a la pàgina buscar cuando se hace click sobre un elemento del historial', async () => {
        const navigateMock = jest.fn();

        useNavigate.mockImplementation(() => {
            return navigateMock;
        });

        const mockContextValue = {
            infoPolitica: {},
            setInfoPolitica: jest.fn(),
            historial: [
                {
                    "cp": "08020",
                    "ciudad": "Barcelona",
                    "comunidad": "Cataluna"
                }
            ],
            setHistorial: jest.fn(),
        };

        act(() => {
            render(
                <InfoHistorialContext.Provider value={mockContextValue}>
                    <IdiomaContextProvider value={{ idioma: "es" }}>
                        <HistorialPage />
                    </IdiomaContextProvider>
                </InfoHistorialContext.Provider>,
                container
            );
        });

        expect(container.querySelector(".container-historial")).not.toBe(null);
        const busquedaContainer = container.querySelector(".busqueda-container");
        expect(busquedaContainer).not.toBe(null);

        act(() => {
            busquedaContainer.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith('/buscar/08020');
    });
});
