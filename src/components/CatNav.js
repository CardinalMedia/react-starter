import React from 'react';
import { connect }            from "react-redux"
import { push }               from "react-router-redux"
import { bindActionCreators } from "redux"
import * as axios             from "axios"
const config = require("../config.json")


class CatNav extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      categories: null,
      err: null
    }
  }

  componentWillMount() {
    this.setState(prev => {
      return Object.assign({}, prev, {
        loading: true
      })
    })

    axios.get(`${config.restUrl}/2017`)
      .then(({ data }) => {
        this.setState(prev => {
          return Object.assign({}, prev, {
            loading: false,
            categories: data
          })
        })
      })
      .catch((err) => {
        this.setState(() => {
          return { err }
        })
      })
  }

  html(__html){
    return { __html }
  }

  render () {

    const { loading, err, categories } = this.state
    let _this = this
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
        <ul className="navbar-nav mr-auto">
        {categories.map(cat => {

          const { id } = cat

          if ( cat.slug !== 'sponsored' ) {
            return (
              <li className="nav-item" key={id}>
                <a className="nav-link" onClick={() => { 
                  this.props.goTo(`/category/${cat.slug}`) 
                } }  dangerouslySetInnerHTML={_this.html(cat.name)}></a>
              </li>
            )
          }
          return null
          

        }) }
        </ul>
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
)(CatNav)
