import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const destinationsList = [
  {
    id: 1,
    name: 'Melaka Mosque',
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/melaka-mosque-img.png',
  },
  {
    id: 2,
    name: 'Shrubland',
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/shrubland-img.png',
  },
  {
    id: 3,
    name: 'New York',
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/new-york-img.png',
  },
  {
    id: 4,
    name: 'Escarpment',
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/escarpment-img.png',
  },
  {
    id: 5,
    name: 'Westminster Abbey',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/westminster-abbey-img.png',
  },
  {
    id: 6,
    name: 'South Downs National Park',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/south-downs-national-park-img.png',
  },
  {
    id: 7,
    name: 'National Historic Site',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/national-historic-site-img.png',
  },
  {
    id: 8,
    name: 'Tower Bridge',
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/tower-bridge-img.png',
  },
  {
    id: 9,
    name: 'Arc Here',
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/arc-here-img.png',
  },
  {
    id: 10,
    name: 'Steeple',
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/steeple-img.png',
  },
  {
    id: 11,
    name: 'Glaciokarst',
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/glaciokarst-img.png',
  },
  {
    id: 12,
    name: 'Parco Nazionale delle Cinque Terre',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/parco-nazionale-delle-cinque-terre-img.png',
  },
]
const searchIconUrl =
  'https://assets.ccbp.in/frontend/react-js/destinations-search-icon-img.png'
const originalConsoleError = console.error

