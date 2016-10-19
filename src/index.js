import $ from "jquery"
import dnoun3 from "./noun3.json"
import renderVerb from "./verb.js"
import renderNoun3 from "./noun3.js"

const tabs = [["verb", "動詞"], ["noun3", "第3変化名詞"]]
let currentTab = "noun3"

$(() => {
  tabs.forEach((e) => {
    $("#tabs").append(`<a class="mode_button" href="#">${e[1]}</a>`)
    $("#tabs>a:last").on("click", () => {
      $(`#${currentTab}`).hide()
      $(`#${e[0]}`).show()
      currentTab = e[0]
    })
  })

  renderVerb()
  renderNoun3()

  tabs.forEach((e) => $(`#${e[0]}`).hide())
  $(`#${currentTab}`).show()
})
