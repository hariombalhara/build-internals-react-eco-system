import React from 'react';

// A simple Single Source of Truth Library implementation
let SingleSourceOfTruth = (function() {
  let context = React.createContext();
  let Provider = context.Provider;
  return {
    useList() {
      let [cache, setCache] = React.useContext(context);
      function setList(val) {
        setCache(val);
      }

      return [cache, setList];
    },
    context,
    getStore(init) {
      // Library user would use this and provide the value to Provider
      // React re-renders every component using Context Consumer(i.e. having useContext hook usage)
      return React.useState(init);
    },
    Provider
  };
})();

function ShowListPlace1() {
  // Indirectly using useContext which would cause this component to be re-rendered when Context value changes.
  let [list] = SingleSourceOfTruth.useList();
  return (
    <div>
      {list.map(item => {
        return <div>{item}</div>;
      })}
    </div>
  );
}

function ShowListPlace2() {
  // Indirectly using useContext which would cause this component to be re-rendered when Context value changes.
  let [list, setList] = SingleSourceOfTruth.useList();
  let [items, setItems] = React.useState('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <textarea
        placeholder="Provide newline separate values"
        value={items}
        onChange={e => {
          setItems(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setList(items.split('\n'));
        }}
      >
        Update List
      </button>
      {list.map(item => {
        return <div>{item}</div>;
      })}
    </div>
  );
}

export default function App() {
  let store = SingleSourceOfTruth.getStore(['Item1', 'Item2']);
  return (
    <SingleSourceOfTruth.Provider value={store}>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <ShowListPlace1>Hello StackBlitz!</ShowListPlace1>
        <ShowListPlace2 />
      </div>
    </SingleSourceOfTruth.Provider>
  );
}
