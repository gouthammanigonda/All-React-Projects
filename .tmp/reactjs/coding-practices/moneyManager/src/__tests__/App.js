import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const balancePic =
  'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png'

const incomePic =
  'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png'

const expensesPic =
  'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png'

const deletePic =
  'https://assets.ccbp.in/frontend/react-js/money-manager/delete.png'

jest.mock('uuid', () => {
  let counter = 0
  const uuidGen = () => {
    counter += 1
    return `uuid_${counter}`
  }
  const reset = () => {
    counter = 0
  }
  return {v4: uuidGen, reset}
})

const uuid = require('uuid')

const originalConsoleError = console.error

describe(':::RJSCPIK4G2_TEST_SUITE_1:::Money Manager tests', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks()
    uuid.reset()
  })

  afterEach(() => {
    console.error = originalConsoleError
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
  it(':::RJSCPIK4G2_TEST_1:::When a transaction is added, then the page should consist of at least one HTML list item and the transactionsList should be rendered using a unique key as a prop for each transaction item:::5:::', () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }

    render(<App />)
    userEvent.type(
      screen.getByRole('textbox', {name: /TITLE/i, exact: false}),
      'Salary',
    )
    userEvent.type(
      screen.getByRole('textbox', {name: /AMOUNT/i, exact: false}),
      '50000',
    )
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      transactionTypeOptions[0].displayText,
    )
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCPIK4G2_TEST_2:::Page should initially consist of HTML paragraph element with text content starting with "Welcome back to your":::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getByText(/Welcome back to your/i, {
      exact: false,
    })

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPIK4G2_TEST_3:::Page should initially consist of HTML image element with alt attribute value as "balance" and src attribute value as URL for balance image:::5:::', () => {
    render(<App />)
    const imageEl = screen.getByRole('img', {name: /balance/i, exact: false})

    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(balancePic)
  })

  it(':::RJSCPIK4G2_TEST_4:::Page should consist of HTML paragraph element with text content as "Your Balance":::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getByText(/Your Balance/i, {exact: false})

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPIK4G2_TEST_5:::Page should initially consist of an HTML paragraph element with testid attribute value as "balanceAmount" and text content as "0":::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getByTestId('balanceAmount')

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    expect(paragraphEl.textContent).toMatch(/0/)
  })

  it(':::RJSCPIK4G2_TEST_6:::Page should initially consist of HTML image element with alt attribute value as "income" and src attribute value as URL for income image:::5:::', () => {
    render(<App />)
    const imageEl = screen.getByRole('img', {name: /income/i, exact: false})

    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(incomePic)
  })

  it(':::RJSCPIK4G2_TEST_7:::Page should consist of HTML paragraph element with text content as "Your Income":::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getByText(/Your Income/i, {exact: false})

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPIK4G2_TEST_8:::Page should initially consist of an HTML paragraph element with testid attribute value as "incomeAmount" and text content as "0":::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getByTestId('incomeAmount')

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    expect(paragraphEl.textContent).toMatch(/0/)
  })

  it(':::RJSCPIK4G2_TEST_9:::Page should initially consist of HTML image element with alt attribute value as "expenses" and src attribute value as URL for expenses image:::5:::', () => {
    render(<App />)
    const imageEl = screen.getByRole('img', {name: /expenses/i, exact: false})

    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(expensesPic)
  })

  it(':::RJSCPIK4G2_TEST_10:::Page should consist of HTML paragraph element with text content as "Your Expenses":::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getByText(/Your Expenses/i, {exact: false})

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPIK4G2_TEST_11:::Page should initially consist of an HTML paragraph element with testid attribute value as "expensesAmount" and text content as "0":::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getByTestId('expensesAmount')

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    expect(paragraphEl.textContent).toMatch(/0/)
  })

  it(':::RJSCPIK4G2_TEST_12:::Page should consist of HTML heading element with text content as "Add Transaction":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {name: /Add Transaction/i}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPIK4G2_TEST_13:::Page should consist of HTML input element with label text as "TITLE":::5:::', () => {
    render(<App />)
    const inputEl = screen.getByRole('textbox', {name: /TITLE/i, exact: false})

    expect(inputEl).toBeInTheDocument()
    expect(inputEl.tagName).toBe('INPUT')
  })

  it(':::RJSCPIK4G2_TEST_14:::Page should consist of HTML input element with label text as "AMOUNT":::5:::', () => {
    render(<App />)
    const inputEl = screen.getByRole('textbox', {name: /AMOUNT/i, exact: false})

    expect(inputEl).toBeInTheDocument()
    expect(inputEl.tagName).toBe('INPUT')
  })

  it(':::RJSCPIK4G2_TEST_15:::Page should consist of HTML select element with label text as "TYPE":::5:::', () => {
    render(<App />)
    const selectEl = screen.getByRole('combobox')

    expect(selectEl).toBeInTheDocument()
    expect(selectEl.tagName).toBe('SELECT')
  })

  it(':::RJSCPIK4G2_TEST_16:::Page should consist of HTML option element with text content as the value of the key "displayText" of the first object in transactionTypeOptions provided:::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('option', {
        name: transactionTypeOptions[0].displayText,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPIK4G2_TEST_17:::Page should consist of HTML option element with text content as the value of the key "displayText" of the second object in transactionTypeOptions provided:::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('option', {
        name: transactionTypeOptions[1].displayText,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPIK4G2_TEST_18:::Page should consist of HTML option elements with value attribute as the value of the keys "optionId" in transactionTypeOptions provided:::5:::', () => {
    render(<App />)
    const firstOption = screen.getByRole('option', {
      name: transactionTypeOptions[0].displayText,
      exact: false,
    })
    const secondOption = screen.getByRole('option', {
      name: transactionTypeOptions[1].displayText,
      exact: false,
    })

    expect(firstOption.value).toBe(transactionTypeOptions[0].optionId)
    expect(secondOption.value).toBe(transactionTypeOptions[1].optionId)
  })

  it(':::RJSCPIK4G2_TEST_19:::Page should consist of HTML select element which contains "Income" and "Expenses" as options:::5:::', () => {
    render(<App />)
    const incomeOption = screen.getByRole('option', {
      name: /Income/i,
      exact: false,
    })
    const expensesOption = screen.getByRole('option', {
      name: /Expenses/i,
      exact: false,
    })

    expect(incomeOption).toBeInTheDocument()
    expect(expensesOption).toBeInTheDocument()
  })

  it(':::RJSCPIK4G2_TEST_20:::Page should consist of HTML button element with text content as "Add":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {name: /Add/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPIK4G2_TEST_21:::Page should consist of HTML heading element with text content as "History":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {name: /History/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPIK4G2_TEST_22:::Page should consist of HTML paragraph element with text content as "Title":::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getByText(/Title/i, {ignore: 'label'})

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPIK4G2_TEST_23:::Page should consist of HTML paragraph element with text content as "Amount":::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getByText(/Amount/i, {ignore: 'label'})

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPIK4G2_TEST_24:::Page should consist of HTML paragraph element with text content as "Type":::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getByText(/Type/i, {ignore: 'label'})

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPIK4G2_TEST_25:::When non-empty values are provided in the HTML input elements, selected type and Add button is clicked, an HTML list item should be added to the transactions list with a unique id imported from the uuid package:::5:::', () => {
    const spy = jest.spyOn(uuid, 'v4')
    render(<App />)
    const titleField = screen.getByRole('textbox', {
      name: /TITLE/i,
      exact: false,
    })
    const amountField = screen.getByRole('textbox', {
      name: /AMOUNT/i,
      exact: false,
    })
    const addButton = screen.getByRole('button', {
      name: /Add/i,
      exact: false,
    })
    userEvent.type(titleField, 'Salary')
    userEvent.type(amountField, '25000')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      transactionTypeOptions[0].displayText,
    )
    userEvent.click(addButton)
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCPIK4G2_TEST_26:::When a transaction is added, then the HTML input element for title should be empty:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByRole('textbox', {name: /TITLE/i, exact: false}),
      'Salary',
    )
    userEvent.type(
      screen.getByRole('textbox', {name: /AMOUNT/i, exact: false}),
      '50000',
    )
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      transactionTypeOptions[0].displayText,
    )
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))
    expect(
      screen.getByRole('textbox', {name: /TITLE/i, exact: false}).value,
    ).toBe('')
  })

  it(':::RJSCPIK4G2_TEST_27:::When a transaction is added, then the HTML input element for amount should be empty:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByRole('textbox', {name: /TITLE/i, exact: false}),
      'Salary',
    )
    userEvent.type(
      screen.getByRole('textbox', {name: /AMOUNT/i, exact: false}),
      '50000',
    )
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      transactionTypeOptions[0].displayText,
    )
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))
    expect(
      screen.getByRole('textbox', {name: /AMOUNT/i, exact: false}).value,
    ).toBe('')
  })

  it(':::RJSCPIK4G2_TEST_28:::When a transaction is added with "Income" as the type, the balance amount should be displayed accordingly:::5:::', () => {
    render(<App />)
    const titleField = screen.getByRole('textbox', {
      name: /TITLE/i,
      exact: false,
    })
    const amountField = screen.getByRole('textbox', {
      name: /AMOUNT/i,
      exact: false,
    })
    const addButton = screen.getByRole('button', {
      name: /Add/i,
      exact: false,
    })
    userEvent.type(titleField, 'Salary')
    userEvent.type(amountField, '25000')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      transactionTypeOptions[0].displayText,
    )
    userEvent.click(addButton)
    expect(screen.getByTestId('balanceAmount').textContent).toMatch(/25000/)
  })

  it(':::RJSCPIK4G2_TEST_29:::When a transaction is added with "Income" as the type, the income amount should be displayed accordingly:::5:::', () => {
    render(<App />)
    const titleField = screen.getByRole('textbox', {
      name: /TITLE/i,
      exact: false,
    })
    const amountField = screen.getByRole('textbox', {
      name: /AMOUNT/i,
      exact: false,
    })
    const addButton = screen.getByRole('button', {
      name: /Add/i,
      exact: false,
    })
    userEvent.type(titleField, 'Salary')
    userEvent.type(amountField, '25000')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      transactionTypeOptions[0].displayText,
    )
    userEvent.click(addButton)
    expect(screen.getByTestId('incomeAmount').textContent).toMatch(/25000/)
  })

  it(':::RJSCPIK4G2_TEST_30:::When a transaction is added with "Income" as the type, the expenses amount should remain the same:::5:::', () => {
    render(<App />)
    const titleField = screen.getByRole('textbox', {
      name: /TITLE/i,
      exact: false,
    })
    const amountField = screen.getByRole('textbox', {
      name: /AMOUNT/i,
      exact: false,
    })
    const addButton = screen.getByRole('button', {
      name: /Add/i,
      exact: false,
    })
    userEvent.type(titleField, 'Salary')
    userEvent.type(amountField, '25000')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      transactionTypeOptions[0].displayText,
    )
    userEvent.click(addButton)
    expect(screen.getByTestId('expensesAmount').textContent).toMatch(/0/)
  })

  it(':::RJSCPIK4G2_TEST_31:::When transactions are added with "Income" and "Expenses" as types, the balance amount, income amount and expenses amount should be displayed accordingly:::5:::', () => {
    render(<App />)
    const titleField = screen.getByRole('textbox', {
      name: /TITLE/i,
      exact: false,
    })
    const amountField = screen.getByRole('textbox', {
      name: /AMOUNT/i,
      exact: false,
    })
    const addButton = screen.getByRole('button', {
      name: /Add/i,
      exact: false,
    })

    userEvent.type(titleField, 'Salary')
    userEvent.type(amountField, '25000')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      transactionTypeOptions[0].displayText,
    )
    userEvent.click(addButton)

    userEvent.type(titleField, 'Car Loan')
    userEvent.type(amountField, '10000')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      transactionTypeOptions[1].displayText,
    )
    userEvent.click(addButton)

    expect(screen.getByTestId('expensesAmount').textContent).toMatch(/10000/)
    expect(screen.getByTestId('balanceAmount').textContent).toMatch(/15000/)
    expect(screen.getByTestId('incomeAmount').textContent).toMatch(/25000/)
  })

  it(':::RJSCPIK4G2_TEST_32:::When a transaction is added, then the page should consist of an HTML unordered list element to display the list of transactions:::5:::', () => {
    render(<App />)
    const titleField = screen.getByRole('textbox', {
      name: /TITLE/i,
      exact: false,
    })
    const amountField = screen.getByRole('textbox', {
      name: /AMOUNT/i,
      exact: false,
    })
    const addButton = screen.getByRole('button', {
      name: /Add/i,
      exact: false,
    })
    userEvent.type(titleField, 'Salary')
    userEvent.type(amountField, '50000')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      transactionTypeOptions[0].displayText,
    )
    userEvent.click(addButton)
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByRole('list').tagName).toBe('UL')
  })

  it(':::RJSCPIK4G2_TEST_33:::When a non-empty value is provided in the HTML input element for title, the value provided should be updated in the value of the input element:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByRole('textbox', {name: /TITLE/i, exact: false}),
      'Salary',
    )
    expect(
      screen.getByRole('textbox', {name: /TITLE/i, exact: false}).value,
    ).toBe('Salary')
  })

  it(':::RJSCPIK4G2_TEST_34:::When a non-empty value is provided in the HTML input element for amount, the value provided should be updated in the value of the input element:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByRole('textbox', {name: /AMOUNT/i, exact: false}),
      '50000',
    )
    expect(
      screen.getByRole('textbox', {name: /AMOUNT/i, exact: false}).value,
    ).toBe('50000')
  })

  it(':::RJSCPIK4G2_TEST_35:::When a value is selected in the HTML select element for type, the value provided should be updated in the value of the select element:::5:::', () => {
    render(<App />)
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      transactionTypeOptions[0].optionId,
    )
    expect(screen.getByRole('combobox').value).toBe(
      transactionTypeOptions[0].optionId,
    )
  })

  it(':::RJSCPIK4G2_TEST_36:::When a transaction is added, then it should be added to the list of transactions:::5:::', () => {
    render(<App />)
    const titleField = screen.getByRole('textbox', {
      name: /TITLE/i,
      exact: false,
    })
    const amountField = screen.getByRole('textbox', {
      name: /AMOUNT/i,
      exact: false,
    })
    const addButton = screen.getByRole('button', {
      name: /Add/i,
      exact: false,
    })
    userEvent.type(titleField, 'Salary')
    userEvent.type(amountField, '50000')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      transactionTypeOptions[0].displayText,
    )
    userEvent.click(addButton)

    expect(
      screen.getByText(/Salary/, {
        exact: false,
      }).tagName,
    ).toBe('P')
    expect(
      screen.getAllByText(/50000/, {
        exact: false,
      })[1].tagName,
    ).toBe('P')
    expect(
      screen.getAllByText(/Income/, {ignore: 'OPTION', exact: false})[1]
        .tagName,
    ).toBe('P')
  })

  it(':::RJSCPIK4G2_TEST_37:::Each transaction should consist of an HTML image element with alt attribute value as "delete" and src attribute value as URL for delete image:::5:::', () => {
    render(<App />)
    const titleField = screen.getByRole('textbox', {
      name: /TITLE/i,
      exact: false,
    })
    const amountField = screen.getByRole('textbox', {
      name: /AMOUNT/i,
      exact: false,
    })
    const addButton = screen.getByRole('button', {
      name: /Add/i,
      exact: false,
    })
    userEvent.type(titleField, 'Salary')
    userEvent.type(amountField, '50000')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      transactionTypeOptions[0].displayText,
    )
    userEvent.click(addButton)
    const imageEl = screen.getByRole('img', {name: /delete/i, exact: false})

    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(deletePic)
  })

  it(':::RJSCPIK4G2_TEST_38:::When a transaction is added, then the HTML select element should be selected by default value:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByRole('textbox', {name: /TITLE/i, exact: false}),
      'Salary',
    )
    userEvent.type(
      screen.getByRole('textbox', {name: /AMOUNT/i, exact: false}),
      '50000',
    )
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      transactionTypeOptions[0].displayText,
    )
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))
    expect(screen.getByRole('combobox').value).toBe(
      transactionTypeOptions[0].optionId,
    )
  })

  it(':::RJSCPIK4G2_TEST_39:::When a transaction is added, and the HTML button with testid as "delete" is clicked, the transaction item should be removed:::5:::', () => {
    render(<App />)
    userEvent.type(
      screen.getByRole('textbox', {name: /TITLE/i, exact: false}),
      'Salary',
    )
    userEvent.type(
      screen.getByRole('textbox', {name: /AMOUNT/i, exact: false}),
      '50000',
    )
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      transactionTypeOptions[1].displayText,
    )
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))
    userEvent.click(screen.getByTestId('delete'))
    expect(screen.queryByText(/^Salary/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/^50000/i)).not.toBeInTheDocument()
    expect(
      screen.queryByRole('img', {name: /delete/i, exact: false}),
    ).not.toBeInTheDocument()
  })

  it(':::RJSCPIK4G2_TEST_40:::When a single transaction is added, and the HTML button with testid as "delete" is clicked, then the Balance, Income, Expenses should be updated to their initial values:::5:::', () => {
    render(<App />)

    userEvent.type(
      screen.getByRole('textbox', {
        name: /TITLE/i,
        exact: false,
      }),
      'Salary',
    )
    userEvent.type(
      screen.getByRole('textbox', {
        name: /AMOUNT/i,
        exact: false,
      }),
      '50000',
    )
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      transactionTypeOptions[0].displayText,
    )
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))

    userEvent.click(screen.getByTestId('delete'))
    expect(screen.queryByText(/^Home Loan/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/^10000/i)).not.toBeInTheDocument()

    expect(screen.getByTestId('balanceAmount').textContent).toMatch(/0/)
    expect(screen.getByTestId('incomeAmount').textContent).toMatch(/0/)
    expect(screen.getByTestId('expensesAmount').textContent).toMatch(/0/)
  })

  it(':::RJSCPIK4G2_TEST_41:::When multiple transactions are added, and one transaction is deleted, then the Balance, Income, Expenses should be updated accordingly:::5:::', () => {
    render(<App />)
    const titleInputEl = screen.getByRole('textbox', {
      name: /TITLE/i,
      exact: false,
    })
    const amountInputEl = screen.getByRole('textbox', {
      name: /AMOUNT/i,
      exact: false,
    })
    userEvent.type(titleInputEl, 'Salary')
    userEvent.type(amountInputEl, '50000')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      transactionTypeOptions[0].displayText,
    )
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))
    userEvent.type(titleInputEl, 'Home Loan')
    userEvent.type(amountInputEl, '10000')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      transactionTypeOptions[1].displayText,
    )
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))
    userEvent.type(titleInputEl, 'Car Loan')
    userEvent.type(amountInputEl, '10000')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      transactionTypeOptions[1].displayText,
    )
    userEvent.click(screen.getByRole('button', {name: /Add/i, exact: false}))
    userEvent.click(screen.getAllByTestId('delete')[1])
    expect(screen.queryByText(/^Home Loan/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/^10000/i)).not.toBeInTheDocument()

    expect(screen.getByTestId('balanceAmount').textContent).toMatch(/40000/)
    expect(screen.getByTestId('incomeAmount').textContent).toMatch(/50000/)
    expect(screen.getByTestId('expensesAmount').textContent).toMatch(/10000/)
  })
})
