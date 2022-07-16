// Write your code here
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(each => {
        total += each.price * each.quantity
      })
      return (
        <div className="summery-container">
          <h1 className="summery-heading">
            Order Total : <span className="span-ele">Rs{` ${total}/-`}</span>
          </h1>
          <p className="summery-para">{cartList.length} items in cart</p>
          <button type="button" className="summery-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
