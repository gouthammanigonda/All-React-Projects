import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const resetImage =
  'https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png'
const trophyImage =
  'https://assets.ccbp.in/frontend/react-js/match-game-trophy.png'
const timerImage =
  'https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png'
const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png'
const imagesList = [
  {
    id: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/orange-thumbnail-img.png',
    category: 'FRUIT',
  },
  {
    id: '04ac6b9f-b7e7-45f7-a8fc-fd48f3f72526',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/panda-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/panda-thumbnail-img.png',
    category: 'ANIMAL',
  },
  {
    id: 'a132f546-5b2b-4c0d-b9e4-e524bdf904cc',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/zebra-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/zebra-thumbnail-img.png',
    category: 'ANIMAL',
  },
  {
    id: 'd89386da-94db-4275-9cb5-249c6e071a19',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/paris-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/paris-thumbnail-img.png',
    category: 'PLACE',
  },
  {
    id: 'd810bbb0-1683-407a-8db6-898fe7b75782',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/giraffe-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/giraffe-thumbnail-img.png',
    category: 'ANIMAL',
  },
  {
    id: '176aab62-e86a-4ccd-8b89-5b83c3f02506',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/taj-mahal-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/taj-mahal-thumbnail-img.png',
    category: 'PLACE',
  },
  {
    id: '0e8daf1b-45b0-4eb0-9dde-383fede78a9b',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/monkey-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/monkey-thumbnail-img.png',
    category: 'ANIMAL',
  },
  {
    id: '1a38bf4a-659d-4470-956c-56c1bedd26ac',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/cheetah-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/cheetah-thumbnail-img.png',
    category: 'ANIMAL',
  },
  {
    id: '8f2ebd70-4fdd-47a0-b4f9-a6c654b519ab',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/ooti-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/ooti-thumbnail-img.png',
    category: 'PLACE',
  },
  {
    id: '7a72c38e-a83d-48eb-b9ce-ae3c0361cc49',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/pineapple-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/pineapple-thumbnail-img.png',
    category: 'FRUIT',
  },
  {
    id: '97a33ed5-98ed-4c95-a8f0-1595880b3b69',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/strawberry-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/strawberry-thumbnail-img.png',
    category: 'FRUIT',
  },
  {
    id: '07e20159-a950-4c22-9ca8-5ed71563ae24',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/maldives-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/maldives-thumbnail-img.png',
    category: 'PLACE',
  },
  {
    id: '43883239-8a28-47dc-9e93-43ef31654c17',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/emerald-lake-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/emerald-thumbnail-lake-img.png',
    category: 'PLACE',
  },
  {
    id: '49865ac4-b5e8-4d04-893b-d69ad6004da8',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/watermelon-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/watermelon-thumbnail-img.png',
    category: 'FRUIT',
  },
  {
    id: '649ab251-7fd6-4d65-aa0f-39020ce25932',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/elephant-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/elephant-thumbnail-img.png',
    category: 'ANIMAL',
  },
  {
    id: '1d0d1c41-e05e-4820-8614-34ee5ada20e0',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/jammu-hills-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/jammu-thumbnail-hills-img.png',
    category: 'PLACE',
  },
  {
    id: '88b4ab36-a0c1-4c56-9ce5-3b80dd8c7669',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/fierce-coyote-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/fierce-thumbnail-coyote-img.png',
    category: 'ANIMAL',
  },
  {
    id: '8a841bf8-3222-44da-b0fb-4c60190402d7',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/lidder-valley-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/lidder-thumbnail-valley-img.png',
    category: 'PLACE',
  },
  {
    id: 'd406e63c-eaaf-49ea-88a6-ed6a1572eb97',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/kivi-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/kivi-thumbnail-img.png',
    category: 'FRUIT',
  },
  {
    id: 'e997ebf9-9a47-4b7e-9035-01ae372d73dc',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/dragon-fruit-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/dragon-thumbnail-fruit-img.png',
    category: 'FRUIT',
  },
  {
    id: 'c7fbe10e-3282-4fca-815b-91b75d5228cb',
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/match-game/goa-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/goa-thumbnail-img.png',
    category: 'PLACE',
  },
  {
    id: '4210274c-7304-44d6-8690-c5251252cd10',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/papaya-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/papaya-thumbnail-img.png',
    category: 'FRUIT',
  },
  {
    id: '057b6193-a80d-4036-9e6e-fe847c99fbb6',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/mixed-fruits-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/mixed-thumbnail-fruits-img.png',
    category: 'FRUIT',
  },
  {
    id: '4e56c59b-835b-4802-87fe-77aaaa5b9526',
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/match-game/fox-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/fox-thumbnail-img.png',
    category: 'ANIMAL',
  },
  {
    id: 'ad75a7b1-0875-4700-977b-2c45924509aa',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/lotus-temple-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/lotus-thumbnail-temple-img.png',
    category: 'PLACE',
  },
  {
    id: '525aba17-ed5c-4f09-ad1c-b6bff222c97a',
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/match-game/dog-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/dog-thumbnail-img.png',
    category: 'ANIMAL',
  },
  {
    id: 'c6c66b00-c130-47d2-9d3a-1c3378d08aba',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/apple-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/apple-thumbnail-img.png',
    category: 'FRUIT',
  },
  {
    id: '6078b408-4f10-46d3-8815-db14403dbd73',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/bhadrinath-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/bhadrinath-thumbnail-img.png',
    category: 'PLACE',
  },
  {
    id: 'a2baca84-3beb-49d1-bced-f9a88c161bec',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/camel-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/camel-thumbnail-img.png',
    category: 'ANIMAL',
  },
  {
    id: '1edac278-8390-4da9-b914-5f41fb49283c',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/cherry-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/cherry-thumbnail-img.png',
    category: 'FRUIT',
  },
]

