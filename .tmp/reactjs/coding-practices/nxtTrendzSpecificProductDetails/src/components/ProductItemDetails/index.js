// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {
  AiFillStar,
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
} from 'react-icons/ai'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    itemDetails: [],
    similarProducts: [],
    quantity: 1,
    apiState: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getItemDetails()
  }

  getItemDetails = async () => {
    this.setState({apiState: apiStatusConstant.inProgress})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        similarProducts: data.similar_products,
        style: data.style,
        title: data.title,
        totalReviews: data.total_reviews,
      }
      const similarProducts = data.similar_products.map(each => ({
        availability: each.availability,
        brand: each.brand,
        description: each.description,
        id: each.id,
        imageUrl: each.image_url,
        price: each.price,
        rating: each.rating,
        style: each.style,
        title: each.title,
        totalReviews: each.total_reviews,
      }))
      console.log(similarProducts)

      this.setState({
        itemDetails: updatedData,
        similarProducts,
        apiState: apiStatusConstant.success,
      })
    } else {
      this.setState({apiState: apiStatusConstant.failure})
    }
  }

  onIncrease = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  onDecrease = () => {
    const {quantity} = this.state

    if (quantity > 1) {
      this.setState(prevState => ({
        quantity: prevState.quantity - 1,
      }))
    }
  }

  renderSuccessView = () => {
    const {itemDetails, similarProducts} = this.state
    const {
      availability,
      brand,
      description,
      id,
      imageUrl,
      price,

      style,
      rating,
      title,
      totalReviews,
    } = itemDetails
    const {quantity} = this.state

    return (
      <div>
        <div className="main-component">
          <div className="item-container">
            <div className="image-container">
              <img src={imageUrl} className="each-image" alt="product" />
            </div>
            <div className="content-container">
              <h1 className="title-heading">{title}</h1>
              <p className="price">Rs {price}/-</p>
              <div className="rating-reviews">
                <div className="rating">
                  <AiFillStar className="rating-icon" />
                  <p className="rating-text">{rating}</p>
                </div>
                <p className="review-text">{totalReviews} reviews</p>
              </div>
              <p className="description">{description}</p>
              <p>
                <span className="span-ele">Availability: </span>
                {availability}
              </p>
              <p>
                <span className="span-ele">Brand: </span>
                {brand}
              </p>
              <hr />
              <div className="quantity-container">
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={this.onDecrease}
                  testid="minus"
                >
                  <BsDashSquare className="quantity-icon" />
                </button>
                <p className="quantity">{quantity}</p>
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={this.onIncrease}
                  testid="plus"
                >
                  <BsPlusSquare className="quantity-icon" />
                </button>
              </div>
              <button type="button" className="cart-btn">
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <h1 className="sp-heading">Similar Products</h1>
        <ul className="unordered-list">
          {similarProducts.map(each => this.similarProduct(each))}
        </ul>
      </div>
    )
  }

  similarProduct = each => {
    const {
      brand,
      description,
      id,
      imageUrl,
      price,
      style,
      rating,
      title,
      totalReviews,
    } = each
    return (
      <li key={id} className="list-item">
        <div>
          <img
            src={imageUrl}
            className="similar-image"
            alt={`similar product ${title}`}
          />
        </div>
        <div>
          <p className="title">{title}</p>
          <p className="review-text">{brand}</p>
        </div>
        <div className="flex">
          <p className="price">Rs {price}/-</p>
          <div className="rating">
            <p className="rating-text">{rating}</p>
            <AiFillStar />
          </div>
        </div>
      </li>
    )
  }

  renderFailureView = () => (
    <div className="div-center">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="error"
      />
      <h1>Product not found</h1>
      <Link to="/products">
        <button type="button">continue shopping</button>
      </Link>
    </div>
  )

  renderLoaderView = () => (
    <div testid="loader" className="div-center">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderViews = () => {
    const {apiState} = this.state

    switch (apiState) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderViews()}
      </div>
    )
  }
}

export default ProductItemDetails
