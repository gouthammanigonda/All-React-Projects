const Notification = (props) => {
  //  Write your code here.
  const { url, className, text } = props;
  console.log(url, className, text);
  return (
    <div className={`message-container ${className}`}>
      <img className="image" src={url} />
      <p className="message-text">{text}</p>
    </div>
  );
};

const element = (
  //  Write your code here.
  <div className="main-container">
    <h1 className="heading">Notifications</h1>
    <div className="sub-container">
      <Notification
        className="blue"
        url="https://assets.ccbp.in/frontend/react-js/primary-icon-img.png"
        text="Information Message"
      />
      <Notification
        className="green"
        url="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        text="Success Message"
      />
      <Notification
        className="yellow"
        url="https://assets.ccbp.in/frontend/react-js/warning-icon-img.png"
        text="Warning Message"
      />
      <Notification
        className="red"
        url="https://assets.ccbp.in/frontend/react-js/danger-icon-img.png"
        text="Error Message"
      />
    </div>
  </div>
);

ReactDOM.render(element, document.getElementById("root"));
