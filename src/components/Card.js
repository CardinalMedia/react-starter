import React from 'react'

class Card extends React.Component {

   html(__html){
    return { __html }
  }

  render () {

    return (
      <article className={`post post-${this.props.post.id}`} key={this.props.post.id}>
        <a onClick={() => { this.props.goTo(`/gifts/${this.props.post.slug}`) }}>
          {this.props.post.gift_data.images.full_size ? <img className="img-fluid" src={this.props.post.gift_data.images.full_size} alt={this.props.post.slug} /> : null}
          <h2 className="post-title" dangerouslySetInnerHTML={this.html(this.props.post.title.rendered)}></h2>
          <div className="post-excerpt" dangerouslySetInnerHTML={this.html(this.props.post.content.rendered)}></div>
          Read More
        </a>
      </article>
     )
  }
}

export default Card