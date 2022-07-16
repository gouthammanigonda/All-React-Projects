import {render, screen} from '@testing-library/react'

import BannerCardsApp from '../App'

const bannerCardsList = [
  {
    id: 1,
    headerText: 'The Seasons Latest',
    description: 'Get the seasons all latest designs in a flick of your hand',
    className: 'card-1',
  },
  {
    id: 2,
    headerText: 'Our New Designs',
    description:
      'Get the designs developed by our in-house team all for yourself',
    className: 'card-2',
  },
  {
    id: 3,
    headerText: 'Insiders',
    description: 'Get the top class products for yourself with an extra off',
    className: 'card-3',
  },
]

const originalConsoleError = console.error

describe(':::RJSCPFTHY7_TEST_SUITE_1:::Reusable Banners tests', () => {
  afterEach(() => {
    console.error = originalConsoleError
  })

  it(':::RJSCPFTHY7_TEST_1:::Page should consist of at least two HTML list items and the bannerCardsList should be rendered using a unique key as a prop for each banner card item:::5:::', () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    render(<BannerCardsApp />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCPFTHY7_TEST_2:::Each banner card item on the page should consist of an HTML paragraph element with the given text content:::5:::', () => {
    render(<BannerCardsApp />)
    expect(
      screen.getByText(bannerCardsList[0].description, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(bannerCardsList[0].description, {exact: false}).tagName,
    ).toBe('P')
  })

  it(':::RJSCPFTHY7_TEST_3:::Each banner card item on the page should consist of at least an HTML button element with the text content as "Show More":::5:::', () => {
    render(<BannerCardsApp />)
    expect(
      screen.getAllByRole('button', {name: /Show More/i, exact: false}).length,
    ).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCPFTHY7_TEST_4:::Each banner card item should consist of an HTML list item with the given class name:::5:::', () => {
    const {container} = render(<BannerCardsApp />)
    const containerElement = container.querySelector('.card-1')
    expect(containerElement.tagName).toBe('LI')
  })

  it(':::RJSCPFTHY7_TEST_5:::Page should consist of three HTML main heading elements with the given text content:::5:::', () => {
    render(<BannerCardsApp />)
    expect(
      screen.getByRole('heading', {
        name: bannerCardsList[0].headerText,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: bannerCardsList[1].headerText,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: bannerCardsList[2].headerText,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPFTHY7_TEST_6:::Page should consist of at least three HTML button elements with text content as "Show More":::5:::', () => {
    render(<BannerCardsApp />)
    expect(
      screen.getAllByRole('button', {name: /Show More/i, exact: false}).length,
    ).toBeGreaterThanOrEqual(3)
  })

  it(':::RJSCPFTHY7_TEST_7:::Page should consist of three HTML paragraph elements with the given text content:::5:::', () => {
    render(<BannerCardsApp />)
    expect(
      screen.getByText(bannerCardsList[0].description, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(bannerCardsList[1].description, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(bannerCardsList[2].description, {exact: false}).tagName,
    ).toBe('P')
  })

  it(':::RJSCPFTHY7_TEST_8:::Page should consist of HTML list items with the given class names in bannerCardsList:::5:::', () => {
    const {container} = render(<BannerCardsApp />)
    const containerElement1 = container.querySelector('.card-1')
    const containerElement2 = container.querySelector('.card-2')
    const containerElement3 = container.querySelector('.card-3')
    expect(containerElement1.tagName).toBe('LI')
    expect(containerElement2.tagName).toBe('LI')
    expect(containerElement3.tagName).toBe('LI')
  })
})
