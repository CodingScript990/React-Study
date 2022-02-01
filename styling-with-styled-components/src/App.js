import styled, { ThemeProvider } from "styled-components";
import Button from "./components/Button";

// Components style
// const Circle = styled.div`
//   width: 20rem;
//   height: 20rem;
//   background: ${(props) => props.color};
//   border-radius: 50%;
//   ${(props) =>
//     props.huge &&
//     css`
//       width: 10rem;
//       height: 10rem;
//     `}
// `;

// button size
const AppBlock = styled.div`
  width: 512px;
  margin: 0 auto;
  margin-top: 4rem;
  border: 1px solid #000;
  padding: 1rem;
`;

// button group
const ButtonGroup = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

// color
const palette = {
  blue: "#228be6",
  gray: "#6F6F6F",
  pink: "#f06595",
};

// size
const size = {
  large: "3",
  medium: "2.25",
  small: "1.75",
};

function App() {
  return (
    <ThemeProvider theme={{ palette, size }}>
      <AppBlock>
        <ButtonGroup>
          <Button size="large">Button</Button>
          <Button color="gray">Button</Button>
          <Button color="pink" size="small">
            Button
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button size="large" outline>
            Button
          </Button>
          <Button color="gray" outline>
            Button
          </Button>
          <Button color="pink" size="small" outline>
            Button
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button size="large" fullWidth>
            Button
          </Button>
          <Button color="gray" size="large" fullWidth>
            Button
          </Button>
          <Button color="pink" size="large" fullWidth>
            Button
          </Button>
        </ButtonGroup>
      </AppBlock>
    </ThemeProvider>
  );
}

export default App;
