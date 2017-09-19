import React from 'react'

class Card extends React.Component {

   html(__html){
    return { __html }
  }

  render () {
    const { goTo } = this.props
    const { gift_data } = this.props.post
    const giftData = gift_data
    let i = 0
    return (
      <article className={`card post post-${this.props.post.id}`} key={this.props.post.id}>
        
        {giftData.images.full_size ? <a href={giftData.meta.gift_url} target="_blank"><img className="img-fluid" src={giftData.images.full_size} alt={this.props.post.slug} /></a> : null}
        <div className="card-body">
          <div className="tags">
            {
              
              giftData.categories.map(cat => {
                i++
                return (
                  <a className="tag" key={`${cat.id}-${i}`} onClick={() => {  goTo(`/category/${cat.slug}`) } }>{cat.name}</a>
                )
              })
            }
          </div>
          <h2 className="post-title" dangerouslySetInnerHTML={this.html(this.props.post.title.rendered)}></h2>
          <div className="post-excerpt" dangerouslySetInnerHTML={this.html(this.props.post.content.rendered)}></div>
          <div className="seller-info">
            <p><span className="price">{giftData.meta.gift_price}</span> via <a href="{giftData.meta.seller_url}">{giftData.meta.seller_url}</a></p>
          </div>
          <a className="btn btn-primary" href={giftData.meta.gift_url} target="_blank">{giftData.meta.button_text}</a>
        </div>
      </article>
     )
  }
}

export default Card