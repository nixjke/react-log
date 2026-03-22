// @ts-nocheck

import { Suspense } from "react";

export const Foo = () => {
  return (
    <Suspense fallback="Helo World!">
      <Bar />
    </Suspense>
  );
};

const Bar = (props: { id: string; value: string }) => {
  // TODO: implement
};

// Вопросы:
// 1) Что нужно реализовать в Bar что бы Foo отрендерил "Hello World?"
// 2) Расскажи о Suspense. Для чего он используется.
// 3) Расскажи о React.lazy. Для чего он используется?
