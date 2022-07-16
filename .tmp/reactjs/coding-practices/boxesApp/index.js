const Box = (props) => {
  //  Write your code here.
  const { className, text } = props;
  return (
    <div className={`box ${className}`}>
      <p className="text">{text}</p>
    </div>
  );
};

const element = (
  <div className="main-container">
    <h1 className="heading">Boxes</h1>
    <div className="sub-container">
      <Box className="box1" text="Small" />
      <Box className="box2" text="Medium" />
      <Box className="box3" text="Large" />
    </div>
  </div>
);

ReactDOM.render(element, document.getElementById("root"));
