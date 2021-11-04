// 이미지 로드 확인
function loadImage (src) {
  return new Promise((resolve) => {
    const img = document.createElement('img')
    img.src = src
    img.addEventListener('load', () => {
      resolve()
    })
  })
}

export { loadImage }
