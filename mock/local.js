import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@csentence(5, 10)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)',
    date: '@date()'
  }]
})

const data2 = []
for (let i = 0; i < 20; i++) {
  const obj = Mock.mock({
    index: i,
    id: '@id',
    title: '@csentence(5, 10)',
    'status|1': ['联测系统', '非联测系统'],
    'bgcolor|1': ['green', 'red', ''],
    author: 'name',
    expand: false,
    isExpand: false,
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)',
    date: '@date()',
    progress: 'progress',
    opinion: 'opinion'
  })
  if (i === 0) {
    obj.status = '主系统'
  } else if (i === 2) {
    obj.status = '主系统'
  } else if (i === 4) {
    obj.status = '主系统'
  } else if (i === 7) {
    obj.status = '主系统'
  } else if (i === 11) {
    obj.status = '主系统'
  } else if (i > 15) {
    obj.status = '主系统'
  }
  data2.push(obj)
}

export default [
  {
    url: '/test/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/week-report/list',
    type: 'get',
    response: config => {
      const items = data2
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
