import React, { Component } from "react"
import { connect }            from "react-redux"
import { push }               from "react-router-redux"
import { bindActionCreators } from "redux"
import * as axios           from "axios"

import Card from '../components/Card'

const config = require("../config.json")

class Single extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      data: null,
      err: null
    }
  }

  componentWillMount() {
    const { match } = this.props
    const { slug } = match.params

    this.setState(prev => {
      return Object.assign({}, prev, {
        loading: true
      })
    })

    axios.get(`${config.restUrl}/holiday-2016?slug=${slug}`)
      .then(({ data }) => {
        this.setState(prev => {
          return Object.assign({}, prev, {
            loading: false,
            data: data[0]
          })
        })
      })
      .catch((err) => {
        console.log(err.message)
        this.setState(() => {
          return { err }
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
      return (
        <div className="Single row">
          <Card post={data} goTo={goTo} key={data.id} />
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
)(Single)
