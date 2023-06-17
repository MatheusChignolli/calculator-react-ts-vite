import { useState } from "react";
import "./App.css";

const initialValue = "0";
const initialOperation = "";

function App() {
  const [value, setValue] = useState(initialValue);
  const [operation, setOperation] = useState(initialOperation);

  const clear = () => {
    setValue(initialValue);
    setOperation(initialOperation);
  };

  const positiveNegative = () => {
    setValue((prevState) => {
      if (prevState.indexOf("-") === 0) {
        return prevState.slice(1);
      } else {
        return `-${prevState}`;
      }
    });
  };

  const percentage = () => {
    setValue((prevState) => {
      const value = parseFloat(prevState);
      return String(value / 100);
    });
  };

  const setNumber = (number: string) => {
    setValue((prevState) => {
      if (prevState === "0") {
        return number;
      } else {
        return `${prevState}${number}`;
      }
    });
  };

  const calculate = () => {
    console.log("oi");
  };

  return (
    <main>
      <div className="result">{value}</div>
      <button className="clear" onClick={clear}>
        AC
      </button>
      <button className="positive-negative" onClick={positiveNegative}>
        +/-
      </button>
      <button className="percentage" onClick={percentage}>
        %
      </button>
      <button className="divide" onClick={() => setOperation("divide")}>
        /
      </button>
      <button className="seven" onClick={() => setNumber("7")}>
        7
      </button>
      <button className="eight" onClick={() => setNumber("8")}>
        8
      </button>
      <button className="nine" onClick={() => setNumber("9")}>
        9
      </button>
      <button className="multiply" onClick={() => setOperation("multiply")}>
        x
      </button>
      <button className="four" onClick={() => setNumber("4")}>
        4
      </button>
      <button className="five" onClick={() => setNumber("5")}>
        5
      </button>
      <button className="six" onClick={() => setNumber("6")}>
        6
      </button>
      <button className="minus" onClick={() => setOperation("minus")}>
        -
      </button>
      <button className="one" onClick={() => setNumber("1")}>
        1
      </button>
      <button className="two" onClick={() => setNumber("2")}>
        2
      </button>
      <button className="three" onClick={() => setNumber("3")}>
        3
      </button>
      <button className="sum" onClick={() => setOperation("sum")}>
        +
      </button>
      <button className="zero" onClick={() => setNumber("0")}>
        0
      </button>
      <button className="coma" onClick={() => setNumber(",")}>
        ,
      </button>
      <button className="equal" onClick={calculate}>
        =
      </button>
    </main>
  );
}

export default App;
