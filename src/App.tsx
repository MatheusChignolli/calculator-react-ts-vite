import { useState } from "react";
import BigNumber from "bignumber.js";
import "./App.css";

BigNumber.config({ DECIMAL_PLACES: 5 });

type Values = {
  old?: string;
  new?: string;
};

enum Operations {
  sum = "sum",
  minus = "minus",
  divide = "divide",
  multiply = "multiply",
}

const initialValues = {
  old: undefined,
  new: undefined,
};

const initialOperation = null;

function App() {
  const [values, setValues] = useState<Values>(initialValues);
  const [operation, setOperation] = useState<Operations | null>(
    initialOperation
  );

  const clear = () => {
    setValues(initialValues);
    setOperation(initialOperation);
  };

  const positiveNegative = () =>
    setValues((prevState) =>
      prevState?.new
        ? {
            ...prevState,
            new:
              prevState?.new?.indexOf("-") === 0
                ? prevState.new.replace("-", "")
                : `-${prevState.new}`,
          }
        : prevState
    );

  const percentage = () => {
    if (values.new)
      setValues((prevState) =>
        prevState.new
          ? {
              ...prevState,
              new: new BigNumber(prevState.new).dividedBy(100).toString(),
            }
          : prevState
      );
  };

  const addDot = () => {
    if (values?.new?.indexOf(".") === -1) {
      setValues((prevState) => ({ ...prevState, new: `${prevState.new}.` }));
    }
  };

  const setNumber = (number: string) => {
    setValues((prevState) => {
      if (!prevState.new) {
        return {
          ...prevState,
          new: number,
        };
      }

      if (prevState.new && ["0", "-0"].includes(prevState.new)) {
        return {
          ...prevState,
          new: prevState.new.includes("-") ? `-${number}` : number,
        };
      }

      return {
        ...prevState,
        new: `${prevState.new}${number}`,
      };
    });
  };

  const chooseOperation = (operation: Operations) => {
    setOperation(operation);
    setValues((prevState) => ({
      new: undefined,
      old:
        prevState.old && prevState.new
          ? operations[operation].function(prevState.old, prevState.new)
          : prevState.old
          ? prevState.old
          : prevState.new,
    }));
  };

  const sum = (a: string, b: string) => new BigNumber(a).plus(b).toString();

  const minus = (a: string, b: string) => new BigNumber(a).minus(b).toString();

  const multiply = (a: string, b: string) =>
    new BigNumber(a).multipliedBy(b).toString();

  const divide = (a: string, b: string) =>
    new BigNumber(a).dividedBy(b).toString();

  const operations = {
    sum: {
      label: "+",
      function: sum,
    },
    minus: {
      label: "-",
      function: minus,
    },
    divide: {
      label: "/",
      function: divide,
    },
    multiply: {
      label: "x",
      function: multiply,
    },
  };

  const calculate = () => {
    if (operation && values.old && values.new) {
      setValues((prevState) =>
        prevState.old && prevState.new
          ? {
              old: undefined,
              new: operations[operation].function(prevState.old, prevState.new),
            }
          : prevState
      );
      setOperation(initialOperation);
    }
  };

  const deleteNumber = () =>
    setValues((prevState) => {
      const slicedValue = prevState.new?.slice(0, -1);

      if (slicedValue === "-") {
        return {
          ...prevState,
          new: undefined,
        };
      }

      if (
        !!slicedValue &&
        slicedValue?.indexOf(".") === slicedValue?.length - 1
      ) {
        return {
          ...prevState,
          new: slicedValue.slice(0, -1),
        };
      }

      return {
        ...prevState,
        new: slicedValue,
      };
    });

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
      label: "DEL",
      onClick: deleteNumber,
    },
    {
      label: "0",
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
        {operation && !!values.old && (
          <p>
            {values.old} {operations[operation].label}
          </p>
        )}
        {values.new}
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
