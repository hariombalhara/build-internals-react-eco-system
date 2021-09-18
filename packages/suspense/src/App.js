import "./styles.css";
import * as React from "react";
import { Suspense, createResource } from "./suspense";

let resource = createResource(
  (function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("I am shown after 2 seconds");
      }, 2000);
    });
  })()
);

function TimedElement() {
  let message = resource.useRead();

  return <div>{message}</div>;
}

export default function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading....</div>}>
        <TimedElement></TimedElement>
      </Suspense>
    </div>
  );
}
