import React, { Component }   from "react"
import { connect }            from "react-redux"
import { push }               from "react-router-redux"
import { bindActionCreators } from "redux"
import * as axios             from "axios"

import Card from '../components/Card'

const config = require("../config.json")

class Category extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      data: null,
      err: null
    }
  }

  handleData(slug) {
    this.setState(prev => {
      return Object.assign({}, prev, {
        loading: true
      })
    })

    console.log(slug);
    axios.get(`${config.restUrl}/2017?slug=${slug}`)
      .then(({ data }) => {
       axios.get(`${config.restUrl}/holiday-2017?per_page=100&2017=${data[0].id}`)
        .then(({ data }) => {
          this.setState(prev => {
            return Object.assign({}, prev, {
              loading: false,
              data: data
            })
          })

        })
        .catch((err) => {
          console.log(err.message)
          this.setState(() => {
            return { err }
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

  componentWillMount() {
    const { slug } = this.props
    this.handleData(slug)
  }

  componentWillReceiveProps(nextProps) {
    const { slug } = nextProps
    this.handleData(slug)
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
        <div className="Home row">
          {data && data.length ? data.map(post => {
            const {
              id
            } = post
            return (
              <div className="col-sm-4" key={id}>
                <Card post={post} goTo={goTo} />
              </div>
            )
          }) : <div>No posts found!</div> }
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
)(Category)
