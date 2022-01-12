import Button from "./Button";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <div className="buttons">
        <Button size="large" color="blue">
          BUTTON
        </Button>
        <Button color="gray">BUTTON</Button>
        <Button size="small" color="pink">
          BUTTON
        </Button>
      </div>
      <div className="buttons">
        <Button size="large" color="blue">
          BUTTON
        </Button>
        <Button color="gray">BUTTON</Button>
        <Button size="small" color="pink">
          BUTTON
        </Button>
      </div>
      <div className="buttons">
        <Button size="large" color="blue">
          BUTTON
        </Button>
        <Button color="gray">BUTTON</Button>
        <Button size="small" color="pink">
          BUTTON
        </Button>
      </div>
      <div className="buttons">
        <Button size="large" outline>
          BUTTON
        </Button>
        <Button color="gray" outline>
          BUTTON
        </Button>
        <Button size="small" color="pink" outline>
          BUTTON
        </Button>
      </div>
      <div className="buttons">
        <Button size="large" fullWidth className="customized-button">
          BUTTON
        </Button>
        <Button size="large" color="gray" fullWidth>
          BUTTON
        </Button>
        <Button
          size="large"
          color="pink"
          fullWidth
          onClick={() => {
            console.log("click!");
          }}
          onMouseMove={() => {
            console.log("mouseMove!");
          }}
        >
          BUTTON
        </Button>
      </div>
    </div>
  );
}

export default App;