describe(':::RJSCPZ6HLZ_TEST_SUITE_1:::Destination Search tests', () => {
  afterEach(() => {
    console.error = originalConsoleError
  })

  it(':::RJSCPZ6HLZ_TEST_1:::Page should consist of at least two HTML list items and the destinationsList should be rendered using a unique key as a prop for each destination item:::5:::', () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    render(<App />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCPZ6HLZ_TEST_2:::Page should consist of HTML main heading element with text content as "Destination Search":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {name: /Destination Search/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPZ6HLZ_TEST_3:::Page should consist of HTML input element with type attribute value as "search":::5:::', () => {
    render(<App />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it(':::RJSCPZ6HLZ_TEST_4:::Page should consist of HTML image element with alt attribute value as "search icon" and src attribute value as the URL of the search icon:::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('img', {name: /search icon/i, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', {name: /search icon/i, exact: false}).src,
    ).toBe(searchIconUrl)
  })

  it(':::RJSCPZ6HLZ_TEST_5:::Page should consist of HTML unordered list element to display the list of destinations:::5:::', () => {
    render(<App />)
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByRole('list').tagName).toBe('UL')
  })

  it(':::RJSCPZ6HLZ_TEST_6:::Page should consist of at least twelve HTML list items to display destinations:::5:::', () => {
    render(<App />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(12)
  })

  it(':::RJSCPZ6HLZ_TEST_7:::Page should consist of HTML image elements with alt attribute value as "{name}" and src attribute value as the value of the key "imgUrl" from destinationsList provided:::5:::', () => {
    render(<App />)

    const firstImageEl = screen.getByRole('img', {
      name: destinationsList[0].name,
      exact: false,
    })
    const secondImageEl = screen.getByRole('img', {
      name: destinationsList[1].name,
      exact: false,
    })
    const thirdImageEl = screen.getByRole('img', {
      name: destinationsList[2].name,
      exact: false,
    })
    const fourthImageEl = screen.getByRole('img', {
      name: destinationsList[3].name,
      exact: false,
    })
    const fifthImageEl = screen.getByRole('img', {
      name: destinationsList[4].name,
      exact: false,
    })
    const sixthImageEl = screen.getByRole('img', {
      name: destinationsList[5].name,
      exact: false,
    })
    const seventhImageEl = screen.getByRole('img', {
      name: destinationsList[6].name,
      exact: false,
    })
    const eighthImageEl = screen.getByRole('img', {
      name: destinationsList[7].name,
      exact: false,
    })
    const ninthImageEl = screen.getByRole('img', {
      name: destinationsList[8].name,
      exact: false,
    })
    const tenthImageEl = screen.getByRole('img', {
      name: destinationsList[9].name,
      exact: false,
    })
    const eleventhImageEl = screen.getByRole('img', {
      name: destinationsList[10].name,
      exact: false,
    })
    const twelfthImageEl = screen.getByRole('img', {
      name: destinationsList[11].name,
      exact: false,
    })

    expect(firstImageEl).toBeInTheDocument()
    expect(firstImageEl.src).toBe(destinationsList[0].imgUrl)

    expect(secondImageEl).toBeInTheDocument()
    expect(secondImageEl.src).toBe(destinationsList[1].imgUrl)

    expect(thirdImageEl).toBeInTheDocument()
    expect(thirdImageEl.src).toBe(destinationsList[2].imgUrl)

    expect(fourthImageEl).toBeInTheDocument()
    expect(fourthImageEl.src).toBe(destinationsList[3].imgUrl)

    expect(fifthImageEl).toBeInTheDocument()
    expect(fifthImageEl.src).toBe(destinationsList[4].imgUrl)

    expect(sixthImageEl).toBeInTheDocument()
    expect(sixthImageEl.src).toBe(destinationsList[5].imgUrl)

    expect(seventhImageEl).toBeInTheDocument()
    expect(seventhImageEl.src).toBe(destinationsList[6].imgUrl)

    expect(eighthImageEl).toBeInTheDocument()
    expect(eighthImageEl.src).toBe(destinationsList[7].imgUrl)

    expect(ninthImageEl).toBeInTheDocument()
    expect(ninthImageEl.src).toBe(destinationsList[8].imgUrl)

    expect(tenthImageEl).toBeInTheDocument()
    expect(tenthImageEl.src).toBe(destinationsList[9].imgUrl)

    expect(eleventhImageEl).toBeInTheDocument()
    expect(eleventhImageEl.src).toBe(destinationsList[10].imgUrl)

    expect(twelfthImageEl).toBeInTheDocument()
    expect(twelfthImageEl.src).toBe(destinationsList[11].imgUrl)
  })

  it(':::RJSCPZ6HLZ_TEST_8:::Page should consist of HTML paragraph elements with text content as the value of the key "name" from destinationsList provided:::5:::', () => {
    render(<App />)
    const firstParagraphEl = screen.getByText(destinationsList[0].name, {
      exact: false,
    })
    const secondParagraphEl = screen.getByText(destinationsList[1].name, {
      exact: false,
    })
    const thirdParagraphEl = screen.getByText(destinationsList[2].name, {
      exact: false,
    })
    const fourthParagraphEl = screen.getByText(destinationsList[3].name, {
      exact: false,
    })
    const fifthParagraphEl = screen.getByText(destinationsList[4].name, {
      exact: false,
    })
    const sixthParagraphEl = screen.getByText(destinationsList[5].name, {
      exact: false,
    })
    const seventhParagraphEl = screen.getByText(destinationsList[6].name, {
      exact: false,
    })
    const eighthParagraphEl = screen.getByText(destinationsList[7].name, {
      exact: false,
    })
    const ninthParagraphEl = screen.getByText(destinationsList[8].name, {
      exact: false,
    })
    const tenthParagraphEl = screen.getByText(destinationsList[9].name, {
      exact: false,
    })
    const eleventhParagraphEl = screen.getByText(destinationsList[10].name, {
      exact: false,
    })
    const twelfthParagraphEl = screen.getByText(destinationsList[11].name, {
      exact: false,
    })

    expect(firstParagraphEl).toBeInTheDocument()
    expect(firstParagraphEl.tagName).toBe('P')

    expect(secondParagraphEl).toBeInTheDocument()
    expect(secondParagraphEl.tagName).toBe('P')

    expect(thirdParagraphEl).toBeInTheDocument()
    expect(thirdParagraphEl.tagName).toBe('P')

    expect(fourthParagraphEl).toBeInTheDocument()
    expect(fourthParagraphEl.tagName).toBe('P')

    expect(fifthParagraphEl).toBeInTheDocument()
    expect(fifthParagraphEl.tagName).toBe('P')

    expect(sixthParagraphEl).toBeInTheDocument()
    expect(sixthParagraphEl.tagName).toBe('P')

    expect(seventhParagraphEl).toBeInTheDocument()
    expect(seventhParagraphEl.tagName).toBe('P')

    expect(eighthParagraphEl).toBeInTheDocument()
    expect(eighthParagraphEl.tagName).toBe('P')

    expect(ninthParagraphEl).toBeInTheDocument()
    expect(ninthParagraphEl.tagName).toBe('P')

    expect(tenthParagraphEl).toBeInTheDocument()
    expect(tenthParagraphEl.tagName).toBe('P')

    expect(eleventhParagraphEl).toBeInTheDocument()
    expect(eleventhParagraphEl.tagName).toBe('P')

    expect(twelfthParagraphEl).toBeInTheDocument()
    expect(twelfthParagraphEl.tagName).toBe('P')
  })

  it(':::RJSCPZ6HLZ_TEST_9:::When a non-empty search text "es" is provided in search input, only the destinations whose names contain the value provided in the search input should be displayed irrespective of the case:::5:::', () => {
    render(<App />)
    userEvent.type(screen.getByRole('searchbox'), 'es')
    expect(screen.getByText(/Escarpment/i, {exact: false})).toBeInTheDocument()
    expect(
      screen.getByText(/Westminster Abbey/i, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.queryByText(/New York/i, {exact: false}),
    ).not.toBeInTheDocument()
  })
})
