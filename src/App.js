import React, { Component } from "react"
import { connect }          from "react-redux"
import { withRouter }       from "react-router"
import { Route }            from "react-router-dom"

import Home   from "./layouts/Home"
import Single from "./layouts/Single"

class App extends Component {
  render() {
    return (
      <div>
        <header>Page Header</header>
        <Route path="/" exact component={Home} />
        <Route path="/posts/:slug" component={Single} />
        <footer>Page Footer</footer>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default withRouter(connect(
  mapStateToProps
)(App))
