import React, { useEffect } from "react";

const options = [
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
  { id: 4, value: 4 },
  { id: 5, value: 5 },
];

export const Foo = (props: { options: { id: number; value: number }[] }) => {
  const { options } = props;

  return (
    <>
      {options.map((option) => {
        return <Option key={option.id} {...option} />;
        //             ^^^^^^^^^
      })}
    </>
  );
};

const Option = (props: { id: number; value: number }) => {
  const { value } = props;
  console.log("render", value);

  useEffect(() => {
    console.log("effect", value);
  }, []);

  return <li>{value}</li>;
};

// Вопросы:
// 1) Что мы увидем в консоли на каждом рендере при key={idx} ?
// 1) Что мы увидем в консоли на каждом рендере при key={option.id} ?
