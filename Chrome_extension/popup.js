const screen = document.querySelector('.screen')
// 是否能点击加减乘除
let canOperation = false
// 临时存储计算步骤
let calArr = []
// 主题
let isLight = true

// 点击数字
document.querySelectorAll('.nub').forEach(item => {
  item.addEventListener('click', () => {
    append(calArr, item.innerHTML)
    canOperation = true
    screen.innerHTML = calArr.join('')
  })
})

// 点击加减乘除
document.querySelectorAll('.operator').forEach(item => {
  item.addEventListener('click', () => {
    if (canOperation) append(calArr, item.innerHTML)
    canOperation = false
    screen.innerHTML = calArr.join('')
  })
})

// 计算结果
document.querySelector('.equal').addEventListener('click', () => {
  // 优先计算乘除
  while ((i = calArr.findIndex(item => item === '×' || item === '÷')) !== -1) {
    calArr.splice(i - 1, 3, operation(calArr[i - 1], calArr[i], calArr[i + 1]))
  }
  while ((i = calArr.findIndex(item => item === '+' || item === '-')) !== -1) {
    calArr.splice(i - 1, 3, operation(calArr[i - 1], calArr[i], calArr[i + 1]))
  }
  screen.innerHTML = calArr[0]
  if (isNaN(calArr[0])) calArr.length = 0

  function operation(nub1, operator, nub2) {
    switch (operator) {
      case '+':
        return Number(nub1) + Number(nub2)
      case '-':
        return nub1 - nub2
      case '×':
        return Math.round(nub1 * nub2 * 1000) / 1000
      case '÷':
        return Math.round((nub1 / nub2) * 1000) / 1000
    }
  }
})

// 清除键
document.querySelector('.ae').addEventListener('click', () => {
  calArr.length = 0
  screen.innerHTML = calArr.join('')
})

// 删除上一步
document.querySelector('.del').addEventListener('click', () => {
  calArr.splice(calArr.length - 1, 1)
  screen.innerHTML = calArr.join('')
})

// 修改正负值
document.querySelector('.pm').addEventListener('click', () => {
  if (!isNaN(calArr[calArr.length - 1])) {
    calArr[calArr.length - 1] = -calArr[calArr.length - 1]
    screen.innerHTML = calArr.join('')
  }
})

// 计算平方
document.querySelector('.square').addEventListener('click', () => {
  otherCal(calArr, item => Math.pow(item, 2))
})

// 计算开方
document.querySelector('.sqrt').addEventListener('click', () => {
  otherCal(calArr, item => Math.pow(item, 0.5))
})

// 计算倒数
document.querySelector('.recip').addEventListener('click', () => {
  otherCal(calArr, item => Math.round((1 / item) * 1000) / 1000)
})

// 计算百分比
document.querySelector('.percent').addEventListener('click', () => {
  otherCal(calArr, item => Math.round(item * 10) / 1000)
})

// 修改主题
document.querySelector('.theme').addEventListener('click', () => {
  isLight = !isLight
  theme()
})

// 将键入的数据存入数组
function append(arr, data) {
  if (isNaN(arr[arr.length - 1])) {
    arr.push(data)
  } else {
    if (!isNaN(data)) {
      arr[arr.length - 1] = arr[arr.length - 1] + data
    } else {
      if (data === '.' && arr[arr.length - 1].toString().indexOf('.') === -1) {
        arr[arr.length - 1] = arr[arr.length - 1] + data
      } else if (data !== '.') {
        arr.push(data)
      }
    }
  }
}

// 其它计算方式
// 因为都有判断当前内容是否合法的功能，故将其封装，将实际操作回调
function otherCal(arr, fn) {
  if (arr.length > 1 || isNaN(arr[0])) {
    arr.length = 0
    arr.push(NaN)
  } else {
    arr[0] = fn(arr[0])
  }
  screen.innerHTML = calArr.join('')
  if (isNaN(arr[0])) arr.length = 0
}

// 主题
;(function theme() {
  const el = document.body
  if (isLight) {
    el.style.setProperty('--main-color', '#f0f0f0')
    el.style.setProperty('--shadow-light', '#fff')
    el.style.setProperty('--shadow-dark', '#e0e0e0')
    el.style.setProperty('--font-color', '#7a7a7a')
  } else {
    el.style.setProperty('--main-color', '#4a4a4a')
    el.style.setProperty('--shadow-light', '#5a5a5a')
    el.style.setProperty('--shadow-dark', '#3a3a3a')
    el.style.setProperty('--font-color', '#eaeaea')
  }
  window.theme = theme
})()