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

        const TestComponent = async () => {
            const { data, loading, error } = useFetch("https://api.zippopotam.us/es/08020");

            if (!loading && !error) {
                return <div id="TestComponent">{data}</div>;
            }
        };


        await act(async () => {
            render(<TestComponent />, container);
        });

        expect(container.querySelector("#TestComponent").textContent).toBe(mockDataFetch);
    });

    /*
      expect(container.querySelector("#TestComponent_Data").textContent).toBe(
        "TestData"
      );
      */
});
