window.dom = {
  //创建新的节点
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    console.log(container)
    return container.content.firstChild;
  },
  //创建新的弟弟节点
  after(node, node2) {
    // 从父节点找到下一个兄弟节点，插到下一个兄弟节点的前面；如果此节点是最后一个节点，无法插入
    return node.parentNode.insertNode(node2, node.nextSibling);
  },
  //创建新的哥哥节点
  before(node, node2) {
    return node.parentNode.insertNode(node2, node);
  },
  //创建新的儿子节点
  append(parent, node) {
    parent.appendChild(node)
  },
  //创建新的父节点
  wrap(node, parent) {
    //创建父节点作为兄弟节点
    dom.before(node, parent)
    //把当前节点降级为子节点
    dom.append(parent, node)
  },
  //删除一个子节点
  remove(node) {
    //此接口比较新，IE可能不支持
    // node.remove()
    node.parentNode.removeChild(node)
    //保留节点的引用
    return node
  },
  //删除所有子节点
  empty(node) {
    //删除后无法再获取引用
    // node.innerHTML = ''
    //新语法等价于：const childNodes = node.childNodes
    const {
      childNodes
    } = node
    const array = []
    //使用此种遍历方式，每次的长度都是变化的
    // for (let i = 0; i < childNodes.length; i++) {
    //   dom.remove(childNodes[i])
    //   array.push(childNodes[i])
    // }
    //返回引用
    let x = node.firstChild
    while (x) {
      array.push(dom.remove(node.childNodes))
      x = node.firstChild
    }
    return array
  },
  attr(node, name, value) { //重载
    if (arguments.length === 3) {
      node.setAttribute(name, value)
    } else if (arguments.length === 2) {
      return node.getAttribute(name)
    }
  },
  text(node, string) { //适配
    if (arguments === 2) {
      if ('innerText' in node) {
        node.innerText = string //IE
      } else {
        node.textContent = string //Chrome
      }
    } else if (arguments === 1) {
      if ('innerText' in node) {
        return node.innerText
      } else {
        return node.textContent
      }
    }
  },
  html(node, string) {
    if (arguments === 2) {
      node.innerHTML = string
    } else if (arguments === 1) {
      return node.innerHTML
    }
  },
  style(node, name, value) {
    if (arguments === 3) {
      //dom.style(div,'color','red')
      node.style[name] = value
    } else if (arguments === 2) {
      if (typeof name === "stirng") {
        return node.style[name]
      } else if (name instanceof Object) {
        const object = name
        for (let key in object) {
          node.style[key] = object[key]
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className)
    },
    remove(node, className) {
      node.classList.remove(className)
    },
    has(node, className) {
      node.classList.contains(className)
    }
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn)
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn)
  },
  find(selector, scope) {
    //如果存在scope的范围，就在这个范围里面找；没有的话，在document的范围里面找
    return (scope || document).querySelectorAll(selector)
  },
  parent(node) {
    return node.parentNode
  },
  children(node) {
    return node.children
  },
  siblings(node) {
    //把伪数组变成数组，过滤出当前节点
    return Array.from(node.parentNode.children).filter(item => item !== node)
  },
  next(node) {
    // 这种方法会获取到文本节点
    // return node.nextSibling
    let x = node.nextSibling
    while (x && x.nextSibling === 3) {
      x = x.nextSibling
    }
    return x
  },
  previous() {
    let x = node.previousSibling
    while (x && x.previousSibling === 3) {
      x = x.previousSibling
    }
    return x
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i])
    }
  },
  index(node) {
    const list = dom.children(node)
    let i
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break
      }
    }
    return i
  }
}