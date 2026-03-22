import React, { useEffect, useLayoutEffect } from "react";

export const Foo = () => {
  console.log("render Foo");

  useEffect(() => {
    console.log("effect Foo");
  }, []);

  return <Bar />;
};

export const Bar = () => {
  console.log("render Bar");

  useLayoutEffect(() => {
    console.log("effect Bar");
  }, []);

  return <Baz />;
};

export const Baz = () => {
  console.log("render Baz");

  useEffect(() => {
    console.log("effect Baz");
  }, []);

  return null;
};

// Вопрос: какая будет последовательность вызовов console.log и почему?
