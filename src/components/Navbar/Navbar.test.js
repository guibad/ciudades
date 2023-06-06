/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IdiomaContextProvider } from '../../context/IdiomaContext';
import { toHaveClass } from '@testing-library/jest-dom'
import { Navbar } from './Navbar';

jest.mock("react-router-dom", () => {
    return {
        NavLink: jest.fn(),
        useNavigate: jest.fn(),
        useLocation: jest.fn(),
    };
});

let container = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('Navbar', () => {
    it('Renderiza el componente correctamente', () => {
        act(() => {
            render(
                <IdiomaContextProvider value={{ idioma: 'es' }}>
                    <Navbar />
                </IdiomaContextProvider>,
                container
            );
        })

        expect(container.querySelector('.navbar')).not.toBe(null);
        expect(container.querySelector('.navbar-brand')).not.toBe(null);
        expect(container.querySelector('.titulo')).not.toBe(null);
        expect(container.querySelector('.links-container')).not.toBe(null);
    });

    it('A los enlaces se les aplican las clases correctamente', () => {
        let path = "buscar";

        NavLink.mockImplementation(() => {
            return (
                <>
                    <div id="linkBuscar" className={path.includes("buscar") ? "link_activo" : "link"}>Buscar</div>
                    <div id="linkHistorial" className={path.includes("historial") ? "link_activo" : "link"}>Historial</div>
                </>
            );
        });

        act(() => {
            render(
                <IdiomaContextProvider value={{ idioma: 'es' }}>
                    <Navbar />
                </IdiomaContextProvider>,
                container
            );
        })

        const linkBuscar = container.querySelector('#linkBuscar');
        expect(linkBuscar).toHaveClass("link_activo");

        const linkHistorial = container.querySelector('#linkHistorial');
        expect(linkHistorial).toHaveClass("link");
    });

    it('Los enlaces cambian de clase segun la ruta en la que se encuentren', () => {
        let path = "historial";

        NavLink.mockImplementation(() => {
            return (
                <>
                    <div id="linkBuscar" className={path.includes("buscar") ? "link_activo" : "link"}>Buscar</div>
                    <div id="linkHistorial" className={path.includes("historial") ? "link_activo" : "link"}>Historial</div>
                </>
            );
        });

        act(() => {
            render(
                <IdiomaContextProvider value={{ idioma: 'es' }}>
                    <Navbar />
                </IdiomaContextProvider>,
                container
            );
        })

        const linkBuscar = container.querySelector('#linkBuscar');
        expect(linkBuscar).toHaveClass("link");

        const linkHistorial = container.querySelector('#linkHistorial');
        expect(linkHistorial).toHaveClass("link_activo");

        path = "buscar";
        act(() => {
            render(
                <IdiomaContextProvider value={{ idioma: 'es' }}>
                    <Navbar />
                </IdiomaContextProvider>,
                container
            );
        })

        expect(linkBuscar).toHaveClass("link_activo");
        expect(linkHistorial).toHaveClass("link");
    });

    it('La ruta cambia al hacer click sobre los links', () => {
        const navigateMock = jest.fn();
        let checkPath = "/historial";

        NavLink.mockImplementation(() => {
            return (
                <>
                    <div id="linkBuscar" onClick={() => navigateMock('/')}>Buscar</div>
                    <div id="linkHistorial" onClick={() => navigateMock('/historial')}>Historial</div>
                </>
            );
        });

        useNavigate.mockImplementation(() => {
            return navigateMock;
        });

        navigateMock.mockImplementation((path) => {
            checkPath = path;
        });

        act(() => {
            render(
                <IdiomaContextProvider value={{ idioma: 'es' }}>
                    <Navbar />
                </IdiomaContextProvider>,
                container
            );
        });


        act(() => {
            const linkHistorial = container.querySelector('#linkHistorial');
            linkHistorial.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(checkPath).toBe("/historial");
        expect(navigateMock).toHaveBeenCalled();

        act(() => {
            const linkBuscar = container.querySelector('#linkBuscar');
            linkBuscar.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(checkPath).toBe("/");
        expect(navigateMock).toHaveBeenCalled();
    });
});