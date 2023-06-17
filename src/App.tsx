import { useState } from "react";
import "./App.css";

const initialValues = {
  old: "0",
  new: "0",
};
const initialOperation = null;

enum Operations {
  sum = "sum",
  minus = "minus",
  divide = "divide",
  multiply = "multiply",
}

function App() {
  const [values, setValues] = useState(initialValues);
  const [operation, setOperation] = useState<Operations | null>(
    initialOperation
  );

  const clear = () => {
    setValues(initialValues);
    setOperation(initialOperation);
  };

  const positiveNegative = () =>
    setValues((prevState) => ({
      ...prevState,
      new:
        prevState.new.indexOf("-") === 0
          ? prevState.new.replace("-", "")
          : `-${prevState.new}`,
    }));

  const percentage = () =>
    setValues((prevState) => ({
      ...prevState,
      new: String(parseFloat(prevState.new) / 100),
    }));

  const addDot = () => {
    if (values.new.indexOf(".") === -1) {
      setValues((prevState) => ({ ...prevState, new: `${prevState.new}.` }));
    }
  };

  const setNumber = (number: string) => {
    setValues((prevState) => {
      if (["0", "-0"].includes(prevState.new)) {
        return {
          ...prevState,
          new: prevState.new.includes("-") ? `-${number}` : number,
        };
      } else {
        return {
          ...prevState,
          new: `${prevState.new}${number}`,
        };
      }
    });
  };

  const chooseOperation = (operation: Operations) => {
    setOperation(operation);
    setValues((prevState) => ({
      new: "0",
      old: prevState.new,
    }));
  };

  const sum = (a: string, b: string) => String(parseFloat(a) + parseFloat(b));

  const minus = (a: string, b: string) => String(parseFloat(a) - parseFloat(b));

  const multiply = (a: string, b: string) =>
    String(parseFloat(a) * parseFloat(b));

  const divide = (a: string, b: string) =>
    String(parseFloat(a) / parseFloat(b));

  const operations = {
    sum,
    minus,
    multiply,
    divide,
  };

  const calculate = () => {
    if (operation) {
      setValues((prevState) => {
        return {
          old: "0",
          new: operations[operation](prevState.old, prevState.new),
        };
      });
      setOperation(initialOperation);
    }
  };

  const buttons = [
    {
      label: "AC",
      className: "grey",
      onClick: clear,
    },
    {
      label: "+/-",
      className: "grey",
      onClick: positiveNegative,
    },
    {
      label: "%",
      className: "grey",
      onClick: percentage,
    },
    {
      label: "/",
      className: "contrast",
      onClick: () => chooseOperation(Operations.divide),
    },
    {
      label: "7",
      onClick: () => setNumber("7"),
    },
    {
      label: "8",
      onClick: () => setNumber("8"),
    },
    {
      label: "9",
      onClick: () => setNumber("9"),
    },
    {
      label: "x",
      className: "contrast",
      onClick: () => chooseOperation(Operations.multiply),
    },
    {
      label: "4",
      onClick: () => setNumber("4"),
    },
    {
      label: "5",
      onClick: () => setNumber("5"),
    },
    {
      label: "6",
      onClick: () => setNumber("6"),
    },
    {
      label: "-",
      className: "contrast",
      onClick: () => chooseOperation(Operations.minus),
    },
    {
      label: "1",
      onClick: () => setNumber("1"),
    },
    {
      label: "2",
      onClick: () => setNumber("2"),
    },
    {
      label: "3",
      onClick: () => setNumber("3"),
    },
    {
      label: "+",
      className: "contrast",
      onClick: () => chooseOperation(Operations.sum),
    },
    {
      label: "0",
      className: "zero",
      onClick: () => setNumber("0"),
    },
    {
      label: ",",
      onClick: addDot,
    },
    {
      label: "=",
      className: "contrast",
      onClick: calculate,
    },
  ];

  return (
    <main>
      <div className="result">
        {typeof values.new === "string" ? values.new : "Error!"}
      </div>
      {buttons.map(({ label, ...buttonProps }, index) => (
        <button key={`button-${index}`} {...buttonProps}>
          {label}
        </button>
      ))}
    </main>
  );
}

export default App;
