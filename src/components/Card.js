import React from 'react'

class Card extends React.Component {

  guid ( ) {
    const S4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1)
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4())
  }

   html(__html){
    return { __html }
  }

  render () {
    const { goTo } = this.props
    const { gift_data } = this.props.post
    const giftData = gift_data
    let i = 0
    let _this = this
    return (
      <article className={`card post post-${this.props.post.id}`} key={this.props.post.id}>
        
        {giftData.images.full_size ? <a href={giftData.meta.gift_url} target="_blank"><img className="img-fluid" src={giftData.images.full_size} alt={this.props.post.slug} /></a> : null}
        <div className="card-body">
          <div className="tags">
            {
              
              giftData.categories.map(cat => {
                i++
                let guid = _this.guid()
                if ( cat.slug !== 'sponsored' ) {
                  return (
                    <a className="tag" key={`${cat.id}-${guid}`} onClick={() => {  goTo(`/category/${cat.slug}`) } } dangerouslySetInnerHTML={_this.html(cat.name)}></a>
                  )
                } else {
                  return (
                    <span className="tag sponsored" key={`${cat.id}-${i}`} dangerouslySetInnerHTML={_this.html(cat.name)}></span>
                  )
                }
              })
            }
          </div>
          <h2 className="post-title" dangerouslySetInnerHTML={this.html(this.props.post.title.rendered)}></h2>
          <div className="post-excerpt" dangerouslySetInnerHTML={this.html(this.props.post.content.rendered)}></div>
          <div className="seller-info">
            <p><span className="price">{giftData.meta.gift_price}</span> via <a href="{giftData.meta.seller_url}">{giftData.meta.seller_nam}</a></p>
          </div>
          <a className="btn btn-primary" href={giftData.meta.gift_url} target="_blank">{giftData.meta.button_text}</a>
          <div className="social-share">
            <a href={`http://twitter.com/share?text=I'm%20adding%20this%20${this.props.post.title.rendered}%20from%20the%20@ourstatemag%20Holiday%20Gift%20Guide%20to%20my%20wish%20list.%20&#x1f609;%20&url=https://giftguide.ourstate.com/holiday-2017/gifts/${this.props.post.slug}`} target="_blank" className="twitter">
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=https://giftguide.ourstate.com/holiday-2017/gifts/${this.props.post.slug}`} className="facebook" target="_blank">
            </a>
          </div>
        </div>
      </article>
     )
  }
}

export default Card