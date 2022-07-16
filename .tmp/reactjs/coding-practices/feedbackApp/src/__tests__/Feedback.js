import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Feedback from '../App'

const resources = {
  emojis: [
    {
      id: 0,
      name: 'Sad',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/sad-emoji-img.png',
    },
    {
      id: 1,
      name: 'None',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/none-emoji-img.png',
    },
    {
      id: 2,
      name: 'Happy',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/happy-emoji-img.png',
    },
  ],
  loveEmojiUrl: 'https://assets.ccbp.in/frontend/react-js/love-emoji-img.png',
}

const originalConsoleError = console.error

describe(':::RJSCPCMJQ7_TEST_SUITE_1:::Feedback App tests', () => {
  afterEach(() => {
    console.error = originalConsoleError
  })

  it(':::RJSCPCMJQ7_TEST_1:::Page should consist of at least two HTML list items and the emojis should be rendered using a unique key as a prop for each emoji:::5:::', () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    render(<Feedback />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCPCMJQ7_TEST_2:::Page should consist of an HTML heading element with text content as "How satisfied are you with our customer support performance":::5:::', () => {
    render(<Feedback />)
    expect(
      screen.getByRole('heading', {
        name: /How satisfied are you with our customer support performance/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPCMJQ7_TEST_3:::Page should consist of HTML image elements with alt value equal to the "name" value and src value equal to the "imageUrl" value in resources provided:::5:::', () => {
    render(<Feedback />)
    const {emojis} = resources
    const firstImgEl = screen.getByRole('img', {
      name: emojis[0].name,
      exact: false,
    })
    const secondImgEl = screen.getByRole('img', {
      name: emojis[1].name,
      exact: false,
    })
    const thirdImgEl = screen.getByRole('img', {
      name: emojis[2].name,
      exact: false,
    })

    expect(firstImgEl).toBeInTheDocument()
    expect(firstImgEl.src).toBe(emojis[0].imageUrl)

    expect(secondImgEl).toBeInTheDocument()
    expect(secondImgEl.src).toBe(emojis[1].imageUrl)

    expect(thirdImgEl).toBeInTheDocument()
    expect(thirdImgEl.src).toBe(emojis[2].imageUrl)
  })

  it(':::RJSCPCMJQ7_TEST_4:::When the user clicks an emoji, then the page should consist of HTML main heading element with text content as "Thank You":::5:::', () => {
    render(<Feedback />)
    const {emojis} = resources

    userEvent.click(
      screen.getByRole('img', {name: emojis[0].name, exact: false}),
    )
    expect(
      screen.getByRole('heading', {
        name: /Thank You/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPCMJQ7_TEST_5:::When the user clicks an emoji, then the page should consist of HTML image element with alt value as "love emoji" value and src equal to the "loveEmojiUrl" value in resources provided:::5:::', () => {
    render(<Feedback />)
    const {emojis, loveEmojiUrl} = resources

    userEvent.click(
      screen.getByRole('img', {name: emojis[0].name, exact: false}),
    )

    const loveEmoji = screen.getByRole('img', {
      name: /love emoji/i,
      exact: false,
    })
    expect(loveEmoji).toBeInTheDocument()
    expect(loveEmoji.src).toBe(loveEmojiUrl)
  })
})
