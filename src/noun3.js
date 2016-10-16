import $ from "jquery"
import dnoun3 from "./noun3.json"
import { format } from "./formatter.js"

const types = ["単主", "単対", "単属", "単与", "単奪", "複主", "複対", "複属", "複与", "複奪"]
const template = ["さまざま", "-em<br />(主格, -im)", "-is", "-ī", "-e<br />(-ī)",
  "-ēs<br />(-a, -ia)", "主格", "-(i)um", "-ibus", "-ibus"]

export default function renderNoun3() {
  $("#noun3>tbody").append(`<tr></tr>`)
  const h = $("#noun3>tbody>tr")

  h.append(`<th></th>`)
  types.forEach((e, i) => {
    if(isImportantColumn(i)) h.append(`<th class="important">${e}</th>`)
    else h.append(`<th>${e}</th>`)
  })
  $("#noun3>tbody").append(`<tr class="conj" id="noun3_header"></tr>`)
  const ht = $(`#noun3_header`)
  ht.append(`<td></td>`)
  template.forEach((e, i) => {
    if(isImportantColumn(i)) ht.append(`<td class="important">${e}</td>`)
    else ht.append(`<td>${e}</td>`)
  })
  dnoun3.forEach((e, i) => {
    $("#noun3>tbody").append(`<tr class="conj" id="noun3_${i}"></tr>`)
    const r = $(`#noun3_${i}`)
    r.append(`<td class="header"></td>`)
    const d = $(`#noun3_${i}>td:last`)
    d.append(`<div class="def">${format(e[0], "normal")}</div>`)
    d.append(`<div class="meaning">${e[1]}</div>`)
    e[4].forEach((f, fi) => {
      if(isImportantColumn(fi)) r.append(`<td class="important">${format(f, "noun3")}</td>`)
      else r.append(`<td>${format(f, "noun3")}</td>`)
    })
    $("#noun3>tbody").append(`<tr class="note" id="verb${i}_note"><td colspan="11">${e[2]}</td></tr>`)
  })
}

function isImportantColumn(i) {
  return i == 0 || i == 2 || i == 7
}
