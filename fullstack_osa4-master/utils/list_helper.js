var _ = require('lodash');

const dummy = (blogs) => {
    return 1;
  }

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    //tehdään blogien likeistä koostuva taulukko, josta otetaan isoin arvo Math.maxilla ja spreadilla
    const max = Math.max(...blogs.map(b => b.likes))
    
    const favorite = blogs.find(b => b.likes === max)

    return blogs.length === 0
        ? {}
        : {
            title: favorite.title,
            author: favorite.author,
            likes: favorite.likes
        }
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(x => x.author)
  
    let objects = [] // {author: "", numberOfBlogs: int}

    authors.forEach(author => {
        if(!objects.some(o => o.author === author)){
            objects.push({author: author, numberOfBlogs: 1})
        } else {
            //kun author löytyy jo objectarraysta niin selvitetään blogien määrä
            let amountOfBlogs = objects.find(o => o.author === author).numberOfBlogs
            //otetaan pois muokattava objekti taulukosta
            objects = objects.filter(o => o.author !== author)
            objects.push({author: author, numberOfBlogs: amountOfBlogs+1})
        }
    })

    objects.sort((a, b) => b.numberOfBlogs - a.numberOfBlogs);

    return blogs.length === 0
    ? {}
    : objects[0]
}

const mostLikes = (blogs) => {
    const authorAndLikes = blogs.map(blog => {
        return {author: blog.author, likes: blog.likes}
    })
    console.log("authorsAndLikes", authorAndLikes)
    let objects = [] // {author: "", numberOfLikes: int}

    authorAndLikes.forEach(author => {
        if(!objects.some(o => o.author === author.author)){
            objects.push({author: author.author, numberOfLikes: author.likes})
        } else {
            //jos siellä objekcts arrayssa on jo sen yhden authorin tiedot ja sen jo kerätyt liket niin 
            //sittenhän me halutaan lisätä sinne sen loopattavan author olion liket
            let numberOfLikes = author.likes + objects.find(o => o.author === author.author).numberOfLikes
            objects = objects.filter(o => o.author !== author.author)
            objects.push({author: author.author, numberOfLikes: numberOfLikes})
        }
    })

    objects.sort((a, b) => b.numberOfLikes - a.numberOfLikes);

    return blogs.length === 0
    ? {}
    : objects[0]
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}