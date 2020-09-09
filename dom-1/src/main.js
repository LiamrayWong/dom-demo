console.log("success")

const div = dom.create("<div>new div</div>")
console.log(div)

dom.after(test, div)

const div3 = dom.create(`<div id="parent"></div>`)
dom.wrap(test, div3)