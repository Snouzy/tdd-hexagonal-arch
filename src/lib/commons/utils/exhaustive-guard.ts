// ensure that all possible values of a type are handled
export const exhaustiveGuard = (value: never): never => {
  throw new Error(`Exhaustive guard error : received value: ${value}`);
};
