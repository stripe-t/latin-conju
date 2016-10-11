import $ from "jquery"
import dverb from "./verb.json"

const types = ["不定詞(現在)", "現在", "未完了", "未来"]

$(() => {
  $("#verb>tbody").append(`<tr></tr>`)
  const h = $("#verb>tbody>tr")
  h.append(`<th></th>`)
  types.forEach((e) => {
    h.append(`<th>${e}</th>`)
  })
  dverb.forEach((e, i) => {
    $("#verb>tbody").append(`<tr class="conj" id="verb${i}"></tr>`)
    const r = $(`#verb${i}`)
    r.append(`<td class="header"></td>`)
    const d = $(`#verb${i}>td:last`)
    d.append(`<div class="type">${e[0]}</div>`)
    d.append(`<div class="def">${format(e[1])}</div>`)
    d.append(`<div class="meaning">${e[2]}</div>`)
    e.slice(4).forEach((f) => {
      r.append(`<td></td>`)
      const c = $(`#verb${i}>td:last`)
      f.forEach((g) => {
        c.append(`${format(g)}`)
      })
    })
    $("#verb>tbody").append(`<tr class="note" id="verb${i}_note"><td colspan="5">${e[3]}</td></tr>`)
  })
})

function replaceVowel(str) {
  return str.replace("A", "ā").replace("I", "ī").replace("U", "ū").replace("E", "ē").replace("O", "ō")
}

function format(str) {
  return `<div class="latin">${format_recursive(str)}</div>`
}

function format_recursive(str) {
  let buffer = ""
  let startIndex = 0
  let listIndex = -1
  for(let i=0; i<str.length; i++) {
    const c = str.charAt(i)
    if(listIndex == -1) {
      const li = format_list.findIndex((e) => c == e[0])
      if(li >= 0) {
        buffer += replaceVowel(str.slice(startIndex, i))
        listIndex = li
        startIndex = i + 1
      }
    } else {
      if(c == format_list[listIndex][1]) {
        buffer += format_list[listIndex][2](str.slice(startIndex, i))
        listIndex = -1
        startIndex = i + 1
      }
    }
  }
  if(listIndex >= 0) buffer += str.slice(startIndex)
  else buffer += replaceVowel(str.slice(startIndex))
  return buffer
}

function format_italic(str) {
  return `<em>${format_recursive(str)}</em>`
}

function format_vowel(str) {
  const vowelType = vowel_list.find((e) => str.indexOf(e[0]) >= 0)[1]
  return `<span class="vowel vowel_${vowelType}">${format_recursive(str)}</span>`
}

function format_vowel_italic(str) {
  const vowelType = vowel_list.find((e) => str.indexOf(e[0]) >= 0)[1]
  return `<em><span class="vowel vowel_${vowelType}">${format_recursive(str)}</span></em>`
}

const format_list = [
  ["*", "*", format_italic],
  ["[", "]", format_vowel],
  ["{", "}", format_vowel_italic]
]

const vowel_list = [
  ["a", "a"],
  ["i", "i"],
  ["u", "u"],
  ["e", "e"],
  ["o", "o"],
  ["A", "la"],
  ["I", "li"],
  ["U", "lu"],
  ["E", "le"],
  ["O", "lo"]
]
