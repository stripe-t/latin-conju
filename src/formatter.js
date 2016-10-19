const replaceList = [
  [/A/g, "ā"],
  [/I/g, "ī"],
  [/U/g, "ū"],
  [/E/g, "ē"],
  [/O/g, "ō"],
  [/\//g, "<br />"]
]

function replace(str) {
  let s = str
  replaceList.forEach((e) => s = s.replace(e[0], e[1]))
  return s
}

export function format(str, mode) {
  return `<div class="latin">${format_recursive(str, mode)}</div>`
}

function format_recursive(str, mode) {
  const fl = format_list[mode]
  let buffer = ""
  let startIndex = 0
  let listIndex = -1
  for(let i=0; i<str.length; i++) {
    const c = str.charAt(i)
    if(listIndex == -1) {
      const li = fl.findIndex((e) => c == e[0])
      if(li >= 0) {
        buffer += replace(str.slice(startIndex, i))
        listIndex = li
        startIndex = i + 1
      }
    } else {
      if(c == fl[listIndex][1]) {
        buffer += fl[listIndex][2](str.slice(startIndex, i), mode)
        listIndex = -1
        startIndex = i + 1
      }
    }
  }
  if(listIndex >= 0) buffer += str.slice(startIndex)
  else buffer += replace(str.slice(startIndex))
  return buffer
}

function format_italic(str, mode) {
  return `<em>${format_recursive(str, mode)}</em>`
}

function format_default(str, mode) {
  return `<span class="default">${format_recursive(str, mode)}</span>`
}

function format_vowel(str, mode) {
  const vowelType = vowel_list.find((e) => str.indexOf(e[0]) >= 0)[1]
  return `<span class="vowel vowel_${vowelType}">${format_recursive(str, mode)}</span>`
}

function format_vowel_italic(str, mode) {
  const vowelType = vowel_list.find((e) => str.indexOf(e[0]) >= 0)[1]
  return `<em><span class="vowel vowel_${vowelType}">${format_recursive(str, mode)}</span></em>`
}

const format_list = {
  "normal": [
    ["*", "*", format_italic]
  ],
  "verb": [
    ["*", "*", format_italic],
    ["[", "]", format_vowel],
    ["{", "}", format_vowel_italic]
  ],
  "noun3": [
    ["*", "*", format_italic],
    ["(", ")", format_default]
  ]
}

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
