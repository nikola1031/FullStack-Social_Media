import { BrowserRouter } from 'react-router-dom'
import Login from './Login'

describe('<Login />', () => {

  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BrowserRouter><Login /></ BrowserRouter>)
  })

 /*  it('renders a heading', () => {
    cy.mount(<Login />)

    cy.get('h2').should('contain', 'Log in to your account')
  }) */
})