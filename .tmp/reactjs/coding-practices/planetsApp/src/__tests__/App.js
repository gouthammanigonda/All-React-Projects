import 'jest-styled-components'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const planetsList = [
  {
    id: 'c22777fe-f72e-11eb-9a03-0242ac130003',
    name: 'Mercury',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/planets-app/mercury-img.png',
    description:
      'Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun planets.',
  },
  {
    id: 'c2277a74-f72e-11eb-9a03-0242ac130003',
    name: 'Venus',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/planets-app/venus-img.png',
    description:
      'Venus is the second planet from the Sun and is Earth’s closest planetary neighbor. It’s one of the four inner, terrestrial (or rocky) planets, and it’s often called Earth’s twin because it’s similar in size and density. These are not identical twins, however – there are radical differences between the two worlds.',
  },
  {
    id: 'c2277b64-f72e-11eb-9a03-0242ac130003',
    name: 'Earth',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/planets-app/earth-img.png',
    description:
      'Earth is the third planet from the Sun and the only astronomical object known to harbor and support life. About 29.2% of Earth’s surface is land consisting of continents and islands.',
  },
  {
    id: 'c2277c2c-f72e-11eb-9a03-0242ac130003',
    name: 'Mars',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/planets-app/mars-img.png',
    description:
      'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury.',
  },
  {
    id: 'c2277cea-f72e-11eb-9a03-0242ac130003',
    name: 'Jupiter',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/planets-app/jupiter-img.png',
    description:
      'Jupiter has a long history of surprising scientists – all the way back to 1610 when Galileo Galilei found the first moons beyond Earth. That discovery changed the way we see the universe.',
  },
  {
    id: 'c2277d9e-f72e-11eb-9a03-0242ac130003',
    name: 'Saturn',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/planets-app/saturn-img.png',
    description:
      'Saturn is the sixth planet from the Sun and the second-largest planet in our solar system. Adorned with a dazzling system of icy rings, Saturn is unique among the planets. It is not the only planet to have rings, but none are as spectacular or as complex as Saturn’s.',
  },
  {
    id: 'c2277e52-f72e-11eb-9a03-0242ac130003',
    name: 'Uranus',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/planets-app/uranus-img.png',
    description:
      'Uranus is the seventh planet from the Sun and has the third-largest diameter in our solar system. It was the first planet found with the aid of a telescope, Uranus was discovered in 1781 by astronomer William Herschel, although he originally thought it was either a comet or a star.',
  },
  {
    id: 'c2277f06-f72e-11eb-9a03-0242ac130003',
    name: 'Neptune',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/planets-app/neptune-img.png',
    description:
      'Dark, cold, and whipped by supersonic winds, ice giant Neptune is the eighth and most distant planet in our solar system.',
  },
]

const backgroundImage =
  'https://assets.ccbp.in/frontend/react-js/planets-app/planets-bg-img.png'

