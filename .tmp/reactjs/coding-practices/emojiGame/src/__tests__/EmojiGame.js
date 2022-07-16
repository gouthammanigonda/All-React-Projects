import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import EmojiGame from '../App'

const GAME_LOGO = 'https://assets.ccbp.in/frontend/react-js/game-logo-img.png'
const LOSE_IMAGE = 'https://assets.ccbp.in/frontend/react-js/lose-game-img.png'
const WON_IMAGE = 'https://assets.ccbp.in/frontend/react-js/won-game-img.png'
const emojisList = [
  {
    id: 0,
    emojiName: 'Face with stuck out tongue',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-img.png',
  },
  {
    id: 1,
    emojiName: 'Face with head bandage',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-head-bandage-img.png',
  },
  {
    id: 2,
    emojiName: 'Face with hugs',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-hugs-img.png',
  },
  {
    id: 3,
    emojiName: 'Face with laughing',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-img.png',
  },
  {
    id: 4,
    emojiName: 'Laughing face with hand in front of mouth',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-with-hand-infront-mouth-img.png',
  },
  {
    id: 5,
    emojiName: 'Face with mask',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-mask-img.png',
  },
  {
    id: 6,
    emojiName: 'Face with silence',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-silence-img.png',
  },
  {
    id: 7,
    emojiName: 'Face with stuck out tongue and winked eye',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-and-winking-eye-img.png',
  },
  {
    id: 8,
    emojiName: 'Grinning face with sweat',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/grinning-face-with-sweat-img.png',
  },
  {
    id: 9,
    emojiName: 'Smiling face with heart eyes',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-heart-eyes-img.png',
  },
  {
    id: 10,
    emojiName: 'Grinning face',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/grinning-face-img.png',
  },
  {
    id: 11,
    emojiName: 'Smiling face with star eyes',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-star-eyes-img.png',
  },
]
const originalRandom = Math.random
const originalConsoleError = console.error

const wonTheGame = () => {
  userEvent.click(screen.getByRole('img', {name: emojisList[0].emojiName}))
  userEvent.click(screen.getByRole('img', {name: emojisList[1].emojiName}))
  userEvent.click(screen.getByRole('img', {name: emojisList[2].emojiName}))
  userEvent.click(screen.getByRole('img', {name: emojisList[3].emojiName}))
  userEvent.click(screen.getByRole('img', {name: emojisList[4].emojiName}))
  userEvent.click(screen.getByRole('img', {name: emojisList[5].emojiName}))
  userEvent.click(screen.getByRole('img', {name: emojisList[6].emojiName}))
  userEvent.click(screen.getByRole('img', {name: emojisList[7].emojiName}))
  userEvent.click(screen.getByRole('img', {name: emojisList[8].emojiName}))
  userEvent.click(screen.getByRole('img', {name: emojisList[9].emojiName}))
  userEvent.click(screen.getByRole('img', {name: emojisList[10].emojiName}))
  userEvent.click(screen.getByRole('img', {name: emojisList[11].emojiName}))
}

const loseTheGame = () => {
  userEvent.click(screen.getByRole('img', {name: emojisList[0].emojiName}))
  userEvent.click(screen.getByRole('img', {name: emojisList[1].emojiName}))
  userEvent.click(screen.getByRole('img', {name: emojisList[2].emojiName}))
  userEvent.click(screen.getByRole('img', {name: emojisList[3].emojiName}))
  userEvent.click(screen.getByRole('img', {name: emojisList[4].emojiName}))
  userEvent.click(screen.getByRole('img', {name: emojisList[5].emojiName}))
  userEvent.click(screen.getByRole('img', {name: emojisList[0].emojiName}))
}

