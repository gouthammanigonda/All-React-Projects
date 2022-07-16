import './index.css'

const FiltersGroup = props => {
  const renderCategorySession = () => {
    const {categoryOptions, changeCategoryId, activeCategoryId} = props
    return (
      <div className="category-session">
        <h1>Category</h1>
        <ul className="category-options-session">
          {categoryOptions.map(each => {
            const onClickCategoryItem = () => changeCategoryId(each.categoryId)
            const isActive =
              activeCategoryId === each.categoryId ? 'active' : ''

            return (
              <li
                className="list-item"
                key={each.categoryId}
                onClick={onClickCategoryItem}
              >
                <p className={`button1 ${isActive}`}>{each.name}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderRatingSession = () => {
    const {ratingsList, changeRatingId, activeRatingId} = props

    return (
      <div className="rating-session">
        <h1>Rating</h1>
        {ratingsList.map(each => {
          const onClickRatingBTN = () => changeRatingId(each.ratingId)
          const isActive = each.ratingId === activeRatingId ? 'active' : ''
          return (
            <li
              className="button2 rating-sub-container"
              type="button"
              key={each.ratingId}
              onClick={onClickRatingBTN}
            >
              <img
                src={each.imageUrl}
                alt={`rating ${each.ratingId}`}
                className="rating-img"
              />
              <span className={`category span-ele ${isActive}`}>&up</span>
            </li>
          )
        })}
      </div>
    )
  }

  const {changeInputText, onClickFilter} = props

  const onChangeInputElement = event => {
    changeInputText(event.target.value)
  }

  const clearFilter = () => {
    onClickFilter()
  }

  const {activeInputText} = props

  return (
    <div className="filters-group-container">
      <input
        onChange={onChangeInputElement}
        type="search"
        placeholder="search"
        className="input"
        value={activeInputText}
      />
      {renderCategorySession()}
      {renderRatingSession()}

      <div>
        <button className="button" type="button" onClick={clearFilter}>
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default FiltersGroup
