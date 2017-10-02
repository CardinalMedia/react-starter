import React                 from "react"
import ReactDOM              from "react-dom"
import App                   from "./App"
import { Provider }          from "react-redux"
import { Router }            from "react-router-dom"
import registerServiceWorker from "./registerServiceWorker"
import store, { history }    from "./store"
import "./main.scss"

import ReactGA from "react-ga"

ReactGA.initialize('UA-2537210-10')

function logPageView () {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

ReactDOM.render((
  <Provider store={store}>
    <Router onUpdate={() => {
      logPageView()
      }} history={history}>
      <App/>
    </Router>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
