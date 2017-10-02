const https = require('https')
const fs = require('fs-extra')

fs.emptyDirSync('./gifts')

function htmlTemplate (item) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"><meta name="theme-color" content="#000000"><link rel="manifest" href="/manifest.json"><link rel="shortcut icon" href="/favicon.ico"><link href="https://fonts.googleapis.com/css?family=Poppins:300,400,600" rel="stylesheet">
                <title>Our State Holidy Gift Guide | ${item.title.rendered}</title>
                <meta name="description" content="${item.content.rendered}" />
      <meta property="og:image" content="${item.gift_data.images.full_size}" />
      <meta property="og:image:width" content="400">
      <meta property="og:image:height" content="400"
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content="${item.title.rendered}" />
      <meta property="og:description" content="${item.content.rendered}" />
      <meta property="og:url" content="https://giftguides.ourstate.com/holiday-2017/gifts/${item.slug}" />
      <meta property="og:site_name" content="Our State Holiday Gift Guide" />
      <meta property="article:author" content="https://www.facebook.com/ourstatemagazine/" />
      <meta property="fb:app_id" content="227721687275850">
      <meta property="article:published_time" content="${item.date}" />
      <meta property="article:modified_time" content="${item.modified}" />
      <meta property="og:updated_time" content="${item.modified}" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ourstatemag" />
      <meta name="twitter:title" content="${item.title.rendered}" />
      <meta name="twitter:description" content="${item.content.rendered}" />
      <meta name="twitter:image:src" content="${item.gift_data.images.full_size}" />
      <link rel="canonical" href="https://giftguides.ourstate.com/holiday-2017/gifts/${item.slug}" />
              </head>
              <body>
            <noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div><script type="text/javascript" src="/holiday-2017/static/js/main.0c7c10f8.js"></script></body></html>`
}

function createFiles (data) {
  data.forEach((item, index, arra) => {
    let fileName = `./build/gifts/${item.slug}.html`
    let stream = fs.createWriteStream(fileName)

    stream.once('open', (fd) => {
      let html = htmlTemplate(item)
      stream.end(html)
    })
  })
}

https.get('https://giftguides.ourstate.com/wp-json/wp/v2/holiday-2017?per_page=100', (res) => {
  const { statusCode } = res

  if (statusCode !== 200) {
    console.log(statusCode)
    console.log('failburger')
    return
  }

  res.setEncoding('utf8')
  let rawData = ''
  res.on('data', (chunk) => { rawData += chunk })
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData)
      createFiles(parsedData)
    } catch (e) {
      console.error(e.message)
    }
  })
})
