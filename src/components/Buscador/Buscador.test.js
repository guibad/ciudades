/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Buscador } from './Buscador';
import { MemoryRouter } from 'react-router-dom';
import { IdiomaContext } from '../../context/IdiomaContext';

describe('Test for Buscador', () => {
    it('El buscador y el place holder se renderizan correctamente', () => {
        const { getByPlaceholderText } = render(
            <MemoryRouter>
                <IdiomaContext.Provider value={{ idioma: "es" }}>
                    <Buscador loading={false} />
                </IdiomaContext.Provider>
            </MemoryRouter>
        );
        const inputElement = getByPlaceholderText('Introduce un código postal...');

        expect(inputElement).toBeInTheDocument();
    });

    it('El valor del input cambia correctamente', () => {
        const { getByPlaceholderText } = render(
            <MemoryRouter>
                <IdiomaContext.Provider value={{ idioma: "es" }}>
                    <Buscador loading={false} />
                </IdiomaContext.Provider>
            </MemoryRouter>
        );
        const inputElement = getByPlaceholderText('Introduce un código postal...');
        fireEvent.change(inputElement, { target: { value: '08020' } });
        expect(inputElement.value).toBe('08020');

        expect(inputElement).toBeInTheDocument();
    });

    it('La función onClick se ejecuta correctamente', () => {
        const onClickMock = jest.fn();
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        const { getByText, getByPlaceholderText } = render(
            <MemoryRouter>
                <IdiomaContext.Provider value={{ idioma: "es" }}>
                    <Buscador loading={false} />
                </IdiomaContext.Provider>
            </MemoryRouter>
        );

        const inputElement = getByPlaceholderText('Introduce un código postal...');
        fireEvent.change(inputElement, { target: { value: '08020' } });

        const buttonElement = getByText('Buscar');
        fireEvent.click(buttonElement);

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    // it('displays error message for empty input', () => {
    //     const { getByText, getByPlaceholderText } = render(<MemoryRouter><Buscador /></MemoryRouter>);
    //     const inputElement = getByPlaceholderText('Placeholder del buscador');
    //     const buttonElement = getByText('Buscar');

    //     fireEvent.click(buttonElement);

    //     const errorMessage = getByText('Mensaje de error para entrada vacía');
    //     expect(errorMessage).toBeInTheDocument();
    // });
});
