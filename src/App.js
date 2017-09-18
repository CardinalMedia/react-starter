import React, { Component } from "react"
import { connect }          from "react-redux"
import { withRouter }       from "react-router"
import { Route }            from "react-router-dom"

import Home   from "./layouts/Home"
import Single from "./layouts/Single"
import Category from "./layouts/Category"
import CatNav from "./components/CatNav"

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark navbar-gg">
            <a className="navbar-brand" href="/">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              
                <CatNav />
           
            </div>
          </nav>

        </header>
        <div className="container">
            <Route path="/" exact component={Home} />
            <Route path="/category/:slug" exact component={Category} />
            <Route path="/gifts/:slug" component={Single} />
        </div>
        <footer>Page Footer</footer>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default withRouter(connect(
  mapStateToProps
)(App))
