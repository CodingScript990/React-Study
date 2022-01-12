import React from "react";
import classNames from "classnames";
import "./Button.scss";

// size : large, medium, small
// color : blue, pink, gray

function Button({
  children,
  size,
  color,
  outline,
  fullWidth,
  className,
  ...rest
}) {
  return (
    <button
      className={classNames(
        "Button",
        size,
        color,
        {
          outline, // true 이면 값을 받아옴
          fullWidth, // true 이면 값을 받아옴
        },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

// button props

Button.defaultProps = {
  size: "medium",
  color: "blue",
};

export default Button;
/*
    yarn add classNames => 1. 동시에 여러개의 타입으로 받아 올 수 있다. 2. false, null, 0, undefined 는 무시된다.
*/
