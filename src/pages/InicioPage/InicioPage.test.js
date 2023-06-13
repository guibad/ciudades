/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import InicioPage from './InicioPage';
import { Buscador } from '../../components/Buscador/Buscador';

jest.mock("../../components/Buscador/Buscador", () => {
    return {
        Buscador: jest.fn(),
    };
});

describe('InicioPage', () => {
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
        Buscador.mockImplementation((props) => {
            return <div id="buscador"></div>;
        });

        act(() => {
            render(<InicioPage />, container);
        });

        expect(container.querySelector('#buscador')).not.toBe(null);
    });
});
