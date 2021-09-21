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
      // Wrap the call to suspend in useEffect so that Suspense component doesn't update when the Suspense Child component is being rendered
      // This is avoiding this warning https://github.com/facebook/react/issues/18178
      // Though, even after this warning the component still updates properly.
      React.useEffect(function () {
        if (!data & !error) {
          suspend(promise);
        }
      });

      if (error) {
        throw error;
      }
      return data;
    }
  };
}
