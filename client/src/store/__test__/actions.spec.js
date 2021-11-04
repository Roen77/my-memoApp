import actions from '../actions'
import mutations from '../mutations'
import state from '../state'
import { request } from '../../api/index'

describe('store/actions.js', () => {
  let commit
  let dispatch
  beforeEach(() => {
    commit = (name, payload) => {
      mutations[name](state, payload)
    }
    dispatch = (name, payload) => {
      const context = {
        state,
        commit,
        dispatch
      }
      return actions[name](context, payload)
    }
  })

  test('회원가입 시,사용자의 정보(닉네임)와 토큰값을 저장했는지 확인합니다.', async () => {
    const res = {
      data: {
        user: {
          nickname: 'roen'
        },
        token: '12345!!'
      }
    }
    request.post = jest.fn().mockResolvedValue(res)
    await dispatch('REGISTER')
    expect(state.user).toEqual(res.data.user.nickname)
    expect(state.token).toEqual(res.data.token)
  })

  test('로그인 시,사용자의 정보(닉네임)와 토큰값을 저장했는지 확인합니다.', async () => {
    const res = {
      data: {
        user: {
          nickname: 'roen'
        },
        token: '12345!!'
      }
    }
    request.post = jest.fn().mockResolvedValue(res)
    await dispatch('LOGIN')
    expect(state.user).toEqual(res.data.user.nickname)
    expect(state.token).toEqual(res.data.token)
  })

  test('보드/카드 데이터를 잘 가져온 경우, 보드/카드 데이터를 확인합니다.', async () => {
    const res = {
      data: {
        lists: ['data1', 'data2', 'data3']
      }
    }
    request.get = jest.fn().mockResolvedValue(res)
    // 보드 데이터
    await dispatch('FETCHLISTS', { routeName: 'boards' })
    expect(state.dataList).toEqual(res.data.lists)
    // 카드 데이터
    await dispatch('FETCHLISTS', { routeName: 'boards', id: 1 })
    expect(state.dataList).toEqual(res.data.lists)
    // 카드 단일 데이터
    await dispatch('FETCHLISTS', { routeName: 'cards' })
  })

  test('보드 데이터를 잘 가져오지 못한 경우 에러 유무를 확인합니다.', async () => {
    const error = 'error occurred'
    request.get = jest.fn().mockResolvedValue(new Error(error))
    await dispatch('FETCHLISTS', { routeName: 'boards' })
    expect(state.hasError).toBe(true)
  })

  test('보드 데이터를 추가할 시, 기존 보드 데이터 목록의 가장 앞쪽으로 데이터가 추가됩니다.', async () => {
    const res = {
      data: {
        list: {
          UserId: 1,
          bgcolor: '#FF006EAD',
          createdAt: '2021-06-27T13:09:13.643Z',
          description: 'sdf',
          id: 1,
          title: 'sdf'
        }
      }
    }
    request.post = jest.fn().mockResolvedValue(res)
    await dispatch('CREATLIST', { routeName: 'boards' })
    expect(state.dataList[0]).toEqual(res.data.list)
  })
  test('보드 데이터를 수정할 시, 기존 보드 데이터 목록에서 해당 데이터를 수정합니다.', async () => {
    const res = {
      data: {
        lists: [{
          id: 2,
          title: 'title name',
          bgcolor: '#888888'
        }],
        list: {
          id: 1,
          title: 'title',
          bgcolor: '#7777'
        }
      }
    }

    request.get = jest.fn().mockResolvedValue(res)
    await dispatch('FETCHLISTS', { routeName: 'boards' })

    request.put = jest.fn().mockResolvedValue(res)
    await dispatch('UPDATELIST', { routeName: 'boards', id: 2 })

    expect(state.dataList[0].id).toBe(res.data.list.id)
  })

  test('내가 삭제할 보드 데이터를 보드 목록에서 삭제합니다.', async () => {
    const res = {
      data: {
        lists: [{
          id: 2,
          title: 'title name',
          bgcolor: '#888888'
        }]
      }
    }
    request.get = jest.fn().mockResolvedValue(res)
    await dispatch('FETCHLISTS', { routeName: 'boards' })

    request.delete = jest.fn().mockResolvedValue(res)
    await dispatch('DELETELIST', { routeName: 'boards', id: 2 })

    expect(state.dataList.length).toBe(0)
  })
})