describe(':::RJSCP4DA5Y_TEST_SUITE_1:::Planets App tests', () => {
  it(':::RJSCP4DA5Y_TEST_1:::Page should consist of an HTML container element with testid as "planets":::5:::', () => {
    render(<App />)
    expect(screen.getByTestId('planets')).toBeInTheDocument()
  })

  it(':::RJSCP4DA5Y_TEST_2:::Page should consist of HTML main heading element with text content as "PLANETS":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /PLANETS/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4DA5Y_TEST_3:::Page should consist of HTML image elements with alt attribute value as "planet {planetName}" of the planet item in the "planetsList":::5:::', async () => {
    render(<App />)
    expect(
      screen.getByRole('img', {name: /planet Mercury/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4DA5Y_TEST_4:::Page should consist of HTML main heading elements with text content as value of the key "name" of the planet item in the "planetsList":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: planetsList[0].name,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4DA5Y_TEST_5:::Page should consist of HTML paragraph elements with text content as value of the key "description" of the planet item in the "planetsList":::5:::', () => {
    render(<App />)

    expect(
      screen.getAllByText(planetsList[0].description, {exact: false})[0],
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(planetsList[0].description, {exact: false})[0]
        .tagName,
    ).toBe('P')

    expect(
      screen.getAllByText(planetsList[1].description, {exact: false})[0],
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(planetsList[1].description, {exact: false})[0]
        .tagName,
    ).toBe('P')

    expect(
      screen.getAllByText(planetsList[2].description, {exact: false})[0],
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(planetsList[2].description, {exact: false})[0]
        .tagName,
    ).toBe('P')

    expect(
      screen.getAllByText(planetsList[3].description, {exact: false})[0],
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(planetsList[3].description, {exact: false})[0]
        .tagName,
    ).toBe('P')

    expect(
      screen.getAllByText(planetsList[4].description, {exact: false})[0],
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(planetsList[4].description, {exact: false})[0]
        .tagName,
    ).toBe('P')

    expect(
      screen.getAllByText(planetsList[5].description, {exact: false})[0],
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(planetsList[5].description, {exact: false})[0]
        .tagName,
    ).toBe('P')

    expect(
      screen.getAllByText(planetsList[6].description, {exact: false})[0],
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(planetsList[6].description, {exact: false})[0]
        .tagName,
    ).toBe('P')

    expect(
      screen.getAllByText(planetsList[7].description, {exact: false})[0],
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(planetsList[7].description, {exact: false})[0]
        .tagName,
    ).toBe('P')
  })

  it(':::RJSCP4DA5Y_TEST_6:::The "PlanetsSlider" component should be rendered by using Slider component:::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {
        name: /previous/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /Next/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4DA5Y_TEST_7:::When the next arrow button is clicked, then the page should consist of HTML image element with alt attribute value as "planet {planetName}" of the next planet item in the "planetsList":::5:::', () => {
    render(<App />)

    expect(
      screen.getByRole('img', {name: /planet mercury/i, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', {name: /planet mercury/i, exact: false}).src,
    ).toBe(planetsList[0].imageUrl)

    userEvent.click(
      screen.getByRole('button', {
        name: /Next/i,
        exact: false,
      }),
    )

    expect(
      screen.getByRole('img', {name: /planet venus/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4DA5Y_TEST_8:::When the next arrow button is clicked, then the page should consist of HTML main heading element with text content as value of the key "name" of the next planet item in the "planetsList":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: planetsList[0].name,
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('button', {
        name: /Next/i,
        exact: false,
      }),
    )

    expect(
      screen.getByRole('heading', {
        name: planetsList[1].name,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4DA5Y_TEST_9:::When the next arrow button is clicked, then the page should consist of HTML paragraph element with text content as value of the key "description" of the next planet item in the "planetsList":::5:::', () => {
    render(<App />)
    expect(
      screen.getAllByText(planetsList[0].description, {exact: false})[0],
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(planetsList[0].description, {exact: false})[0]
        .tagName,
    ).toBe('P')

    userEvent.click(
      screen.getByRole('button', {
        name: /Next/i,
        exact: false,
      }),
    )

    expect(
      screen.getAllByText(planetsList[1].description, {exact: false})[0],
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(planetsList[1].description, {exact: false})[0]
        .tagName,
    ).toBe('P')
  })

  it(':::RJSCP4DA5Y_TEST_10:::When the previous arrow button is clicked, then the page should consist of HTML image element with alt attribute value as "planet {planetName}" and src value as "imageUrl" of the previous planet item in the "planetsList":::5:::', () => {
    render(<App />)

    expect(
      screen.getByRole('img', {name: /planet Mercury/i, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', {name: /planet Mercury/i, exact: false}).src,
    ).toBe(planetsList[0].imageUrl)

    userEvent.click(
      screen.getByRole('button', {
        name: /previous/i,
        exact: false,
      }),
    )

    expect(
      screen.getByRole('img', {name: /planet Neptune/i, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', {name: /planet Neptune/i, exact: false}).src,
    ).toBe(planetsList[7].imageUrl)
  })

  it(':::RJSCP4DA5Y_TEST_11:::When the previous arrow button is clicked, then the page should consist of HTML main heading element with text content as value of the key "name" of the previous planet item in the "planetsList":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: planetsList[0].name,
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('button', {
        name: /previous/i,
        exact: false,
      }),
    )

    expect(
      screen.getByRole('heading', {
        name: planetsList[7].name,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP4DA5Y_TEST_12:::When the previous arrow button is clicked, then the page should consist of HTML paragraph element with text content as value of the key "description" of the previous planet item in the "planetsList":::5:::', () => {
    render(<App />)
    expect(
      screen.getAllByText(planetsList[0].description, {exact: false})[0],
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(planetsList[0].description, {exact: false})[0]
        .tagName,
    ).toBe('P')

    userEvent.click(
      screen.getByRole('button', {
        name: /Previous/i,
        exact: false,
      }),
    )

    expect(
      screen.getAllByText(planetsList[7].description, {exact: false})[0],
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(planetsList[7].description, {exact: false})[0]
        .tagName,
    ).toBe('P')
  })

  it(':::RJSCP4DA5Y_TEST_13:::Page should consist of HTML image elements with src value as "imageUrl" of the planet item in the "planetsList":::5:::', async () => {
    render(<App />)

    expect(
      screen.getByRole('img', {name: /planet Mercury/i, exact: false}).src,
    ).toBe(planetsList[0].imageUrl)
  })

  it(':::RJSCP4DA5Y_TEST_14:::When the next arrow button is clicked, then the page should consist of HTML image element with src value as "imageUrl" of the next planet item in the "planetsList":::5:::', () => {
    render(<App />)

    expect(
      screen.getByRole('img', {name: /planet mercury/i, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', {name: /planet mercury/i, exact: false}).src,
    ).toBe(planetsList[0].imageUrl)

    userEvent.click(
      screen.getByRole('button', {
        name: /Next/i,
        exact: false,
      }),
    )

    expect(
      screen.getByRole('img', {name: /planet venus/i, exact: false}).src,
    ).toBe(planetsList[1].imageUrl)
  })
})
