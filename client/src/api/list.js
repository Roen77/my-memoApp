import { request } from './index'
// 보드,카드
export const list = {
  // 추가
  create ({ routeName, info }) {
    return request.post(`${routeName}`, info)
  },
  // 보드,카드 가져오기
  fetchs (payload) {
    return payload.id ? request.get(`${payload.routeName}/${payload.id}`) : request.get(`${payload.routeName}`)
  },
  // 보드,카드 수정
  update ({ routeName, id, info }) {
    return request.put(`${routeName}/${id}`, info)
  },
  // 보드,카드 삭제
  remove ({ routeName, id, BoardId }) {
    return BoardId ? request.delete(`${routeName}/${BoardId}/${id}`) : request.delete(`${routeName}/${id}`)
  }
}

// 카테고리
export const category = {
  // 카테고리 추가
  create ({ info, BoardId, CardId }) {
    return request.post(`categorys/${BoardId}/${CardId}`, info)
  },
  // 카테고리 가져오기
  fetchs (payload) {
    return request.get(`categorys/${payload.BoardId}`)
  },
  // 대표 카테고리 수정
  update ({ CategoryId, BoardId, CardId }) {
    return request.put(`categorys/${BoardId}/${CardId}`, { CategoryId })
  },
  // 카테고리 삭제
  remove ({ CategoryId, BoardId, CardId }) {
    return request.delete(`categorys/${BoardId}/${CardId}/${CategoryId}`)
  }
}
// 검색
export const search = {
  fetchs ({ routeName, complete }) {
    return request.get(`${routeName}/status/${complete}`)
  }
}
