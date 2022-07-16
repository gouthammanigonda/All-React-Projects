import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
  },
  {
    id: 6,
    title: 'Fix the production issue',
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
  },
]

const originalConsoleError = console.error

describe(':::RJSCP52YXK_TEST_SUITE_1:::Debugging Simple Todos tests', () => {
  afterEach(() => {
    console.error = originalConsoleError
  })
  it(':::RJSCP52YXK_TEST_1:::Page should consist of at least two HTML list items and the initialTodosList should be rendered using a unique key as a prop for each todo item:::5:::', () => {
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

  it(':::RJSCP52YXK_TEST_2:::Page should consist of HTML main heading element with text content as "Simple Todos":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {name: /Simple Todos/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP52YXK_TEST_3:::Page should initially consist of HTML paragraph elements with text content equal to the "title" in initialTodosList provided:::5:::', () => {
    render(<App />)
    const firstTitle = screen.getByText(initialTodosList[0].title, {
      exact: false,
    })
    const secondTitle = screen.getByText(initialTodosList[1].title, {
      exact: false,
    })
    const thirdTitle = screen.getByText(initialTodosList[2].title, {
      exact: false,
    })
    const fourthTitle = screen.getByText(initialTodosList[3].title, {
      exact: false,
    })
    const fifthTitle = screen.getByText(initialTodosList[4].title, {
      exact: false,
    })
    const sixthTitle = screen.getByText(initialTodosList[5].title, {
      exact: false,
    })
    const seventhTitle = screen.getByText(initialTodosList[6].title, {
      exact: false,
    })
    const eighthTitle = screen.getByText(initialTodosList[7].title, {
      exact: false,
    })

    expect(firstTitle).toBeInTheDocument()
    expect(firstTitle.tagName).toBe('P')

    expect(secondTitle).toBeInTheDocument()
    expect(secondTitle.tagName).toBe('P')

    expect(thirdTitle).toBeInTheDocument()
    expect(thirdTitle.tagName).toBe('P')

    expect(fourthTitle).toBeInTheDocument()
    expect(fourthTitle.tagName).toBe('P')

    expect(fifthTitle).toBeInTheDocument()
    expect(fifthTitle.tagName).toBe('P')

    expect(sixthTitle).toBeInTheDocument()
    expect(sixthTitle.tagName).toBe('P')

    expect(seventhTitle).toBeInTheDocument()
    expect(seventhTitle.tagName).toBe('P')

    expect(eighthTitle).toBeInTheDocument()
    expect(eighthTitle.tagName).toBe('P')
  })

  it(':::RJSCP52YXK_TEST_4:::Page should initially consist of at least eight HTML button elements with text content as "Delete":::5:::', () => {
    render(<App />)

    expect(
      screen.getAllByRole('button', {name: /Delete/i, exact: false}).length,
    ).toBeGreaterThanOrEqual(8)
  })

  it(':::RJSCP52YXK_TEST_5:::When the Delete button of a todo item is clicked, then the respective todo should be deleted:::5:::', () => {
    render(<App />)

    userEvent.click(
      screen.getAllByRole('button', {name: /Delete/i, exact: false})[1],
    )
    expect(
      screen.queryByText(initialTodosList[1].title, {exact: false}),
    ).not.toBeInTheDocument()
  })
})
