import BigNumber from "bignumber.js";

BigNumber.config({ DECIMAL_PLACES: 5 });

export const initialValues = {
  old: undefined,
  new: undefined,
};

export const initialOperation = null;

const sum = (a: string, b: string) => new BigNumber(a).plus(b).toString();

const minus = (a: string, b: string) => new BigNumber(a).minus(b).toString();

const multiply = (a: string, b: string) =>
  new BigNumber(a).multipliedBy(b).toString();

const divide = (a: string, b: string) =>
  new BigNumber(a).dividedBy(b).toString();

export const operations = {
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
