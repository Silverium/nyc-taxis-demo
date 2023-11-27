import React from "react";
import { fireEvent, render, screen } from "../../utils/test-utils";
import DefaultGrid from "./DefaultGrid";
describe("DefaultGrid", () => {
    describe('Page Input Number', () => {
        describe('When the "page" query parameter is set', () => {

            it("should load the NumberInput from 'page' query parameter", () => {
                const pageNumber = "134";
                window.history.pushState({}, "", `?page=${pageNumber}`);
                // Render the DefaultGrid component
                render(<DefaultGrid />);

                // Get the NumberInput component
                const numberInput = screen.getByLabelText<HTMLInputElement>("Page", {
                    selector: "input",
                });

                // Assert that the initial value of the NumberInput is 0
                expect(numberInput.value).toBe(pageNumber);
                // Assert that the initial value of the NumberInput is 0
                expect(numberInput).toHaveValue(pageNumber);
            });
        });
        describe('When page number is changed through the input', () => {
            it("should sync the search parameter when input number changes", () => {
                const pageNumber = "134";
                const newPageNumber = "200";
                window.history.pushState({}, "", `?page=${pageNumber}`);
                render(<DefaultGrid />);

                // Get the NumberInput component
                const numberInput = screen.getByLabelText<HTMLInputElement>("Page", { selector: 'input' });

                // Change the value of the NumberInput
                numberInput.value = newPageNumber;
                // INPUT's state is updated on blur, so we need to trigger a blur event
                fireEvent.blur(numberInput);
                const pageQueryParam = new URLSearchParams(window.location.search).get('page');
                // Assert that the search parameter is updated
                expect(pageQueryParam).toBe(`${newPageNumber}`);
            });
        })
    });
});
