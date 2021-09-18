// A React application with hooks used in various ways to understand the Profiler better.
// Things to Observe
// 1. What are the Hook numbers and how they change ?
import React from 'react';
import './style.css';

function C1() {
  let [loading, setLoading] = React.useState(null);
  React.useEffect(() => {
    // Hook-1 - useEffect called
    // Hook-2 - loading state changed
    setLoading(true);
  });
  return <div>C1</div>;
}

function useLoading() {
  return React.useState(null);
}

function C2() {
  let [loading, setLoading] = useLoading();

  React.useEffect(() => {
    // Hook-1 - useEffect called
    // Hook-2 - loading state changed
    setLoading(true);
  });
  return <div>C2</div>;
}

function C3() {
  React.useEffect(() => {
    // Hook-1 - useEffect called
    setInterval(() => {
      // Hook-2 - loading state changed
      setTime(Date.now());
    }, 1000);
  }, []);
  let [time, setTime] = React.useState(Date.now());
  return <div>C3</div>;
}
let CounterContext = React.createContext(0);

function C4() {
  // useContext doesn't count in Hook Number
  let counter = React.useContext(CounterContext);
  let [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
  });
  return <div>C4{counter}</div>;
}

export default function App() {
  return (
    <div>
      <C1 />
      <C2 />
      <C3 />
      <CounterContext.Provider>
        <C4 />
      </CounterContext.Provider>
    </div>
  );
}
