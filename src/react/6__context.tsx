import React, { useState, createContext, useContext, useEffect } from "react";

const MyContext = createContext({
  first: 0,
  second: 0,
});

export const FooProvider = () => {
  const [value, setValue] = useState({
    first: 100,
    second: 200,
  });

  useEffect(() => {
    setValue((state) => ({ ...state, first: 150 }));
  }, []);

  return (
    <MyContext.Provider value={value}>
      <Bar />
      <Baz />
    </MyContext.Provider>
  );
};

export const Bar = () => {
  const { first } = useContext(MyContext);

  console.log("Bar value is", first);

  return <>{first}</>;
};

export const Baz = () => {
  const { second } = useContext(MyContext);

  console.log("Baz value is", second);

  return <>{second}</>;
};



// Вопросы:
// 1) Что мы увидем на экране и в консоли при маунте Foo? Почему?
// 2) Какую проблему решает react context?
