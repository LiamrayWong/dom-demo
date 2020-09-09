// const api = jQuery('.test') //返回对象

// //链式模式，遍历所有获取的对象，添加 .red，添加 .blue
// api.addClass('red').addClass('blue')
//对象只用一次，可以省略名字
// jQuery('.test')
//   .addClass('red').addClass('blue')

const x = jQuery('.test').find('.child')
console.log(x)