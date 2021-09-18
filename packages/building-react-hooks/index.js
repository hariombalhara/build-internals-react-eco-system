/**
 * A very simple example to understand how useState hook might be implemented inside React.
 */
// Maintain all state Related Data here
// Caution: React doesn't expose the state globally.
let globalStates = {
  currentComponent: null,
  components: {}
};

let React = (function () {
  function setCurrentComponent(Component) {
    globalStates.currentComponent = Component;
  }

  function resetCurrentComponent() {
    //console.log('-------Resetting-------');
    globalStates.currentComponent.hooksIndex = 0;
    globalStates.currentComponent = null;
  }

  return {
    useState(initialValue) {
      let currentComponent = globalStates.currentComponent;

      // An Array to store hooks state in a sequential way in the order they are called.
      let hooks = (currentComponent.hooks = currentComponent.hooks || []);

      let hooksIndex = (currentComponent.hooksIndex =
        currentComponent.hooksIndex || 0);

      // Initial Value to be used only when useState is called for the first time.
      let state = hooks[hooksIndex] || initialValue;

      /*console.log(
          'useState Called with Index',
          hooksIndex,
          'Retrieved Value is: ',
          state
        );*/
      let setState;
      (function (myHookIndex) {
        setState = function (newVal) {
          //console.log(`Updated ${myHookIndex} with ${newVal}`);
          hooks[myHookIndex] = newVal;
        };
      })(hooksIndex);
      currentComponent.hooksIndex = currentComponent.hooksIndex + 1;
      return [state, setState];
    },
    render(Component) {
      setCurrentComponent(Component);
      let el = Component();
      el.render();
      resetCurrentComponent();
      let _click = el.click;
      el.click = function (...args) {
        setCurrentComponent(Component);
        _click.apply(el, ...args);
      };
      return el;
    }
  };
})();

function MyComponent() {
  let [state, setState] = React.useState(5);
  let [name, setName] = React.useState("hariom");
  return {
    render: () => {
      console.log({ state, name });
    },
    click: () => {
      setState(state + 1);
      setName(name + "_");
    }
  };
}

let el = React.render(MyComponent);
el.click();
el = React.render(MyComponent);
el.click();
el = React.render(MyComponent);
el.click();
el = React.render(MyComponent);
