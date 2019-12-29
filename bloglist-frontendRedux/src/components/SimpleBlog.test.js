import React from "react"
import { render, fireEvent } from "@testing-library/react"
import SimpleBlog from "./simpleBlog"
import setupTests from "../setupTests"

describe("SimpleBlog component", () => {
    let blog = {
        title: "koodaus",
        author: "jukka",
        likes: 16
    }
    let component 

    const mockHandler = jest.fn()

    beforeEach(() => component = render(
        <SimpleBlog blog={blog} onClick={mockHandler}>
        </SimpleBlog>
    ))


    test("component renders title, author and likes", () => {


        expect(component.container.querySelector(".titleAndAuthor")).toHaveTextContent(
            "koodaus jukka"
        )
        expect(component.container.querySelector(".likes")).toHaveTextContent(
            "blog has 16 likes"
        )

    })

    test("clicking the button works", () => {
        const button = component.getByText("like")
        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockHandler.mock.calls.length).toBe(2)

    })
})
