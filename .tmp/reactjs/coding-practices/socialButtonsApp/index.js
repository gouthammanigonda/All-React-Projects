const Button = (props) => {
  //  Write your code here.
  const { className, color, text } = props;
  return <button className={`button ${color}`}>{text}</button>;
};

// <Button class="button" color="like" text="Like" />
// <Button class="button" color="comment" text="Comment" />
// <Button class="button" color="share" text="Share" />

const element = (
  //  Write your code here.
  <div className="bg-container">
    <h1 className="heading">Social Buttons</h1>
    <div className="sub-container">
      <div className="sub-container2">
        <Button className="button" color="like" text="Like" />
        <Button class="button" color="comment" text="Comment" />
        <Button class="button" color="share" text="Share" />
      </div>
    </div>
  </div>
);

ReactDOM.render(element, document.getElementById("root"));
