/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Recuadro } from './Recuadro';

describe('Recuadro', () => {
    let container = null;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
    });

    it('Componente se renderiza correctamente', () => {
        act(() => {
            render(<Recuadro texto="Título" altura="200px" />, container);
        });

        expect(container.querySelector('.pestanya-container')).not.toBeNull();
        expect(container.querySelector('.pestanya')).not.toBeNull();
        expect(container.querySelector('.cabecera')).not.toBeNull();
        expect(container.querySelector('.titulo-pestanya').textContent).toBe('Título');
        expect(container.querySelector('.boton-minimizar')).not.toBeNull();
        expect(container.querySelector('.contenido')).not.toBeNull();
    });

    it('Altura del recuadro cambia cuando se le pasa por props', () => {
        act(() => {
            render(<Recuadro texto="Título" />, container);
        });

        expect(container.querySelector('.pestanya').style.height).toBe('200px'); // La altura por defecto es 200px

        act(() => {
            render(<Recuadro texto="Título" altura="300px" />, container);
        });

        expect(container.querySelector('.pestanya').style.height).toBe('300px');
    });


    it('Recuadro se minimiza al hacer click en el botón', () => {
        act(() => {
            render(<Recuadro texto="Título" altura="200px" />, container);
        });

        const pestanya = container.querySelector('.pestanya');
        const botonMinimizar = container.querySelector('.boton-minimizar');

        expect(pestanya.style.height).toBe('200px');

        act(() => {
            botonMinimizar.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(pestanya.style.height).toBe('30px');

        act(() => {
            botonMinimizar.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(pestanya.style.height).toBe('200px');
    });

    it('El contenido no se muestra cuando el recuadro está minimizado', () => {
        act(() => {
            render(<Recuadro texto="Título" altura="200px">Contenido de prueba</Recuadro>, container);
        });

        expect(container.querySelector('.contenido')).not.toBe(null);

        act(() => {
            container.querySelector('.boton-minimizar').dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(container.querySelector('.contenido')).toBe(null);
    });
});
