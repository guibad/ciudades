/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Navbar } from "./Navbar";
import { NavLink, useLocation } from "react-router-dom";
import { IdiomaContextProvider } from "../../context/IdiomaContext";

jest.mock("react-router-dom", () => {
    return {
        NavLink: jest.fn(),
        useLocation: jest.fn(),
    };
});

let container = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe("Test for Navbar", () => {
    it("Componente se renderiza correctamente", () => {
        useLocation.mockImplementation(() => ({
            pathname: "buscar"
        }));

        NavLink.mockImplementation((props) => {
            return <div id={props.id}>{props.children}</div>;
        });

        render(
            <IdiomaContextProvider value={{ idioma: 'es' }}>
                <Navbar />
            </IdiomaContextProvider>,
            container
        );

        expect(container.querySelector(".navbar")).not.toBe(null);
        expect(container.querySelector("#linkBuscar")).not.toBe(null);
        expect(container.querySelector("#linkHistorial")).not.toBe(null);

        expect(container.querySelector("#linkBuscar").textContent).toBe("Buscar");
        expect(container.querySelector("#linkHistorial").textContent).toBe("Historial");
    });

    it("Las clases se aplican correctamente al link 'Buscar' cuando se está en la página correcta", () => {
        useLocation.mockImplementation(() => ({
            pathname: "buscar"
        }));

        NavLink.mockImplementation((props) => {
            let object = { isActive: false };
            let resultClass = "";

            if (typeof props.className === "function") {
                resultClass = props.className(object);
            } else {
                resultClass = props.className;
            }

            if (props.id === "linkBuscar") {
                return <div id="navlink-mock-buscar" className={resultClass}>{props.children}</div>
            } else if (props.id === "linkHistorial") {
                return <div id="navlink-mock-historial" className={resultClass}>{props.children}</div>
            }
        });

        act(() => {
            render(
                <IdiomaContextProvider value={{ idioma: 'es' }}>
                    <Navbar />
                </IdiomaContextProvider>,
                container
            );
        });

        const navLinkMockBuscar = container.querySelector("#navlink-mock-buscar");
        const navLinkMockHistorial = container.querySelector("#navlink-mock-historial");
        expect(navLinkMockBuscar.classList.contains("link_activo")).toBe(true);
        expect(navLinkMockHistorial.classList.contains("link")).toBe(true);
    });

    it("Las clases se aplican correctamente al link 'Historial' cuando el link está activo y se está en la página correcta", () => {
        useLocation.mockImplementation(() => ({
            pathname: "historial"
        }));

        NavLink.mockImplementation((props) => {
            let resultClass = "";

            if (typeof props.className === "function") {
                if (props.id === "linkBuscar") {
                    resultClass = props.className({ isActive: false });
                    return <div id="navlink-mock-buscar" className={resultClass}>{props.children}</div>

                } else if (props.id === "linkHistorial") {
                    resultClass = props.className({ isActive: true });
                    return <div id="navlink-mock-historial" className={resultClass}>{props.children}</div>
                }
            } else {
                resultClass = props.className;
            }

        });

        act(() => {
            render(
                <IdiomaContextProvider value={{ idioma: 'es' }}>
                    <Navbar />
                </IdiomaContextProvider>,
                container
            );
        });

        const navLinkMockHistorial = container.querySelector("#navlink-mock-historial");
        const navLinkMockBuscar = container.querySelector("#navlink-mock-buscar");

        expect(navLinkMockHistorial.classList.contains("link_activo")).toBe(true);
        expect(navLinkMockBuscar.classList.contains("link")).toBe(true);
        expect(navLinkMockBuscar.classList.contains("link_activo")).toBe(false);
    });

});