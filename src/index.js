import React                 from "react"
import ReactDOM              from "react-dom"
import App                   from "./App"
import { Provider }          from "react-redux"
import { Router }            from "react-router-dom"
import registerServiceWorker from "./registerServiceWorker"
import store, { history }    from "./store"
import "./main.scss"

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
