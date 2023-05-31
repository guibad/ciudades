/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Boton } from './Boton';

let container = null

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe("Test for Boton", () => {
    it("Montaje de componente correcto", () => {
        act(() => {
            render(<Boton texto="Buscar" />, container);
        })
        const boton = container.querySelector('button');
        expect(boton).not.toBe(null);
    })

    it("Texto de componente se renderiza correctamente", () => {
        act(() => {
            render(<Boton texto="Buscar" />, container);
        })
        expect(container.textContent).toBe("Buscar");

    })

    it('Invoca la función onClick correctamente', () => {
        const onClick = jest.fn();

        act(() => {
            render(<Boton texto="Buscar" onClick={onClick} />, container);
        });

        const boton = container.querySelector('button');
        act(() => {
            boton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('Aplica el ancho y alto pasado por props al botón correctamente', () => {
        const width = '300px';
        const height = '60px';

        act(() => {
            render(<Boton texto="Buscar" width={width} height={height} />, container);
        });

        const boton = container.querySelector('button');
        expect(boton.style.width).toBe(width);
        expect(boton.style.height).toBe(height);
    });

    it('Aplica el estilo pasado por props al botón correctamente', () => {
        const estilo = { backgroundColor: 'red', color: 'white' };

        act(() => {
            render(<Boton texto="Buscar" style={estilo} />, container);
        });

        const boton = container.querySelector('button');
        expect(boton.style.backgroundColor).toBe(estilo.backgroundColor);
        expect(boton.style.color).toBe(estilo.color);
    });


})