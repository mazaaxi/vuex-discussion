module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: 'src/index.ts',
      // the source template
      template: 'src/index.html',
      // output as dist/playground.html
      filename: 'index.html',
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Vuex Discussion',
    },
  },

  devServer: {
    port: 5000,
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:5010',
        secure: false,
      },
    },
  },
}
