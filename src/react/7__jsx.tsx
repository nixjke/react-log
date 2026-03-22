import "react";
import { PropsWithChildren } from "react";

// 1) Во что транспилируется jsx в итоговом бандле?
export const Foo = ({
  name,
  children,
}: PropsWithChildren<{ name: string }>) => (
  <>
    {children} {name}
  </>
);

const jsx1 = <div>Hello</div>;
const jsx2 = <Foo name="foo">{jsx1}</Foo>;

//
//
//
//
//

// 2) Что произойдет при попытке нарисовать массив в jsx?
const jsx3 = <div>{[1, 2, 3, 4, 5]}</div>;

//
//
//
//
//

// 3) Можно ли использовать React как библиотеку подключив ее напрямую в документ?
// <script type="module">import React from 'https://...'</script>;

//
//
//
//
//

// 4) Какие способы/инструменты ты используешь для отладки производительности react приложении?
