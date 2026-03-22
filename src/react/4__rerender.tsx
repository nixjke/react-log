import React, { useState, useCallback } from "react";

export const Foo = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <>
      <button type="button" onClick={handleClick}>
        Click count: {count}
      </button>

      {children}

      <div>{count}</div>
    </>
  );
};

const Bar = () => {
  console.log("Render Bar");

  return (
    <article>
      <h1>Article</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
        non, dolorem corporis, placeat facere sunt dolore commodi deserunt qui
        necessitatibus consectetur quae illo perferendis accusamus error sint
        consequatur libero aliquid.
      </p>
      <a href="/backward">Go back</a>
    </article>
  );
};

// Вопросы:
// 1) Какие проблемы есть в реализации компонентов Foo и Bar?
