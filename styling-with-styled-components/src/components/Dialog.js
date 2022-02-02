import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import Button from "./Button";

// keyframes [opacity]
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

// keyframes [transform]
const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(200px);
  }
`;

// dark
const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

// white
const DialogBlock = styled.div`
  width: 320px;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 2px;
  text-align: center;

  /* h3, p style */
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }

  p {
    font-size: 1.125rem;
  }

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;

  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${slideDown};
    `}
`;

// button group
const ButtonGroup = styled.div`
  margin-top: 1rem;
  display: inline-block;
`;

// Short Margin Button
const ShortMarginButton = styled(Button)`
  & + & {
    margin-left: 0.5rem;
  }
`;

// props
function Dialog({
  title,
  children,
  confirmText,
  cancelText,
  visible,
  onConfirm,
  onCancel,
}) {
  // useState
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);

  // useEffect
  useEffect(() => {
    // visible true -> false
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible); // visible synchronization[동기화]
  }, [localVisible, visible]);

  // return visible
  if (!localVisible && !animate) return null; // false isn't show button
  return (
    <DarkBackground disappear={!visible}>
      <DialogBlock disappear={!visible}>
        <h3>{title}</h3>
        <p>{children}</p>
        <ButtonGroup>
          <ShortMarginButton color="gray" onClick={onCancel}>
            {cancelText}
          </ShortMarginButton>
          <ShortMarginButton color="pink" onClick={onConfirm}>
            {confirmText}
          </ShortMarginButton>
        </ButtonGroup>
      </DialogBlock>
    </DarkBackground>
  );
}

Dialog.defaultProps = {
  cancelText: "cancel",
  confirmText: "agree",
};

export default Dialog;
