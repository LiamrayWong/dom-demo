window.$ = window.jQuery = function (selectorOrArray) {
  let elements
  if (typeof selectorOrArray === 'string') {
    elements = document.querySelectorAll(selectorOrArray)
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray
  }
  // const api = 
  return {
    find(selector) {
      // document.querySelectorAll(selector) 这样不行，需要在一个范围内去找
      let array = []
      for (let i = 0; i < elements.length; i++) {
        const tmp = Array.from(elements[i].querySelectorAll(selector))
        array = array.concat(tmp)
      }
      array.oldApi = this
      //重新返回一个新的对象用于后续调用
      return jQuery(array)
      // elements = array return this 会改变所有elements的值
    },
    each(fn) {
      for (let i = 0; i < elements.length; i++) {
        fn.call(null, elements[i], i)
      }
      return this //this就是API
    },
    parent() {
      let array = []

      this.each((node) => {
        if (array.indexOf(node.parentNode) === -1) {
          array.push(node.parentNode)
        }
      })
      return jQuery(array)
    },
    children() {
      let array = []

      this.each((node) => {
        array.push(...node.children)
      })
      return jQuery(array)
    },
    print() {
      console.log(elements)
    },

    //ES6语法对象中函数的声明方法
    addClass(className) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(className) //闭包，函数访问外部的变量，保证数据
      }
      // return api
      return this //把调用从前面传递到后面，进行链式操作
    },

    end() {
      return this.oldApi
    },

    oldApi: selectorOrArray.oldApi,


  }
  // return api
};