import React, { Suspense, useEffect, useState } from "react";
import { Foo as LogOrder1Foo } from "./react/1__log-order";
import { Foo as LogOrder2Foo } from "./react/2__log-order";
import { Foo as MemoFoo } from "./react/3__memo-callback";
import { Foo as RerenderFoo } from "./react/4__rerender";
import { Foo as KeysFoo } from "./react/5__keys";
import { FooProvider } from "./react/6__context";
import { Foo as JsxFoo } from "./react/7__jsx";

type Scenario = "menu" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

/** Запуск сценария 1: начальное value 2, затем смена на 3 после маунта. */
const Scenario1 = () => {
  const [value, setValue] = useState(2);
  useEffect(() => {
    setValue(3);
  }, []);
  return <LogOrder1Foo value={value} />;
};

/** Тот же Bar, что в 4__rerender.tsx — здесь только для корректного <Foo><Bar /></Foo>. */
const RerenderBar = () => {
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

const OPTIONS_5 = [
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
  { id: 4, value: 4 },
  { id: 5, value: 5 },
];

const Scenario5 = () => {
  const [reversed, setReversed] = useState(false);
  const list = reversed ? [...OPTIONS_5].reverse() : OPTIONS_5;

  return (
    <div>
      <button type="button" onClick={() => setReversed((r) => !r)}>
        Порядок: {reversed ? "reversed" : "исходный"}
      </button>
      <ul>
        <KeysFoo options={list} />
      </ul>
    </div>
  );
};

/** Рабочий Suspense для просмотра логов; реализация из задания — в 8__suspense.tsx (TODO). */
const Suspense8Launch = () => {
  let greeting: string | null = null;
  const ready = new Promise<void>((resolve) => {
    queueMicrotask(() => {
      greeting = "Hello World!";
      resolve();
    });
  });

  const Bar = () => {
    if (greeting === null) throw ready;
    console.log("[8] Bar после промиса");
    return <span>{greeting}</span>;
  };

  return (
    <Suspense fallback={<span>Helo World!</span>}>
      <Bar />
    </Suspense>
  );
};

const Scenario7 = () => {
  const jsx1 = <div>Hello</div>;
  const jsx2 = <JsxFoo name="foo">{jsx1}</JsxFoo>;
  const jsx3 = <div>{[1, 2, 3, 4, 5]}</div>;

  return (
    <div>
      <p>Фрагмент с вложенностью (как jsx2 в файле):</p>
      {jsx2}
      <p>Массив в JSX (как jsx3):</p>
      {jsx3}
    </div>
  );
};

const scenarios: {
  id: Scenario;
  file: string;
  title: string;
}[] = [
  { id: "1", file: "1__log-order.tsx", title: "Порядок эффектов и таймера" },
  { id: "2", file: "2__log-order.tsx", title: "Дерево Foo → Bar → Baz" },
  { id: "3", file: "3__memo-callback.tsx", title: "memo + useCallback" },
  { id: "4", file: "4__rerender.tsx", title: "Foo + children, ререндер" },
  { id: "5", file: "5__keys.tsx", title: "key в списке" },
  { id: "6", file: "6__context.tsx", title: "Context" },
  { id: "7", file: "7__jsx.tsx", title: "JSX: вложенность и массив" },
  { id: "8", file: "8__suspense.tsx", title: "Suspense (задание в файле; демо в App)" },
];

const App = () => {
  const [scenario, setScenario] = useState<Scenario>("menu");
  const active = scenarios.find((s) => s.id === scenario);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif", maxWidth: 560 }}>
      <h1 style={{ fontSize: "1.25rem", marginTop: 0 }}>Проверка логов (React 18)</h1>

      {scenario === "menu" && (
        <>
          <section
            style={{
              marginBottom: 20,
              padding: "12px 14px",
              background: "#f6f8fa",
              borderRadius: 8,
              fontSize: 14,
              lineHeight: 1.5,
              color: "#24292f",
            }}
          >
            <strong>Система разбора:</strong> сначала откройте файл в{" "}
            <code style={{ fontSize: 13 }}>src/react/</code> — там код, комментарии и вопросы. Ответьте на
            вопросы, затем нажмите тот же номер ниже и сверьте вывод в{" "}
            <strong>консоли браузера</strong> (F12 → Console). Подробнее:{" "}
            <code style={{ fontSize: 13 }}>src/react/README.md</code>.
          </section>

          <p style={{ color: "#57606a", marginBottom: 12, fontSize: 14 }}>
            Выберите сценарий (после ответа по файлу):
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {scenarios.map(({ id, file, title }) => (
              <button
                key={id}
                type="button"
                onClick={() => setScenario(id)}
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid #d0d7de",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontWeight: 600 }}>{id}.</span> {title}
                <br />
                <span style={{ fontSize: 12, color: "#656d76", fontFamily: "ui-monospace, monospace" }}>
                  src/react/{file}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
      {scenario !== "menu" && (
        <div>
          <button type="button" onClick={() => setScenario("menu")} style={{ marginBottom: 12 }}>
            ← Назад
          </button>
          {active && (
            <p
              style={{
                fontSize: 13,
                color: "#57606a",
                marginBottom: 16,
                padding: "8px 10px",
                background: "#f6f8fa",
                borderRadius: 6,
              }}
            >
              Разбор: <code style={{ fontSize: 12 }}>src/react/{active.file}</code> · проверка: консоль (F12)
            </p>
          )}
          {scenario === "1" && <Scenario1 />}
          {scenario === "2" && <LogOrder2Foo />}
          {scenario === "3" && <MemoFoo />}
          {scenario === "4" && (
            <RerenderFoo>
              <RerenderBar />
            </RerenderFoo>
          )}
          {scenario === "5" && <Scenario5 />}
          {scenario === "6" && <FooProvider />}
          {scenario === "7" && <Scenario7 />}
          {scenario === "8" && <Suspense8Launch />}
        </div>
      )}
    </div>
  );
};

export default App;
