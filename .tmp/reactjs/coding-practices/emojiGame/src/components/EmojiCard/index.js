// Write your code here.
import './index.css'

const EmojiCard = props => {
  const {each, checkEmoji} = props
  const {id, emojiName, emojiUrl} = each
  const onClickCardBtn = () => {
    checkEmoji(id)
  }

  return (
    <li className="listitem">
      <button className="cardbutton" type="button" onClick={onClickCardBtn}>
        <img className="emojiimg" src={emojiUrl} alt={emojiName} />
      </button>
    </li>
  )
}

export default EmojiCard
