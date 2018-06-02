import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Container, Row, Col } from 'reactstrap'
import Navbar from './components/navbar'
import GreetingPage from './components/GreetingPage'
import InstructionPage from './components/InstructionPage'
import SigninPage from './components/signin'
import SignupPage from './components/signup'
import NotFoundPage from './components/NotFoundPage'
import LinksPage from './components/links'
import TagsPage from './components/tags'

const App = () => <Navbar brand="Linkhub" />

export default App
