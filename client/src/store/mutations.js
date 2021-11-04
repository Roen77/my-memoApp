
import { saveAuthToCookie, saveUserToCookie, deleteCookie } from '../utils/cookie'

export default {
  // state 업데이트
  UPDATE_STATE (state, payload) {
    Object.keys(payload).forEach(key => {
      state[key] = payload[key]
    })
  },
  SET_USER (state, data) {
    state.user = data.user.nickname
    state.token = data.token
    // 쿠키에 토큰과 사용자의 닉네임 정보 저장
    saveAuthToCookie(data.token)
    saveUserToCookie(data.user.nickname)
  },
  LOGOUT (state) {
    state.user = ''
    state.token = ''
    deleteCookie('memo_auth')
    deleteCookie('memo_user')
  },
  // 보드/카드 추가
  ADD_LIST (state, list) {
    state.dataList = [list, ...state.dataList]
  },
  // 수정
  UPDATE_LIST (state, { list, id }) {
    const index = state.dataList.findIndex(board => board.id === id)
    state.dataList.splice(index, 1, list)
  },
  // 보드 삭제
  DELETE_LIST (state, { id }) {
    const index = state.dataList.findIndex(board => board.id === id)
    state.dataList.splice(index, 1)
  },
  // 카테고리 추가
  ADD_CATEGORY (state, category) {
    state.unitCard.CardTypes = [...state.unitCard.CardTypes, category]
  },
  // 카테고리 삭제
  DELETE_CATEGORYS (state, choiceCategory) {
    const index = state.unitCard.CardTypes.findIndex(category => category.id === choiceCategory.id)
    state.unitCard.CardTypes.splice(index, 1)
  }
}
