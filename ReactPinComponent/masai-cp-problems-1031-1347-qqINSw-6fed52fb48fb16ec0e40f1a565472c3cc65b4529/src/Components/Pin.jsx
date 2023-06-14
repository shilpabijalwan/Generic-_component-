import React, { forwardRef } from "react";
import propTypes from "prop-types";
export const Pin = forwardRef(
  ({ maxChar, forChange, forHandleBackspce }, ref) => {
    const handleKeyUp = (e) => {
      if (e.keyCode === 8) {
        forHandleBackspce(e);
      } else {
        forChange(e);
      }
    };

    return (
      <input
        data-testid="pin-input"
        maxLength={maxChar}
        // onChange={forChange}
        ref={ref}
        onKeyUp={handleKeyUp}
      />
    );
  },
);

// Check maxChar prop here
Pin.propTypes = {
  maxChar: propTypes.number.isRequired,
};
