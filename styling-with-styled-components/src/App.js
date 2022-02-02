import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Button from "./components/Button";
import Dialog from "./components/Dialog";

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
  // useState
  const [dialog, setDialog] = useState(false);
  // event click
  const onClick = () => {
    setDialog(true);
  };
  // confirm
  const onConfirm = () => {
    console.log("agree");
    setDialog(false);
  };
  // cancel
  const onCancel = () => {
    console.log("cancel");
    setDialog(false);
  };
  return (
    <ThemeProvider theme={{ palette, size }}>
      <>
        <AppBlock>
          <Button color="pink" size="large" onClick={onClick}>
            Delete
          </Button>
        </AppBlock>
        <Dialog
          title="정말로 삭제하시겠습니까?"
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={onConfirm}
          onCancel={onCancel}
          visible={dialog}
        >
          Data를 정말로 Delete 하시겠습니까?
        </Dialog>
      </>
    </ThemeProvider>
  );
}

export default App;
