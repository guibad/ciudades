/* eslint-disable testing-library/no-unnecessary-act */
import React, { useEffect } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { useFetch } from "./useFetch";

global.fetch = jest.fn();

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

describe("Test for Listado", () => {
    it("Montaje de componente correcto", async () => {
        const mockDataFetch = {
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
        };
        const TestComponent = () => {
            const { call, data, loading, error } = useFetch();

            useEffect(() => {
                call();
            }, []);

            return <div id="TestComponent"></div>;
        };

        global.fetch.mockImplementation(() => {
            return Promise.resolve({
                json: () => Promise.resolve({}),
            });
        });


        await act(async () => {
            render(<TestComponent />, container);
        });

    });

    /*
      expect(container.querySelector("#TestComponent_Data").textContent).toBe(
        "TestData"
      );
      */
});
