import { useState } from "react";
import PropTypes from "prop-types";
import "./App.css";

const CalculatorHeading = () => {
  return (
    <div>
      <h1>Kalculator Application</h1>
    </div>
  );
};

const CalculatorScreen = (props) => {
  return (
    <div className="calculator-screen">
      <input type="text" id="calculatorInput" readOnly value={props.value} />
    </div>
  );
};

CalculatorScreen.propTypes = {
  value: PropTypes.string.isRequired,
};

// Define a functional component named OutputScreen that takes 'props' as its argument.
const OutputScreen = (props) => {
  // Return JSX representing the OutputScreen component.
  return (
    <div className="screen">
      {/* Display the question value using the CalculatorScreen component. */}
      <CalculatorScreen value={props.question} />
      {/* Display the answer value using the CalculatorScreen component. */}
      <CalculatorScreen value={props.answer} />
    </div>
  );
};

// Define propTypes for the OutputScreen component to specify the expected types and requirements of its props.
OutputScreen.propTypes = {
  // Ensure that 'question' prop is provided and is of type string. It is marked as required.
  question: PropTypes.string.isRequired,
  // Ensure that 'answer' prop is provided and is of type string. It is marked as required.
  answer: PropTypes.string.isRequired,
};

// Define a functional component named CalculatorButtons that takes an object with 'handleClick' property as its argument.
const CalculatorButtons = ({ handleClick }) => {
  // Return JSX representing the CalculatorButtons component.
  return (
    <div>
      {/* Buttons for digits 7, 8, and 9, as well as the division operator. */}
      <button className="button-7" onClick={handleClick} value="7">
        7
      </button>
      <button className="button-8" onClick={handleClick} value="8">
        8
      </button>
      <button className="button-9" onClick={handleClick} value="9">
        9
      </button>
      <button className="divide-button" onClick={handleClick} value="/">
        ÷
      </button>
      <br></br>
      <br></br>
      {/* Buttons for digits 4, 5, and 6, as well as the multiplication operator. */}
      <button className="button-4" onClick={handleClick} value="4">
        4
      </button>
      <button className="button-5" onClick={handleClick} value="5">
        5
      </button>
      <button className="button-6" onClick={handleClick} value="6">
        6
      </button>
      <button className="times-button" onClick={handleClick} value="*">
        x
      </button>
      <br></br>
      <br></br>
      {/* Buttons for digits 1, 2, and 3, as well as the subtraction operator. */}
      <button className="button-1" onClick={handleClick} value="1">
        1
      </button>
      <button className="button-2" onClick={handleClick} value="2">
        2
      </button>
      <button className="button-3" onClick={handleClick} value="3">
        3
      </button>
      <button className="minus-button" onClick={handleClick} value="-">
        -
      </button>
      <br></br>
      <br></br>
      {/* Buttons for digit 0, decimal point, equals sign, and addition operator. */}
      <button className="zero-button" onClick={handleClick} value="0">
        0
      </button>
      <button className="dot-button" onClick={handleClick} value=".">
        .
      </button>
      <button className="equals-button" onClick={handleClick} value="=">
        =
      </button>
      <button className="add-button" onClick={handleClick} value="+">
        +
      </button>
    </div>
  );
};

// Define propTypes for the CalculatorButtons component to specify the expected type and requirement of the 'handleClick' prop.
CalculatorButtons.propTypes = {
  // Ensure that 'handleClick' prop is provided and is of type function. It is marked as required.
  handleClick: PropTypes.func.isRequired,
};

const CalculatorApp = () => {
  const [state, setState] = useState({ question: "", answer: "" });

  const handleClick = (event) => {
    // Extract the value of the clicked button
    const value = event.target.value;

    // Switch statement to handle different button clicks
    switch (value) {
      case "=": {
        // Check if there's a question to evaluate
        if (state.question !== "") {
          try {
            // Evaluate the expression and update the state with the result
            const ans = eval(state.question);
            if (ans === undefined) {
              // Handle undefined result (e.g., division by zero)
              setState({ answer: "Math Error" });
            } else {
              setState({ answer: ans, question: "" });
            }
          } catch (err) {
            // Handle any errors during evaluation
            setState({ answer: "Math Error" });
          }
        }
        break;
      }

      case "c": {
        // Clear the calculator screen
        setState({ question: "", answer: "" });
        break;
      }

      default: {
        // Append the clicked value to the current question
        setState((prevState) => ({
          question: prevState.question + value,
        }));
        break;
      }
    }
  };

  return (
    <div className="main-container">
      <div className="heading-container">
        <CalculatorHeading />
      </div>
      <div className="calculator-container">
        <div className="screen-container">
          <OutputScreen question={state.question} answer={state.answer} />
          <button className="clear-button" onClick={handleClick} value="c">
            C
          </button>
        </div>
        <div className="button-container">
          <CalculatorButtons handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default CalculatorApp;
