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

  const addComa = () => {
    setValue((prevState) => {
      if (prevState.indexOf(",") === -1) {
        return `${prevState},`;
      }

      return prevState;
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
      <button className="grey" onClick={clear}>
        AC
      </button>
      <button className="grey" onClick={positiveNegative}>
        +/-
      </button>
      <button className="grey" onClick={percentage}>
        %
      </button>
      <button className=" contrast" onClick={() => setOperation("divide")}>
        /
      </button>
      <button onClick={() => setNumber("7")}>7</button>
      <button onClick={() => setNumber("8")}>8</button>
      <button onClick={() => setNumber("9")}>9</button>
      <button className="contrast" onClick={() => setOperation("multiply")}>
        x
      </button>
      <button onClick={() => setNumber("4")}>4</button>
      <button onClick={() => setNumber("5")}>5</button>
      <button onClick={() => setNumber("6")}>6</button>
      <button className="contrast" onClick={() => setOperation("minus")}>
        -
      </button>
      <button onClick={() => setNumber("1")}>1</button>
      <button onClick={() => setNumber("2")}>2</button>
      <button onClick={() => setNumber("3")}>3</button>
      <button className="contrast" onClick={() => setOperation("sum")}>
        +
      </button>
      <button className="zero" onClick={() => setNumber("0")}>
        0
      </button>
      <button onClick={addComa}>,</button>
      <button className="contrast" onClick={calculate}>
        =
      </button>
    </main>
  );
}

export default App;
