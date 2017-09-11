import React, { Component }   from "react"
import { connect }            from "react-redux"
import { push }               from "react-router-redux"
import { bindActionCreators } from "redux"
import * as axios             from "axios"

const config = require("../config.json")

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      data: null,
      err: null
    }
  }

  componentWillMount() {
    this.setState(prev => {
      return Object.assign({}, prev, {
        loading: true
      })
    })

    axios.get(`${config.restUrl}posts`)
      .then(({ data }) => {
        console.log(data)
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
        <div className="Home">
          {data.map(post => {
            const {
              id,
              title,
              excerpt,
              slug
            } = post
            return (
              <article className={`post post-${id}`} key={id}>
                <h2 className="post-title" dangerouslySetInnerHTML={this.html(title.rendered)}></h2>
                <div className="post-excerpt" dangerouslySetInnerHTML={this.html(excerpt.rendered)}></div>
                <a onClick={() => { goTo(`/posts/${slug}`) }}>Read More</a>
              </article>
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
