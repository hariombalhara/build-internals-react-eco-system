import * as React from "react";

let SuspenseContext = React.createContext();
export function Suspense({ fallback, children }) {
  let [state, setState] = React.useState("done");

  function suspend(promise) {
    setState("loading");
    promise.then(function () {
      setState("done");
    });
  }

  if (state === "loading") {
    return fallback;
  } else {
    return (
      <SuspenseContext.Provider value={{ suspend }}>
        {children}
      </SuspenseContext.Provider>
    );
  }
}

export function createResource(promise) {
  let data, error;
  promise.then(
    (d) => {
      data = d;
    },
    (e) => {
      error = e;
    }
  );

  return {
    useRead: function () {
      let { suspend } = React.useContext(SuspenseContext);
      if (error) {
        throw error;
      }
      if (!data) {
        suspend(promise);
      }
      return data;
    }
  };
}
