import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, Link, withRouter } from "react-router-dom";
import { Table, Form, Button, Nav, Navbar } from 'react-bootstrap'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link><Link to="/" style={padding}>anecdotes</Link> </Nav.Link>
        <Nav.Link><Link to="/create" style={padding}>create new</Link> </Nav.Link>
        <Nav.Link><Link to='/' style={padding}>about</Link> </Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
      {anecdotes.map(anecdote => 
        <tr key={anecdote.id}>
          <td>
            <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
          </td>
          <td>
            {anecdote.author}
          </td>
        </tr>)}
      </tbody>
    </Table>
   
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNewNoHistory = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    console.log(e.target.content.value)
    e.preventDefault()
    props.addNew({
      content: e.target.content.value,
      author: e.target.author.value,
      info: e.target.info.value,
      votes: 0
    })
    props.history.push("/")
  }

  return (
    <div >
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content:</Form.Label>
          <Form.Control type="text" name="content"/>
          <Form.Label>author:</Form.Label>
          <Form.Control type="text" name="author"></Form.Control>
          <Form.Label>url for more info:</Form.Label>
          <Form.Control type="text" name="info"></Form.Control>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form.Group>
        </Form>
    </div>
  )

}

const CreateNew = withRouter(CreateNewNoHistory)

const Anecdote = ({anecdote}) => {
  return (
    <div>
      <h3>{anecdote.content}</h3>
    <p>has {anecdote.votes} votes</p>
    </div>
  )
}
const Notification = ({notification}) => {
  if (notification){
    return <p>{notification}</p>
  } else {
    return null
  }
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created`)
    setTimeout(() => {
      setNotification("")
    }, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  return (
    <div class="container">
       <h1>Software anecdotes</h1>
      
     <BrowserRouter>
        <Menu />
        <Notification notification={notification}></Notification>
        <Switch>
          <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes}/>}></Route>
          <Route path="/create" render={() => <CreateNew addNew={addNew} />}></Route>
          <Route path="about" render={() => <About/>}></Route>
          <Route exact path="/anecdote/:id" render={({match}) => 
            <Anecdote anecdote={anecdoteById(match.params.id)}></Anecdote>}>
          </Route>
        </Switch>
      </BrowserRouter>
      
      
      <Footer />
    </div>
  )
}

export default App;