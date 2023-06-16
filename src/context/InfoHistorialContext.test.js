/* eslint-disable testing-library/no-unnecessary-act */
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { InfoHistorialContext, InfoHistorialProvider } from './InfoHistorialContext';

describe('InfoHistorialContext', () => {
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

    it('Montaje de componente correcto', () => {
        let contextValues = {};

        act(() => {
            render(
                <InfoHistorialProvider>
                    <InfoHistorialContext.Consumer>
                        {(value) => {
                            contextValues = value;
                            return <div id="TestComponent"></div>;
                        }}
                    </InfoHistorialContext.Consumer>
                </InfoHistorialProvider>,
                container
            );
        });

        expect(contextValues.historial).toEqual([]);
        expect(contextValues.infoPolitica).toEqual([]);

        act(() => {
            contextValues.setHistorial([{ cp: '08020', ciudad: 'Barcelona', comunidad: 'Cataluna' }]);
            contextValues.setInfoPolitica({
                "post code": "08020",
                "country": "Spain",
                "country abbreviation": "ES",
                "places": [
                    {
                        "place name": "Barcelona",
                        "longitude": "2.1833",
                        "state": "Cataluna",
                        "state abbreviation": "CT",
                        "latitude": "41.3833"
                    }
                ]
            });
        });

        expect(contextValues.historial).toEqual([{ cp: '08020', ciudad: 'Barcelona', comunidad: 'Cataluna' }]);
        expect(contextValues.infoPolitica).toEqual({
            "post code": "08020",
            "country": "Spain",
            "country abbreviation": "ES",
            "places": [
                {
                    "place name": "Barcelona",
                    "longitude": "2.1833",
                    "state": "Cataluna",
                    "state abbreviation": "CT",
                    "latitude": "41.3833"
                }
            ]
        });
    });
});
