import React, { useCallback, useState } from "react";

export const Foo = () => {
  const [state, setState] = useState(1);

  console.log("render Foo", state);

  const handleClick = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);

  return <Bar onClick={handleClick} />;
};

const Bar = React.memo((props: { onClick: () => void }) => {
  const { onClick } = props;

  console.log("render Bar");

  return (
    <button type="button" onClick={onClick}>
      click me
    </button>
  );
});

// Вопросы:
// 1) Как работает useCallback и useMemo?
// 2) Есть ли проблемы связанные с мемоизацией в указанном примере?
