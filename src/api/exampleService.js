const MOCK_ADDRESS = '/mock/5c04f57ad8c66e7ce63f2b84/example'

export default {
  __mockAddress: MOCK_ADDRESS,

  // 修改
  userList: {
    'url': '/userList',
    'mock': true
  },
  addUser: {
    'url': '/addUser',
    'mock': true,
    methods: 'post'
  },
  updateUser: {
    'url': '/updateUser',
    'mock': true,
    methods: 'put'
  },
  userInfo: {
    'url': '/userInfo',
    'mock': true
  },
  user: {
    'url': '/user',
    'mock': true,
    methods: ['get', 'put', 'post', 'delete']
  }
}
