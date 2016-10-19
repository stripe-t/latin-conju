import $ from "jquery"
import dnoun3 from "./noun3.json"
import { format } from "./formatter.js"

const types = ["単主", "単対", "単属", "単与", "単奪", "複主", "複対", "複属", "複与", "複奪"]
const template = ["様々", "-em<br />(主格, -im)", "-is<br />語幹様々", "-ī", "-e<br />(-ī)",
  "-ēs<br />(-a, -ia)", "主格", "-(i)um", "-ibus", "-ibus"]
let expandState = []
let noteExpandState = []

const genders = ["masculine", "feminine", "neuter", "both"]
const gender_template = ["M", "F", "N", "M/F"]

export default function renderNoun3() {
  const data = []
  let parent = [data]
  dnoun3.forEach((e, i) => {
    parent = parent.slice(0, e[0] + 1)
    const d = {
      index: i,
      data: e.slice(1),
      children: []
    }
    parent[e[0]].push(d)
    parent.push(d.children)
    expandState[i] = false
    noteExpandState[i] = false
  })

  $("#noun3>tbody").append(`<tr></tr>`)
  const h = $("#noun3>tbody>tr")

  h.append(`<th></th>`)
  h.append(`<th></th>`)
  types.forEach((e, i) => {
    if(isImportantColumn(i)) h.append(`<th class="important">${e}</th>`)
    else h.append(`<th>${e}</th>`)
  })

  $("#noun3>tbody").append(`<tr class="conj" id="noun3_header"></tr>`)
  const ht = $(`#noun3_header`)
  ht.append(`<td></td>`)
  ht.append(`<td></td>`)
  template.forEach((e, i) => {
    if(isImportantColumn(i)) ht.append(`<td class="important">${e}</td>`)
    else ht.append(`<td>${e}</td>`)
  })

  data.forEach((e) => {
    renderRow(e, 0)
  })
}

function renderRow(e, level) {
  const index = e.index
  const ed = e.data
  const children = e.children
  $("#noun3>tbody").append(`<tr class="conj conj_l${level}" id="noun3_${index}"></tr>`)
  const r = $(`#noun3_${index}`)
  r.append(`<td class="expander"></td>`)
  const exp = $(`#noun3_${index}>td:last`)
  if(children.length != 0) {
    exp.append(`<div class="expander_btn">+</div>`)
    const btn = $(`#noun3_${index}>td:last>.expander_btn`)
    btn.on("click", () => {
      if(expandState[index]) {
        children.forEach((ce) => {
          const ci = ce.index
          $(`#noun3_${ci}`).hide()
          $(`#noun3_${ci}_note`).hide()
          btn.text("+")
        })
      } else {
        children.forEach((ce) => {
          const ci = ce.index
          $(`#noun3_${ci}`).show()
          if(noteExpandState[ci]) $(`#noun3_${ci}_note`).show()
          btn.text("-")
        })
      }
      expandState[index] = !expandState[index]
    })
  }
  r.append(`<td class="header"></td>`)
  $(`#noun3_${index}>td:last`).on("click", () => {
    if(noteExpandState[index]) {
      $(`#noun3_${index}_note`).hide()
    } else {
      $(`#noun3_${index}_note`).show()
    }
    noteExpandState[index] = !noteExpandState[index]
  })

  const d = $(`#noun3_${index}>td:last`)
  d.append(`<div class="def">${format(ed[0], "normal")}</div>`)
  d.append(`<div class="meaning">${ed[1]}</div>`)
  ed[4].forEach((f, fi) => {
    if(isImportantColumn(fi)) r.append(`<td class="important">${format(f, "noun3")}</td>`)
    else r.append(`<td>${format(f, "noun3")}</td>`)
  })

  $("#noun3>tbody").append(`<tr class="note note_l${level}" id="noun3_${index}_note"><td></td><td class="note_body" colspan="11"></td></tr>`)
  const note = $(`#noun3_${index}_note>.note_body`)
  note.append(`<div class="note_body_note">${ed[2].replace(/\n/g, "<br />")}</div>`)
  note.append(`<div class="note_body_ref"></div>`)
  const ref = $(`#noun3_${index}_note .note_body_ref`)
  genders.forEach((eg, i) => {
    if(ed[3][i].length != 0) {
      ref.append(`<div class="ref_box ref_box_${eg}"><div class="ref_header">${gender_template[i]}</div><dl></dl></div>`)
      const box = $(`.ref_box:last>dl`)
      ed[3][i].forEach((ew) => {
        box.append(`<div class="d_group"><dt>${format(ew[0], "normal")}</dt><dd>${ew[1]}</dd></div>`)
      })
    }
  })

  if(level != 0) {
    r.hide()
  }
  $(`#noun3_${index}_note`).hide()
  children.forEach((e) => renderRow(e, level + 1))
}

function isImportantColumn(i) {
  return i == 0 || i == 2 || i == 7
}