describe(':::RJSCPU31DB_TEST_SUITE_1:::Emoji Game tests', () => {
  beforeEach(() => {
    const mockRandom = jest.fn().mockReturnValue(0.5)
    Math.random = mockRandom
  })

  afterEach(() => {
    Math.random = originalRandom
    console.error = originalConsoleError
  })

  it(':::RJSCPU31DB_TEST_1:::Page should consist of at least two HTML list items and the emojisList should be rendered using a unique key as a prop for each emoji card:::5:::', () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    render(<EmojiGame />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCPU31DB_TEST_2:::When the user clicks the HTML button element with the text "Play Again" then the Top Score of the game should change if the user score is greater than the Top Score:::5:::', () => {
    render(<EmojiGame />)
    expect(
      screen.getByText(/Top Score: 0/i, {exact: false}),
    ).toBeInTheDocument()
    loseTheGame()
    userEvent.click(
      screen.getByRole('button', {name: /Play Again/i, exact: false}),
    )
    wonTheGame()
    userEvent.click(
      screen.getByRole('button', {name: /Play Again/i, exact: false}),
    )
    expect(
      screen.getByText(/Top Score: 12/i, {exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPU31DB_TEST_3:::Page should consist of an HTML main heading element with "Emoji Game" as text content:::5:::', () => {
    render(<EmojiGame />)
    expect(
      screen.getByRole('heading', {name: /Emoji Game/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPU31DB_TEST_4:::Page should consist of an HTML image element with alt as "emoji logo" and src attribute value as the URL for emoji game logo:::5:::', () => {
    render(<EmojiGame />)

    const logoImg = screen.getByRole('img', {
      name: /emoji logo/i,
      exact: false,
    })

    expect(logoImg).toBeInTheDocument()
    expect(logoImg.src).toBe(GAME_LOGO)
  })

  it(':::RJSCPU31DB_TEST_5:::Page should consist of an HTML paragraph element with text content as "Score: 0" initially:::5:::', () => {
    render(<EmojiGame />)
    expect(screen.getByText(/^Score: 0/i, {exact: false}).tagName).toBe('P')
    expect(screen.getByText(/^Score: 0/i, {exact: false})).toBeInTheDocument()
  })

  it(':::RJSCPU31DB_TEST_6:::Page should consist of an HTML paragraph element with text content as "Top Score: 0" initially:::5:::', () => {
    render(<EmojiGame />)
    expect(screen.getByText(/Top Score: 0/i, {exact: false}).tagName).toBe('P')
    expect(
      screen.getByText(/Top Score: 0/i, {exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPU31DB_TEST_7:::Page should consist of at least twelve HTML button elements each inside a HTML list item:::5:::', () => {
    const {container} = render(<EmojiGame />)
    const buttonEls = container.querySelectorAll('li > button')

    expect(buttonEls.length).toBeGreaterThanOrEqual(12)
  })

  it(':::RJSCPU31DB_TEST_8:::Page should consist of at least twelve HTML image elements each inside a HTML button element with alt equal to the "emojiName" value and src equal to the "emojiUrl" value in emojisList provided :::5:::', () => {
    const {container} = render(<EmojiGame />)
    const imageEls = container.querySelectorAll('button > img')
    expect(imageEls.length).toBeGreaterThanOrEqual(12)

    const firstImageEl = screen.getByRole('img', {
      name: emojisList[0].emojiName,
      exact: false,
    })
    const secondImageEl = screen.getByRole('img', {
      name: emojisList[1].emojiName,
      exact: false,
    })
    const thirdImageEl = screen.getByRole('img', {
      name: emojisList[2].emojiName,
      exact: false,
    })
    const fourthImageEl = screen.getByRole('img', {
      name: emojisList[3].emojiName,
      exact: false,
    })
    const fifthImageEl = screen.getByRole('img', {
      name: emojisList[4].emojiName,
      exact: false,
    })
    const sixthImageEl = screen.getByRole('img', {
      name: emojisList[5].emojiName,
      exact: false,
    })
    const seventhImageEl = screen.getByRole('img', {
      name: emojisList[6].emojiName,
      exact: false,
    })
    const eighthImageEl = screen.getByRole('img', {
      name: emojisList[7].emojiName,
      exact: false,
    })
    const ninthImageEl = screen.getByRole('img', {
      name: emojisList[8].emojiName,
      exact: false,
    })
    const tenthImageEl = screen.getByRole('img', {
      name: emojisList[9].emojiName,
      exact: false,
    })
    const eleventhImageEl = screen.getByRole('img', {
      name: emojisList[10].emojiName,
      exact: false,
    })
    const twelfthImageEl = screen.getByRole('img', {
      name: emojisList[11].emojiName,
      exact: false,
    })

    expect(firstImageEl).toBeInTheDocument()
    expect(firstImageEl.src).toBe(emojisList[0].emojiUrl)

    expect(secondImageEl).toBeInTheDocument()
    expect(secondImageEl.src).toBe(emojisList[1].emojiUrl)

    expect(thirdImageEl).toBeInTheDocument()
    expect(thirdImageEl.src).toBe(emojisList[2].emojiUrl)

    expect(fourthImageEl).toBeInTheDocument()
    expect(fourthImageEl.src).toBe(emojisList[3].emojiUrl)

    expect(fifthImageEl).toBeInTheDocument()
    expect(fifthImageEl.src).toBe(emojisList[4].emojiUrl)

    expect(sixthImageEl).toBeInTheDocument()
    expect(sixthImageEl.src).toBe(emojisList[5].emojiUrl)

    expect(seventhImageEl).toBeInTheDocument()
    expect(seventhImageEl.src).toBe(emojisList[6].emojiUrl)

    expect(eighthImageEl).toBeInTheDocument()
    expect(eighthImageEl.src).toBe(emojisList[7].emojiUrl)

    expect(ninthImageEl).toBeInTheDocument()
    expect(ninthImageEl.src).toBe(emojisList[8].emojiUrl)

    expect(tenthImageEl).toBeInTheDocument()
    expect(tenthImageEl.src).toBe(emojisList[9].emojiUrl)

    expect(eleventhImageEl).toBeInTheDocument()
    expect(eleventhImageEl.src).toBe(emojisList[10].emojiUrl)

    expect(twelfthImageEl).toBeInTheDocument()
    expect(twelfthImageEl.src).toBe(emojisList[11].emojiUrl)
  })

  it(':::RJSCPU31DB_TEST_9:::When the user has won the game then the page should consist of an HTML main heading element with "You Won" as text content:::5:::', () => {
    render(<EmojiGame />)
    wonTheGame()
    expect(
      screen.getByRole('heading', {name: /You Won/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPU31DB_TEST_10:::When the user has won the game then the page should consist of an HTML paragraph element with "Best Score" as text content:::5:::', () => {
    render(<EmojiGame />)
    wonTheGame()
    expect(screen.getByText(/Best Score/i, {exact: false}).tagName).toBe('P')
  })

  it(':::RJSCPU31DB_TEST_11:::When the user has won the game then the page should consist of an HTML paragraph element with "12/12" as text content:::5:::', () => {
    render(<EmojiGame />)
    wonTheGame()
    expect(screen.getByText(/12\/12/, {exact: false}).tagName).toBe('P')
  })

  it(':::RJSCPU31DB_TEST_12:::When the user has won the game then the page should consist of an HTML button element with "Play Again" as text content:::5:::', () => {
    render(<EmojiGame />)
    wonTheGame()
    expect(
      screen.getByRole('button', {name: /Play Again/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPU31DB_TEST_13:::When the user has won the game then the page should consist of an HTML image element with alt as "win or lose" and src attribute value as the URL for the won game image:::5:::', () => {
    render(<EmojiGame />)
    wonTheGame()
    const imageEl = screen.getByRole('img', {
      name: /win or lose/i,
      exact: false,
    })

    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(WON_IMAGE)
  })

  it(':::RJSCPU31DB_TEST_14:::When the user has won the game then the page should not contain HTML paragraph elements with text content as "Score" and "Top Score":::5:::', () => {
    render(<EmojiGame />)
    wonTheGame()
    expect(
      screen.queryByText(/^Score/i, {exact: false}),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(/Top Score/i, {exact: false}),
    ).not.toBeInTheDocument()
  })

  it(':::RJSCPU31DB_TEST_15:::When the user clicks an HTML button element with the text "Play Again" after completing the game then the game should be started - with at least twelve emojis displayed:::5:::', () => {
    const {container} = render(<EmojiGame />)

    wonTheGame()
    userEvent.click(
      screen.getByRole('button', {name: /Play Again/i, exact: false}),
    )
    const imageEls = container.querySelectorAll('button > img')
    expect(imageEls.length).toBeGreaterThanOrEqual(12)
  })

  it(':::RJSCPU31DB_TEST_16:::When the user clicks any emoji twice then the page should consist of an HTML main heading element with "You Lose" as text content:::5:::', () => {
    render(<EmojiGame />)
    loseTheGame()
    expect(
      screen.getByRole('heading', {name: /You Lose/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPU31DB_TEST_17:::When the user clicks an emoji twice then the page should consist of an HTML paragraph element with "Score" as text content:::5:::', () => {
    render(<EmojiGame />)
    loseTheGame()
    expect(screen.getByText(/^Score/i, {exact: false}).tagName).toBe('P')
  })

  it(':::RJSCPU31DB_TEST_18:::When the user clicks an emoji twice then the page should consist of an HTML button element with "Play Again" as text content:::5:::', () => {
    render(<EmojiGame />)
    loseTheGame()
    expect(
      screen.getByRole('button', {name: /Play Again/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPU31DB_TEST_19:::When the user clicks an emoji twice then the page should consist of an HTML image element with alt as "win or lose" and src attribute value as the URL for the lose game image:::5:::', () => {
    render(<EmojiGame />)
    loseTheGame()
    const imageEl = screen.getByRole('img', {
      name: /win or lose/i,
      exact: false,
    })

    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(LOSE_IMAGE)
  })

  it(':::RJSCPU31DB_TEST_20:::When the user has lost the game and clicks an HTML button element with the text "Play Again" after completing the game then the game should be started - with at least twelve emojis displayed:::5:::', () => {
    const {container} = render(<EmojiGame />)

    loseTheGame()
    userEvent.click(
      screen.getByRole('button', {name: /Play Again/i, exact: false}),
    )
    const imageEls = container.querySelectorAll('button > img')
    expect(imageEls.length).toBeGreaterThanOrEqual(12)
  })
})
