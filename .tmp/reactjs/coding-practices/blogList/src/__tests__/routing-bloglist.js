import {BrowserRouter} from 'react-router-dom'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const headerLogo = 'https://assets.ccbp.in/frontend/react-js/wave-logo-img.png'
const aboutRoutePath = '/about'
const homeRoutePath = '/'
const contactRoutePath = '/contact'
const notFoundRoutePath = '/consdsadsadsdsad'
const blogsList = [
  {
    id: 1,
    title: 'My first post',
    description: 'A high quality solution beautifully designed for startups',
    publishedDate: 'Aug 2nd',
  },
  {
    id: 2,
    title: 'My second post',
    description:
      'A high quality solution beautifully designed for startups and Bussiness schools',
    publishedDate: 'Mar 1st',
  },
  {
    id: 3,
    title: 'My third post',
    description: 'A high quality solution beautifully designed for startups',
    publishedDate: 'Jan 2nd',
  },
  {
    id: 4,
    title: 'My fourth post',
    description:
      'A high quality solution beautifully designed for startups and Bussiness schools. ',
    publishedDate: 'Dec 24th',
  },
  {
    id: 5,
    title: 'My fifth post',
    description: 'A high quality solution beautifully designed for startups',
    publishedDate: 'Nov 10th',
  },
]

const renderWithBrowserRouter = (ui = <App />, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const originalConsoleError = console.error

describe(':::RJSCP4WKCF_TEST_SUITE_1:::Blog List App tests', () => {
  afterEach(() => {
    console.error = originalConsoleError
  })

  it(':::RJSCP4WKCF_TEST_1:::Page should consist of at least two HTML list items and the blogsList should be rendered using a unique key as a prop for each blog item:::5:::', () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    renderWithBrowserRouter()
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCP4WKCF_TEST_2:::Page should consist of a Link from react-router-dom in the header with "Home" as text content:::5:::', () => {
    renderWithBrowserRouter()
    expect(
      screen.getByRole('link', {name: /Home/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4WKCF_TEST_3:::Page should consist of a Link from react-router-dom in the header with "About" as text content:::5:::', () => {
    renderWithBrowserRouter()
    expect(
      screen.getByRole('link', {name: /About/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4WKCF_TEST_4:::Page should consist of a Link from react-router-dom in the header with "Contact" as text content:::5:::', () => {
    renderWithBrowserRouter()
    expect(
      screen.getByRole('link', {name: /Contact/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4WKCF_TEST_5:::When the "/about" is provided in the browser tab then the page should be navigated to AboutRoute and consists of an HTML heading element with "About" as text content:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: aboutRoutePath})
    expect(
      screen.getByRole('heading', {name: /About/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4WKCF_TEST_6:::When the "/contact" is provided in the browser tab then the page should be navigated to ContactRoute and consists of an HTML heading element with "Contact" as text content:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: contactRoutePath})
    expect(
      screen.getByRole('heading', {name: /Contact/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4WKCF_TEST_7:::When the "/bad-path" is provided in the browser tab then the page should be navigated to NotFoundRoute and consists of an HTML heading element with "Not Found" as text content:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})
    expect(
      screen.getByRole('heading', {name: /Not Found/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4WKCF_TEST_8:::When the About link in the header is clicked then the page should be navigated to AboutRoute with "/about" in URL path:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    userEvent.click(screen.getByRole('link', {name: /About/i, exact: false}))
    expect(window.location.pathname).toBe(aboutRoutePath)
  })

  it(':::RJSCP4WKCF_TEST_9:::When the Contact link in the header is clicked then the page should be navigated to ContactRoute with "/contact" in URL path:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    userEvent.click(screen.getByRole('link', {name: /Contact/i, exact: false}))
    expect(window.location.pathname).toBe(contactRoutePath)
  })

  it(':::RJSCP4WKCF_TEST_10:::When the Home link in the header is clicked then the page should be navigated to HomeRoute with "/" in URL path:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: contactRoutePath})
    userEvent.click(screen.getByRole('link', {name: /Home/i, exact: false}))
    expect(window.location.pathname).toBe(homeRoutePath)
  })

  it(':::RJSCP4WKCF_TEST_11:::Page should consist of an HTML heading element with "Wade Warren" as text content when rendering HomeRoute initially:::5:::', () => {
    renderWithBrowserRouter()
    expect(
      screen.getByRole('heading', {name: /Wade Warren/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4WKCF_TEST_12:::Page should consist of an HTML image element with alt text as "profile":::5:::', () => {
    renderWithBrowserRouter()
    expect(
      screen.getByRole('img', {name: /profile/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4WKCF_TEST_13:::Page should consist of an HTML image element in the header with the given logo URL as src and alt text as "wave":::5:::', () => {
    renderWithBrowserRouter()
    const imageEl = screen.getByRole('img', {name: /wave/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(headerLogo)
  })

  it(':::RJSCP4WKCF_TEST_14:::Home Route should consist of HTML heading elements with text content equal to the "title" in blogsList provided:::5:::', () => {
    renderWithBrowserRouter()

    expect(
      screen.getByRole('heading', {name: blogsList[0].title, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: blogsList[1].title, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: blogsList[2].title, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: blogsList[3].title, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: blogsList[4].title, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4WKCF_TEST_15:::Home Route should consist of at least five HTML paragraph elements with text content equal to the "description" in blogsList provided:::5:::', () => {
    renderWithBrowserRouter()
    const paragraphEls = screen.getAllByText(blogsList[0].description, {
      exact: false,
    })

    expect(paragraphEls.length).toBeGreaterThanOrEqual(5)
    expect(
      paragraphEls.every(eachParagraphEl => eachParagraphEl.tagName === 'P'),
    ).toBeTruthy()
  })
})
