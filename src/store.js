import { createStore, applyMiddleware, compose } from "redux"
import { routerMiddleware }                      from "react-router-redux"
import thunk                                     from "redux-thunk"
import logger                                    from "redux-logger"
import createHistory                             from "history/createBrowserHistory"
import rootReducer                               from "./reducers"

export const history = createHistory()

const initialState = {}

const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history)
]

if(process.env.NODE_ENV === 'development'){
  const devToolsExtension = window.devToolsExtension
  if(typeof devToolsExtension === 'function'){
    enhancers.push(devToolsExtension)
  }

  middleware.push(logger)
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store
