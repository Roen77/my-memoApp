import { auth } from '../api/auth'
import { list, category, search } from '../api/list'

export default {
  // 회원가입
  async REGISTER ({ commit }, userInfo) {
    const { data } = await auth.registerUser(userInfo)
    commit('SET_USER', data)
    return data
  },
  // 로그인
  async LOGIN ({ commit }, userInfo) {
    const { data } = await auth.loginUser(userInfo)
    commit('SET_USER', data)
    return data
  },
  // 데이터 가져오기(보드,카드)
  async FETCHLISTS ({ commit }, payload) {
    try {
      // 기존 데이터 초기화 및 로딩 시작
      commit('UPDATE_STATE', {
        dataList: [],
        showCard: false,
        loading: true,
        hasError: false
      })
      let List
      const { data } = await list.fetchs(payload)
      // 보드 데이터와 카드 데이터를 구분하여 데이터 저장
      data.lists ? List = { dataList: data.lists } : List = { unitCard: data.list }
      commit('UPDATE_STATE', {
        ...List,
        showCard: true
      })
      return data
    } catch (error) {
      // 오류 시, 에러 페이지 보여주기
      commit('UPDATE_STATE', {
        hasError: true,
        errMsg: error.response
      })
    } finally {
      // 로딩 종료
      commit('UPDATE_STATE', {
        loading: false
      })
    }
  },
  // 데이터 추가(보드 추가, 카드 추가)
  async CREATLIST ({ commit }, { routeName, info }) {
    try {
      const { data } = await list.create({ routeName, info })
      commit('ADD_LIST', data.list)
      return data
    } catch (error) {
      commit('UPDATE_STATE', {
        hasError: true,
        errMsg: error.response
      })
    }
  },
  // 데이터 수정(보드 수정,카드 수정)
  async UPDATELIST ({ commit, state }, { routeName, id, info, updateCard }) {
    try {
      const { data } = await list.update({ routeName, id, info })
      // 보드 수정
      if (routeName === 'boards') {
        commit('UPDATE_LIST', { list: data.list, id })
      }
      // 카드 수정(카드 상태 수정)
      if (updateCard) {
        commit('UPDATE_STATE', {
          unitCard: {
            ...state.unitCard,
            complete: info.complete
          },
          // 수정 알람 메세지 보여주기
          alert: {
            success: true,
            text: data.msg,
            timeout: 1000
          }
        })
      }
      return data
    } catch (error) {
      // 오류
      commit('UPDATE_STATE', {
        hasError: true,
        errMsg: error.response
      })
    }
  },
  // 데이터 삭제(보드 삭제,카드 삭제)
  async DELETELIST ({ commit }, { routeName, id, BoardId }) {
    try {
      const { data } = await list.remove({ routeName, id, BoardId })
      if (routeName === 'boards') {
        commit('DELETE_LIST', { id })
      }
      return data
    } catch (error) {
      commit('UPDATE_STATE', {
        hasError: true,
        errMsg: error.response
      })
    }
  },
  // 카테고리 가져오기
  async FETCHCATEGORYS ({ commit }, info) {
    try {
      const { data } = await category.fetchs(info)
      commit('UPDATE_STATE', {
        categoryList: data.categorys
      })
      return data
    } catch (error) {
      commit('UPDATE_STATE', {
        hasError: true,
        errMsg: error.response
      })
    }
  },
  // 카테고리 추가
  async CREATCATEGORY ({ commit }, { BoardId, CardId, info }) {
    const { data } = await category.create({ BoardId, CardId, info })
    commit('ADD_CATEGORY', data.category[0])
    return data
  },
  // 카테고리 삭제
  async DELETECATEGORY ({ commit }, { BoardId, CardId, choice }) {
    const { data } = await category.remove({ BoardId, CardId, CategoryId: choice.id })
    commit('DELETE_CATEGORYS', choice)
    commit('UPDATE_STATE', {
      alert: {
        success: true,
        text: data.msg
      }
    })
    return data
  },
  // 대표 카테고리 수정
  async UPDATECATEGORY ({ commit, state }, { BoardId, CardId, choice }) {
    try {
      const { data } = await category.update({ BoardId, CardId, CategoryId: choice.id })
      // 카테고리 정보를 저장하고, 알림창 보여주기
      commit('UPDATE_STATE', {
        unitCard: {
          ...state.unitCard,
          Category: choice
        },
        alert: {
          success: true,
          text: data.msg
        }
      })
      return data
    } catch (error) {
      commit('UPDATE_STATE', {
        hasError: true,
        errMsg: error.response
      })
    }
  },
  // 검색
  async FETCHSEARCHCARD ({ commit }, { routeName, complete }) {
    try {
      // 로딩 시작
      commit('UPDATE_STATE', {
        loading: true
      })
      const { data } = await search.fetchs({ routeName, complete })
      commit('UPDATE_STATE', {
        dataList: data.lists
      })
      return data
    } catch (error) {
      commit('UPDATE_STATE', {
        hasError: true,
        errMsg: error.response
      })
    } finally {
      // 로딩 종료
      commit('UPDATE_STATE', {
        loading: false
      })
    }
  }
}
