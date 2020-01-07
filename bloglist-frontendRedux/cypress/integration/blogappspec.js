describe("Blog App", function () {
    beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/testing/reset")
        const user = {
            username: "testikolmonen",
            name: "paavo poutiainen",
            password: "fuLLStack9#00"
        }
        cy.request("POST", "http://localhost:3003/api/users", user)
        cy.visit("http://localhost:3000")

    })
    it("page can be visited", function () {
        cy.contains("Log into application")
    })

    describe("user logged in", function () {
        beforeEach(function () {
            cy.get("#username")
                .type("testikolmonen")
            cy.get("#password")
                .type("fuLLStack9#00")
            cy.contains("login")
                .click()
        })
        it("log in works", function () {

            cy.contains("New blog")
            cy.contains("paavo poutiainen logged in")

        })

        it("adding a blog works", function () {
            cy.contains("New blog")
                .click()
            cy.get("#title")
                .type("testiBlogi123")
            cy.get("#author")
                .type("testiauthor")
            cy.get("#url")
                .type("www.testiblogi.fi")
            cy.contains("Create").click()
            cy.contains("testiBlogi123")
        })
        it("new blog form's cancel button works", function () {
            cy.contains("New blog")
                .click()
            cy.contains("Cancel")
                .click()
            cy.contains("New blog")
        })
        it("logout button works", function () {
            cy.contains("Logout")
                .click()
            cy.contains("Log into application")
        })
        describe("in the users page", function () {
            beforeEach(function () {
                cy.contains("Users")
                    .click()
            })
            it("users link works", function () {

                cy.contains("Blogs created")

            })
            it("username's link in the table works", function () {
                cy.get("#usersname")
                    .click()
                cy.contains("Added blogs")
            })
        })

    })
})