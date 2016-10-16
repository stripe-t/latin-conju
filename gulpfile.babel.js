import g from "gulp"
import webpack from "webpack-stream"
import pug from "gulp-pug"
import stylus from "gulp-stylus"
import livereload from "gulp-livereload"

function log(e) { console.log(e) }

g.task("html", () => g.src("src/index.pug").pipe(pug().on('error', log)).pipe(g.dest("docs/")).pipe(livereload()))
g.task("js",   () => g.src("src/index.js").pipe(webpack({
  module: {
    loaders: [
      { test: /\.js$/, loader: "babel" },
      { test: /\.json$/, loader: "json" }
    ]
  },
  output: {
    filename: "index.js"
  }
}).on('error', log)).pipe(g.dest("docs/")).pipe(livereload()))
g.task("css",  () => g.src("src/index.stylus").pipe(stylus().on('error', log)).pipe(g.dest("docs/")).pipe(livereload()))
g.task("font", () => g.src("src/font/**/*").pipe(g.dest("docs/font")))

g.task("all", ["html", "js", "css", "font"])

g.task("default", () => {
  livereload.listen()
  g.watch("src/index.pug", ["html"])
  g.watch("src/**/*.js", ["js"])
  g.watch("src/**/*.json", ["js"])
  g.watch("src/**/*.stylus", ["css"])
})
