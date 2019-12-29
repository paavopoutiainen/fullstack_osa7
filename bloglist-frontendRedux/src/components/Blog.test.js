import React from "react"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"



describe("<Blog />", () => {
    let blog = {
        title: "koodaus",
        author: "jukka",
        likes: 16,
        user:{ name:"seppo" }
    }

    let component 

    beforeEach(() => {
        window.localStorage.setItem("loggedBloglistappUser", JSON.stringify({ token: "lkdjflkdjskjsd", name: "puavo", username: "gfdhgfhgfh" }))

        component = render(
            <Blog blog={blog}/>
        )
    })

    test("component renders title and author", () => {
        console.log("component", component)
        expect(component.container.querySelector(".titleAndAuthor")).toHaveTextContent(
            "koodaus by jukka"
        )
    })
    test("at first only title should be shown", () => {
        const div = component.container.querySelector(".blogTitle")
        expect(div).toHaveStyle( "display: block" )

        const div2 = component.container.querySelector(".blogInfo")
        expect(div2).toHaveStyle( "display: none" )
    })

    test("after the click rest of the info is shown as well", () => {
        const div = component.container.querySelector(".blogTitle")

        fireEvent.click(div)

        const div2 = component.container.querySelector(".blogInfo")
        expect(div2).not.toHaveStyle( "display: none" )
    })

})