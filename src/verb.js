import $ from "jquery"
import dverb from "./verb.json"
import { format } from "./formatter.js"

const types = ["不定詞(現在)", "現在", "未完了", "未来"]

export default function renderVerb() {
  $("#verb>tbody").append(`<tr></tr>`)
  const h = $("#verb>tbody>tr")
  h.append(`<th></th>`)
  types.forEach((e) => {
    h.append(`<th>${e}</th>`)
  })
  dverb.forEach((e, i) => {
    $("#verb>tbody").append(`<tr class="conj" id="verb_${i}"></tr>`)
    const r = $(`#verb_${i}`)
    r.append(`<td class="header"></td>`)
    const d = $(`#verb_${i}>td:last`)
    d.append(`<div class="type">${e[0]}</div>`)
    d.append(`<div class="def">${format(e[1], "normal")}</div>`)
    d.append(`<div class="meaning">${e[2]}</div>`)
    e.slice(4).forEach((f) => {
      r.append(`<td></td>`)
      const c = $(`#verb_${i}>td:last`)
      f.forEach((g) => {
        c.append(`${format(g, "verb")}`)
      })
    })
    $("#verb>tbody").append(`<tr class="note" id="verb${i}_note"><td colspan="5">${e[3]}</td></tr>`)
  })
}
