import React from 'react';
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

    axios.get(`${config.restUrl}/2016`)
      .then(({ data }) => {
        console.log(data)
        this.setState(prev => {
          return Object.assign({}, prev, {
            loading: false,
            categories: data
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

  render () {

    const { loading, err, categories } = this.state

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

          return (
            <li className="nav-item" key={id}>
              <a className="nav-link" href={`/category/${cat.slug}`}>{cat.name}</a>
            </li>
          )

        }) }
        </ul>
      )
    }

  }
}

export default CatNav