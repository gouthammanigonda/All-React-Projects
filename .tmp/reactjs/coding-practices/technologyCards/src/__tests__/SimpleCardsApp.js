import {render, screen} from '@testing-library/react'

import App from '../App'

const cardsList = [
  {
    id: 1,
    title: 'Data Scientist',
    description:
      'Data scientists gather and analyze large sets of structured and unstructured data',
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/data-scientist-img.png',
    className: 'card-1',
  },
  {
    id: 2,
    title: 'IOT Developer',
    description:
      'IoT Developers are professionals who can develop, manage, and monitor IoT devices.',
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/iot-developer-img.png',
    className: 'card-2',
  },
  {
    id: 3,
    title: 'VR Developer',
    description:
      'A VR developer creates completely new digital environments that people can see.',
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/vr-developer-img.png',
    className: 'card-3',
  },
  {
    id: 4,
    title: 'ML Engineer',
    description:
      'Machine learning engineers feed data into models defined by data scientists.',
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/ml-engineer-img.png',
    className: 'card-4',
  },
]

const originalConsoleError = console.error

describe(':::RJSCPUPP7H_TEST_SUITE_1:::Technology Cards tests', () => {
  afterEach(() => {
    console.error = originalConsoleError
  })

  it(':::RJSCPUPP7H_TEST_1:::Page should consist of at least two HTML list items and the cardsList should be rendered using a unique key as a prop for each card item:::5:::', () => {
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

  it(':::RJSCPUPP7H_TEST_2:::Each card should consist of an HTML paragraph element with text content as the value of the key "description" in cardsList:::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getByText(cardsList[0].description, {
      exact: false,
    })

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPUPP7H_TEST_3:::Each card should consist of an HTML image element with alt attribute value as "{title}" and src attribute value as the value of the key "imgUrl" in cardsList:::5:::', () => {
    render(<App />)

    const imgEl = screen.getByRole('img', {
      name: cardsList[0].title,
      exact: false,
    })

    expect(imgEl).toBeInTheDocument()
    expect(imgEl.src).toBe(cardsList[0].imgUrl)
  })

  it(':::RJSCPUPP7H_TEST_4:::Each card should have an HTML list item with the class name as the value of the key "className" in cardsList:::5:::', () => {
    const {container} = render(<App />)
    const containerElement1 = container.querySelector('.card-1')
    expect(containerElement1.tagName).toBe('LI')
  })

  it(':::RJSCPUPP7H_TEST_5:::Each card should consist of an HTML main heading element with text content as the value of the key "title" in cardsList:::5:::', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {name: cardsList[0].title, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPUPP7H_TEST_6:::Page should consist of an HTML paragraph element with text content starting with "Get trained by alumni of IITs and top companies":::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getByText(
      /Get trained by alumni of IITs and top companies/i,
      {
        exact: false,
      },
    )

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPUPP7H_TEST_7:::Page should consist of HTML main heading elements with text content as the value of the key "title" in cardsList:::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {name: cardsList[0].title, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: cardsList[1].title, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: cardsList[2].title, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: cardsList[3].title, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPUPP7H_TEST_8:::Page should consist of HTML paragraph elements with text content as the value of the key "description" in cardsList:::5:::', () => {
    render(<App />)

    const firstParagraphEl = screen.getByText(cardsList[0].description, {
      exact: false,
    })

    const secondParagraphEl = screen.getByText(cardsList[1].description, {
      exact: false,
    })

    const thirdParagraphEl = screen.getByText(cardsList[2].description, {
      exact: false,
    })

    const fourthParagraphEl = screen.getByText(cardsList[3].description, {
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
  })

  it(':::RJSCPUPP7H_TEST_9:::Page should consist of HTML image elements with alt attribute value as "{title}" and src attribute value as the value of the key "imgUrl" in cardsList:::5:::', () => {
    render(<App />)
    const firstImgEl = screen.getByRole('img', {
      name: cardsList[0].title,
      exact: false,
    })
    const secondImgEl = screen.getByRole('img', {
      name: cardsList[1].title,
      exact: false,
    })
    const thirdImgEl = screen.getByRole('img', {
      name: cardsList[2].title,
      exact: false,
    })
    const fourthImgEl = screen.getByRole('img', {
      name: cardsList[3].title,
      exact: false,
    })

    expect(firstImgEl).toBeInTheDocument()
    expect(firstImgEl.src).toBe(cardsList[0].imgUrl)

    expect(secondImgEl).toBeInTheDocument()
    expect(secondImgEl.src).toBe(cardsList[1].imgUrl)

    expect(thirdImgEl).toBeInTheDocument()
    expect(thirdImgEl.src).toBe(cardsList[2].imgUrl)

    expect(fourthImgEl).toBeInTheDocument()
    expect(fourthImgEl.src).toBe(cardsList[3].imgUrl)
  })

  it(':::RJSCPUPP7H_TEST_10:::Page should consist of HTML list items with class names as the value of the key "className" in cardsList:::5:::', () => {
    const {container} = render(<App />)
    const containerElement1 = container.querySelector('.card-1')
    const containerElement2 = container.querySelector('.card-2')
    const containerElement3 = container.querySelector('.card-3')
    const containerElement4 = container.querySelector('.card-4')
    expect(containerElement1.tagName).toBe('LI')
    expect(containerElement2.tagName).toBe('LI')
    expect(containerElement3.tagName).toBe('LI')
    expect(containerElement4.tagName).toBe('LI')
  })
})
