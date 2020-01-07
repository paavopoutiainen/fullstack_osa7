const totalLikes = require("../utils/list_helper.js").totalLikes
const dummy = require('../utils/list_helper').dummy
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes


const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

describe("totalLikes", () => {
    test("of empty list is zero", () => {
        expect(totalLikes([])).toBe(0)
    })
    test("when list has only one blog equals the likes of that", () => {
        expect(totalLikes([{
            title: "blogi1",
            author: "blogger",
            url: "www.www.www",
            likes: 13
          }])).toBe(13)
    })
    
    test("of a bigger list is calculated right", () => {
        expect(totalLikes(blogs)).toBe(36)
    })
})

test('dummy returns one', () => {
  const emptyBlogs = []

  const result = dummy(emptyBlogs)
  expect(result).toBe(1)
})

describe("favoriteBlog", () => {
    test("of empty list is empty object", () => {
        expect(favoriteBlog([])).toEqual({})
    })

    test("of list of one blog is the only blog object of the list", () => {
        expect(favoriteBlog([{
            title: "blogi1",
            author: "blogger",
            url: "www.www.www",
            likes: 13
        }])).toEqual({
            title: "blogi1",
            author: "blogger",
            likes: 13
        })
    })
    test("of bigger list is the one with the most likes", () => {
        expect(favoriteBlog(blogs)).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
          })    
    })
    
})

describe("mostBlogs", () => {
    test("of empty list is zero",() => {
        expect(mostBlogs([])).toEqual({})
    })

    test("of list sized 1 is the author/numberOfBlogs object of that blog", () => {
        expect(mostBlogs([blogs[0]])).toEqual({author: "Michael Chan", numberOfBlogs: 1})
    })

    test("of a bigger list is the most frequent author of the blogs in that array", () => {
        expect(mostBlogs(blogs)).toEqual({ author: 'Robert C. Martin', numberOfBlogs: 3 })
    })


})

describe("mostLikes", () => {
    test("of empty list is zero",() => {
        expect(mostLikes([])).toEqual({})
    })

    test("of list sized 1 is the author/numberOfLikes object of that blog", () => {
        expect(mostLikes([blogs[0]])).toEqual({author: "Michael Chan", numberOfLikes: 7})
    })

    test("of a bigger list is the most frequent author of the blogs in that array", () => {
        expect(mostLikes(blogs)).toEqual({ author: 'Edsger W. Dijkstra', numberOfLikes: 17 })
    })

})

