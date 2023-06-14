import React, { useRef, useState, useEffect } from "react";
import { Pin } from "./Pin";
import propTypes from "prop-types";

export const PinTab = ({ length, maxChar, setOtp }) => {
  const inputfocus = useRef([]);

  const [PinInputlength] = useState(new Array(length).fill("0"));

  const [pinvalue] = useState(new Array(length).fill());

  const handleChange = (e, index) => {
    pinvalue[index] = e.target.value;

    if (index < length - 1 && e.target.value.length === maxChar) {
      inputfocus.current[index + 1].focus();
    }
    setOtp(pinvalue.join(""));
  };

  const handleBackSpace = (e, index) => {
    pinvalue[index] = e.target.value;
    if (index > 0 && e.target.value.length === 0) {
      inputfocus.current[index - 1].focus();
    }
    setOtp(pinvalue.join(""));
  };

  const handlepaste = (e) => {
    const data = e.clipboardData
      .getData("text")
      .split("")
      .filter((item, ind) => ind < maxChar * length);

    let value = [];
    for (let i = 0; i < maxChar * length; i += maxChar) {
      let temp = "";
      for (let j = i; j < maxChar + i; j++) {
        temp += data[j];
      }
      value.push(temp);
    }

    value.forEach((char, index) => {
      pinvalue[index] = char;
      inputfocus.current[index].value = char;
      if (index < length - 1) {
        inputfocus.current[index + 1].focus();
      }
    });
    setOtp(pinvalue.join(""));
  };

  useEffect(() => {
    inputfocus.current[0].focus();
  }, []);

  return (
    <div
      data-testid="pin-tab"
      onPaste={handlepaste}
    >
      {
        /* Add Pin component here  */
        PinInputlength.map((ele, ind) => {
          return (
            <Pin
              key={ind}
              maxChar={maxChar}
              ref={(ele) => {
                inputfocus.current[ind] = ele;
              }}
              forChange={(e) => handleChange(e, ind)}
              forHandleBackspce={(e) => handleBackSpace(e, ind)}
            />
          );
        })
      }
    </div>
  );
};
PinTab.propTypes = {
  length: propTypes.number.isRequired,
  maxChar: propTypes.number.isRequired,
};

// Check length and maxChar props here