const tabsList = [
  {tabId: 'FRUIT', displayText: 'Fruits'},
  {tabId: 'ANIMAL', displayText: 'Animals'},
  {tabId: 'PLACE', displayText: 'Places'},
]

const originalConsoleError = console.error

describe(':::RJSCP5ZAQU_TEST_SUITE_1:::Match Game tests', () => {
  let rockMockRandom
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    console.error = originalConsoleError
  })

  it(':::RJSCP5ZAQU_TEST_1:::Page should consist of at least two HTML list items and the tabsList, thumbnailsList should be rendered using a unique key as a prop for each tab item and thumbnail item respectively:::5:::', () => {
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

  it(':::RJSCP5ZAQU_TEST_2:::Page should consist of an HTML image element with alt attribute value as "website logo" and src as the given website logo URL:::5:::', () => {
    render(<App />)
    const imageEl = screen.getByRole('img', {
      name: /website logo/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(websiteLogo)
  })

  it(':::RJSCP5ZAQU_TEST_3:::Page should consist of at least three HTML unordered list elements to display the list of nav items, tab items, and thumbnail items:::5:::', () => {
    render(<App />)
    const unorderedLists = screen.getAllByRole('list')
    expect(unorderedLists.length).toBeGreaterThanOrEqual(3)
    expect(
      unorderedLists.every(eachItem => eachItem.tagName === 'UL'),
    ).toBeTruthy()
  })

  it(':::RJSCP5ZAQU_TEST_4:::Page should consist of at least fifteen HTML list items to display the list of nav items, tab items, and thumbnail items:::5:::', () => {
    render(<App />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(15)
  })

  it(':::RJSCP5ZAQU_TEST_5:::Page should consist of an HTML paragraph element with text content as "Score:":::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getByText(/^Score:/i, {exact: false})
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCP5ZAQU_TEST_6:::Page should initially consist of the user score as "0":::5:::', () => {
    render(<App />)
    expect(screen.getByText(/^0/i, {exact: false})).toBeInTheDocument()
  })

  it(':::RJSCP5ZAQU_TEST_7:::Page should consist of an HTML image element with alt attribute value as "timer" and src as the given timer image URL:::5:::', () => {
    render(<App />)
    const imageEl = screen.getByRole('img', {name: /timer/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(timerImage)
  })

  it(':::RJSCP5ZAQU_TEST_8:::Page should initially consist of an HTML paragraph element to display the timer limit with text content as "60 sec":::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getByText(/60 sec/i, {exact: false})
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCP5ZAQU_TEST_9:::Page should initially consist of an HTML image element with alt attribute value as "match" and src as the value of the key "imageUrl" from the first object in imagesList provided:::5:::', () => {
    render(<App />)
    const imageEl = screen.getByRole('img', {name: /match/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(imagesList[0].imageUrl)
  })

  it(':::RJSCP5ZAQU_TEST_10:::Page should consist of at least thirteen HTML button elements each inside an HTML list item:::5:::', () => {
    const {container} = render(<App />)
    const buttonElements = container.querySelectorAll('li > button')
    expect(buttonElements.length).toBeGreaterThanOrEqual(13)
  })

  it(':::RJSCP5ZAQU_TEST_11:::Page should consist of at least three HTML button elements with text content equal to the "displayText" value of each item in tabsList provided:::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {name: tabsList[0].displayText, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {name: tabsList[1].displayText, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {name: tabsList[2].displayText, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP5ZAQU_TEST_12:::When the page is opened, the Fruits tab should be active, and the page should consist of HTML image elements with alt as "thumbnail" and src as the value of the key "thumbnailUrl" with category "FRUIT" from imagesList provided:::5:::', () => {
    render(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(imagesList[0].thumbnailUrl)
    expect(imageEls[1]).toBeInTheDocument()
    expect(imageEls[1].src).toBe(imagesList[9].thumbnailUrl)
    expect(imageEls[2]).toBeInTheDocument()
    expect(imageEls[2].src).toBe(imagesList[10].thumbnailUrl)
    expect(imageEls[3]).toBeInTheDocument()
    expect(imageEls[3].src).toBe(imagesList[13].thumbnailUrl)
    expect(imageEls[4]).toBeInTheDocument()
    expect(imageEls[4].src).toBe(imagesList[18].thumbnailUrl)
    expect(imageEls[5]).toBeInTheDocument()
    expect(imageEls[5].src).toBe(imagesList[19].thumbnailUrl)
    expect(imageEls[6]).toBeInTheDocument()
    expect(imageEls[6].src).toBe(imagesList[21].thumbnailUrl)
    expect(imageEls[7]).toBeInTheDocument()
    expect(imageEls[7].src).toBe(imagesList[22].thumbnailUrl)
    expect(imageEls[8]).toBeInTheDocument()
    expect(imageEls[8].src).toBe(imagesList[26].thumbnailUrl)
    expect(imageEls[9]).toBeInTheDocument()
    expect(imageEls[9].src).toBe(imagesList[29].thumbnailUrl)
  })

  it(':::RJSCP5ZAQU_TEST_13:::When the page is opened, the timer should start running backwards, and should consist of an HTML paragraph element with text content displaying the remaining time:::5:::', () => {
    render(<App />)
    jest.runTimersToTime(1000)
    const paragraphEl = screen.getByText(/59 Sec/i, {exact: false})
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    jest.runTimersToTime(1000)
    expect(screen.getByText(/58 Sec/i, {exact: false})).toBeInTheDocument()
  })

  it(':::RJSCP5ZAQU_TEST_14:::When the Animals tab is clicked, then the page should consist of HTML image elements with alt as "thumbnail" and src as the value of the key "thumbnailUrl" with category "ANIMAL" from imagesList provided:::5:::', () => {
    render(<App />)
    const animalTabEl = screen.getByRole('button', {
      name: tabsList[1].displayText,
      exact: false,
    })
    userEvent.click(animalTabEl)
    const imageEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(imagesList[1].thumbnailUrl)
    expect(imageEls[1]).toBeInTheDocument()
    expect(imageEls[1].src).toBe(imagesList[2].thumbnailUrl)
    expect(imageEls[2]).toBeInTheDocument()
    expect(imageEls[2].src).toBe(imagesList[4].thumbnailUrl)
    expect(imageEls[3]).toBeInTheDocument()
    expect(imageEls[3].src).toBe(imagesList[6].thumbnailUrl)
    expect(imageEls[4]).toBeInTheDocument()
    expect(imageEls[4].src).toBe(imagesList[7].thumbnailUrl)
    expect(imageEls[5]).toBeInTheDocument()
    expect(imageEls[5].src).toBe(imagesList[14].thumbnailUrl)
    expect(imageEls[6]).toBeInTheDocument()
    expect(imageEls[6].src).toBe(imagesList[16].thumbnailUrl)
    expect(imageEls[7]).toBeInTheDocument()
    expect(imageEls[7].src).toBe(imagesList[23].thumbnailUrl)
    expect(imageEls[8]).toBeInTheDocument()
    expect(imageEls[8].src).toBe(imagesList[25].thumbnailUrl)
    expect(imageEls[9]).toBeInTheDocument()
    expect(imageEls[9].src).toBe(imagesList[28].thumbnailUrl)
  })

  it(':::RJSCP5ZAQU_TEST_15:::When the Places tab is clicked, then the page should consist of HTML image elements with alt as "thumbnail" and src as the value of the key "thumbnailUrl" with category "PLACE" from imagesList provided:::5:::', () => {
    render(<App />)
    const placesTabEl = screen.getByRole('button', {
      name: tabsList[2].displayText,
      exact: false,
    })
    userEvent.click(placesTabEl)
    const imageEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(imagesList[3].thumbnailUrl)
    expect(imageEls[1]).toBeInTheDocument()
    expect(imageEls[1].src).toBe(imagesList[5].thumbnailUrl)
    expect(imageEls[2]).toBeInTheDocument()
    expect(imageEls[2].src).toBe(imagesList[8].thumbnailUrl)
    expect(imageEls[3]).toBeInTheDocument()
    expect(imageEls[3].src).toBe(imagesList[11].thumbnailUrl)
    expect(imageEls[4]).toBeInTheDocument()
    expect(imageEls[4].src).toBe(imagesList[12].thumbnailUrl)
    expect(imageEls[5]).toBeInTheDocument()
    expect(imageEls[5].src).toBe(imagesList[15].thumbnailUrl)
    expect(imageEls[6]).toBeInTheDocument()
    expect(imageEls[6].src).toBe(imagesList[17].thumbnailUrl)
    expect(imageEls[7]).toBeInTheDocument()
    expect(imageEls[7].src).toBe(imagesList[20].thumbnailUrl)
    expect(imageEls[8]).toBeInTheDocument()
    expect(imageEls[8].src).toBe(imagesList[24].thumbnailUrl)
    expect(imageEls[9]).toBeInTheDocument()
    expect(imageEls[9].src).toBe(imagesList[27].thumbnailUrl)
  })

  it(':::RJSCP5ZAQU_TEST_16:::When the Fruits tab is clicked, then the page should consist of HTML image elements with alt as "thumbnail" and src as the value of the key "thumbnailUrl" with category "FRUIT" from imagesList provided:::5:::', () => {
    render(<App />)
    const fruitsTabEl = screen.getByRole('button', {
      name: tabsList[0].displayText,
      exact: false,
    })
    userEvent.click(fruitsTabEl)
    const imageEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(imagesList[0].thumbnailUrl)
    expect(imageEls[1]).toBeInTheDocument()
    expect(imageEls[1].src).toBe(imagesList[9].thumbnailUrl)
    expect(imageEls[2]).toBeInTheDocument()
    expect(imageEls[2].src).toBe(imagesList[10].thumbnailUrl)
    expect(imageEls[3]).toBeInTheDocument()
    expect(imageEls[3].src).toBe(imagesList[13].thumbnailUrl)
    expect(imageEls[4]).toBeInTheDocument()
    expect(imageEls[4].src).toBe(imagesList[18].thumbnailUrl)
    expect(imageEls[5]).toBeInTheDocument()
    expect(imageEls[5].src).toBe(imagesList[19].thumbnailUrl)
    expect(imageEls[6]).toBeInTheDocument()
    expect(imageEls[6].src).toBe(imagesList[21].thumbnailUrl)
    expect(imageEls[7]).toBeInTheDocument()
    expect(imageEls[7].src).toBe(imagesList[22].thumbnailUrl)
    expect(imageEls[8]).toBeInTheDocument()
    expect(imageEls[8].src).toBe(imagesList[26].thumbnailUrl)
    expect(imageEls[9]).toBeInTheDocument()
    expect(imageEls[9].src).toBe(imagesList[29].thumbnailUrl)
  })

  it(':::RJSCP5ZAQU_TEST_17:::When a thumbnail is clicked that is matched with the image to be matched, then the score should be incremented by one:::5:::', () => {
    render(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    userEvent.click(imageEls[0])
    expect(screen.getByText(/1/i, {exact: false})).toBeInTheDocument()
  })

  it(':::RJSCP5ZAQU_TEST_18:::When a thumbnail is clicked that is matched with the image to be matched, then the HTML image element with alt attribute value "match" should be changed randomly from imagesList provided:::5:::', () => {
    rockMockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.1)
    render(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    userEvent.click(imageEls[0])
    expect(rockMockRandom).toHaveBeenCalled()
    const randomImageEl = screen.queryByRole('img', {
      name: /match/i,
      exact: false,
    })
    expect(randomImageEl.src).not.toBe(imagesList[0].imageUrl)
    expect(randomImageEl.src).toBe(imagesList[3].imageUrl)
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCP5ZAQU_TEST_19:::When the timer reached 0 sec, then the page should have an HTML image element with alt attribute value as "trophy" and src as the given trophy image URL:::5:::', () => {
    render(<App />)
    jest.runTimersToTime(61000)
    const imageEl = screen.getByRole('img', {name: /trophy/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(trophyImage)
  })

  it(':::RJSCP5ZAQU_TEST_20:::When the timer reached 0 sec, then the page should have an HTML paragraph element with text content as "YOUR SCORE":::5:::', () => {
    render(<App />)
    jest.runTimersToTime(61000)
    const paragraphEl = screen.getByText(/YOUR SCORE/i, {exact: false})
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCP5ZAQU_TEST_21:::When the timer reached 0 sec, then the page should have a score achieved by the user in the header and scorecard:::5:::', () => {
    render(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    userEvent.click(imageEls[0])
    jest.runTimersToTime(61000)
    expect(
      screen.getAllByText(/1/i, {exact: false}).length,
    ).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCP5ZAQU_TEST_22:::When the timer reached 0 sec, then the page should have an HTML image element with alt attribute value as "reset" and src as the given reset image URL:::5:::', () => {
    render(<App />)
    jest.runTimersToTime(61000)
    const imageEl = screen.getByRole('img', {name: /reset/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(resetImage)
  })

  it(':::RJSCP5ZAQU_TEST_23:::When the timer reached 0 sec, then the page should have an HTML button element with text content as "PLAY AGAIN":::5:::', () => {
    render(<App />)
    jest.runTimersToTime(61000)
    expect(
      screen.getByRole('button', {name: /PLAY AGAin/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP5ZAQU_TEST_24:::When the "PLAY AGAIN" button is clicked, then the timer should be reset to "60 Sec":::5:::', () => {
    render(<App />)
    jest.runTimersToTime(61000)
    userEvent.click(
      screen.getByRole('button', {name: /PLAY AGAIN/i, exact: false}),
    )

    expect(screen.getByText(/60 Sec/i, {exact: false})).toBeInTheDocument()
  })

  it(':::RJSCP5ZAQU_TEST_25:::When the "PLAY AGAIN" button is clicked, then the score should be reset to "0":::5:::', () => {
    render(<App />)
    jest.runTimersToTime(61000)
    userEvent.click(
      screen.getByRole('button', {name: /PLAY AGAIN/i, exact: false}),
    )
    expect(screen.getByText(/^0/i, {exact: false})).toBeInTheDocument()
  })

  it(':::RJSCP5ZAQU_TEST_26:::When the "PLAY AGAIN" button is clicked, then the new game should be started and the page should consist of at least fifteen HTML list items:::5:::', () => {
    render(<App />)
    jest.runTimersToTime(61000)
    userEvent.click(
      screen.getByRole('button', {name: /PLAY AGAIN/i, exact: false}),
    )
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(15)
  })

  it(':::RJSCP5ZAQU_TEST_27:::When a thumbnail is clicked that is mismatched with the image to be matched, then the page should show the scorecard view:::5:::', () => {
    render(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /thumbnail/i,
      exact: false,
    })
    userEvent.click(imageEls[3])
    const imageEl = screen.getByRole('img', {name: /trophy/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(trophyImage)
  })
})
