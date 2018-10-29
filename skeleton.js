const fs = require('fs')
const htmlMinifier = require('html-minifier')
const { resolve } = require('path')

const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

const renderer = createBundleRenderer(resolve(__dirname, './dist/skeleton.json'), {
  template: fs.readFileSync(resolve(__dirname, './index.html'), 'utf-8')
})

renderer.renderToString({}, (err, html) => {
  html = htmlMinifier.minify(html, {
    collapseWhitespace: true,
    minifyCSS: true
  })
  fs.writeFileSync('index.html', html, 'utf-8')
})