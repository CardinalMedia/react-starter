import React, { Component }   from "react"
import { connect }            from "react-redux"
import { push }               from "react-router-redux"
import { bindActionCreators } from "redux"
import * as axios             from "axios"

import Card from '../components/Card'

const config = require("../config.json")

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      data: [],
      err: null
    }
  }

  componentWillMount () {
    axios.get(`${config.restUrl}/holiday-2017?per_page=100`)
      .then(({ data }) => {
        this.setState(prev => {
          return Object.assign({}, prev, {
            loading: false,
            data: data,
          })
        })
      })
      .catch((err) => {
        console.log(err.message)
        this.setState(() => {
          return { err }
        })
      })
    this.setState(prev => {
      return Object.assign({}, prev, {
        loading: true
      })
    })
  }

  html(__html){
    return { __html }
  }

  render() {
    const {
      loading,
      err,
      data
    } = this.state

    const {
      goTo
    } = this.props

    if(err){
      return (
        <div>{err.message}</div>
      )
    } else if(loading){
      return (
        <div>Loading</div>
      )
    } else {
      let i = 0
      return (
        <div className="Home row">
          { data.map(post => {
            const {
              id
            } = post
            i++
            return (
              <div className="col-sm-4" key={`${id}-${i}`}>
                <Card post={post} goTo={goTo} />
              </div>
            )
          })}
        </div>
      )
    }

  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  goTo: path => push(path)
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Home)
