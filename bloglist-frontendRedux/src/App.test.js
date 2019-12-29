import React from "react"
import { render, waitForElement, fireEvent } from "@testing-library/react"
import App from "./App"
jest.mock("./services/blogService")
jest.mock("./services/loginService")

describe("<App />", () => {
    test("if no user logged, blogs are not rendered", async () => {
        const component = render(<App />)

        component.rerender(<App />)

        await waitForElement(
            () => component.getByText("Login")
        )

        const blogs = component.container.querySelectorAll(".blog")
        expect(blogs.length).toBe(0)

        expect(component.container).toHaveTextContent(
            "Username"
        )
        expect(component.container).toHaveTextContent(
            "Password"
        )
    })
    test("after the login, blogs are rendered", async () => {
        const component = render(<App />)

        component.rerender(<App />)

        await waitForElement(
            () => component.getByText("Login")
        )
        const inputUsername = component.container.querySelector("#username")
        const inputPassword = component.container.querySelector("#password")
        const buttonLogin = component.getByText("Login")

        fireEvent.change(inputUsername, { target: { value: "tommi" } })
        fireEvent.change(inputPassword, { target: { value: "salainen" } })

        fireEvent.click(buttonLogin)
        await waitForElement(
            () => component.container.querySelector(".blog")
        )
        const blogs = component.container.querySelectorAll(".blog")

        expect(blogs.length).toBe(3)


    })
})
