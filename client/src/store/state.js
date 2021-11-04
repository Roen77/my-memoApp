import { getAuthFromCookie, getUserFromCookie } from '../utils/cookie'
export default {
  // 로딩
  loading: false,
  // 이미지 로딩
  imageLoading: false,
  // 에러 여부
  hasError: false,
  // 에러 메세지
  errMsg: '',
  // 쿠키에 저장된 정보를 가져오고,없으면 빈문자열을 저장합니다.
  user: getUserFromCookie() || '',
  token: getAuthFromCookie() || '',
  // 보드,카드 리스트
  dataList: [],
  // 카테고리 리스트
  categoryList: [],
  // 대표 카데고리
  mainCategory: {},
  // 카드(단일 데이터)
  unitCard: {},
  showCard: false,
  // 알람상태
  alert: {
    success: false,
    text: '',
    timeout: 3000
  },
  // 편집 상태
  edit: {
    // 수정 모드 상태
    editState: false,
    // 카드 수정모드시, 카테고리 추가 상태
    addState: false,
    // 카드 수정모드시, 카테고리 삭제 상태
    removeState: false
  }
}
