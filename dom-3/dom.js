function getSiblings(node) {

  var allChildren = node.parentNode.children

  var array = {
    length: 0
  }

  for (let i = 0; i < allChildren.length; i++) {

    if (allChildren[i] !== node) {

      array[array.length] = allChildren[i]
      array.length += 1
    }
  }
  return array

}



function addClass(node, classes) {
  for (let key in classes) {
    let value = classes[key]
    let methodName = value ? "add" : "remove"
    node.classList[methodName](key)
  }
}

window.ffdom = {}
ffdom.getSiblings = getSiblings
ffdom.addClass = addClass

ffdom.getSiblings(item3)
ffdom.addClass(item3, {
  a: true,
  b: false,
  c: true
})

Node.prototype.getSiblings = function () {

  var allChildren = this.parentNode.children

  var array = {
    length: 0
  }

  for (let i = 0; i < allChildren.length; i++) {

    if (allChildren[i] !== this) {

      array[array.length] = allChildren[i]
      array.length += 1
    }
  }
  return array

}

Node.prototype.addClass = function (classes) {
  for (let key in classes) {
    let value = classes[key]
    let methodName = value ? "add" : "remove"
    this.classList[methodName](key)
  }
}

console.log(item3.getSiblings())
item2.addClass({
  1: true,
  4: false
})

window.Node2 = function (nodeOrSelector) {
  let node
  if (typeof nodeOrSelector === "string") {
    node = document.querySelector(nodeOrSelector)
  } else {
    node = nodeOrSelector
  }
  return {
    getSiblings: function () {

      var allChildren = node.parentNode.children

      var array = {
        length: 0
      }

      for (let i = 0; i < allChildren.length; i++) {

        if (allChildren[i] !== node) {

          array[array.length] = allChildren[i]
          array.length += 1
        }
      }
      return array
    },
    addClass: function (classes) {
      for (let key in classes) {
        let value = classes[key]
        let methodName = value ? "add" : "remove"
        node.classList[methodName](key)
      }
    }
  }
}
let node2 = Node2("#item3")
console.log(node2.addClass({
  red: true,
  4: false
}))


window.jQuery = function (nodeOrSelector) {
  let nodes = {}
  if (typeof nodeOrSelector === "string") {
    let temp = document.querySelectorAll(nodeOrSelector)
    for (let i = 0; i < temp.length; i++) {
      nodes[i] = temp[i]
    }
    nodes.length = temp.length
  } else if (nodeOrSelector instanceof Node) {
    nodes = {
      0: nodeOrSelector,
      length: 1
    }
  }

  nodes.addClass = function (classes) {
    for (let key in classes) {
      let value = classes[key]
      let methodName = value ? "add" : "remove"
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].classList[methodName](key)
      }

    }
  }



  nodes.getText = function () {
    let text = []
    for (let i = 0; i < nodes.length; i++) {
      text.push(nodes[i].textContent)

    }
    return text
  }
  nodes.setText = function (text) {
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].textContent = text
    }
  }

  nodes.text = function (text) {
    if (text === undefined) {
      let text = []
      for (let i = 0; i < nodes.length; i++) {
        text.push(nodes[i].textContent)

      }
      return text
    } else {
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].textContent = text
      }
    }
  }


  return nodes //把伪数组返回给对象


}
let node2 = jQuery('ul > li')
// node2.addClass({
//   red: true
// })
node2[0].classList.add('red')
console.log(node2.text())