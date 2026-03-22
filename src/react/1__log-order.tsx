import { useEffect, useLayoutEffect } from "react";

export const Foo = (props: { value: number }) => {
  const { value } = props;

  console.log("a", value);

  setTimeout(() => {
    console.log("b", value);
  });

  useEffect(() => {
    console.log("c", value);
    return () => {
      console.log("d", value);
    };
  }, [value]);

  useLayoutEffect(() => {
    console.log("e", value);

    return () => {
      console.log("f", value);
    };
  }, []);

  return null;
};

// Вопрос: какая будет последовательность вызовов console.log и почему?
