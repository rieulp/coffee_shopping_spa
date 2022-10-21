# coffee_shopping_spa 
 
> 프로그래머스 과제테스트 커피 주문 페이지 만들기 사이트 
 
## 🛠 개발 환경 
 
`TypeScript` `Webpack` `VanillaJS` 
 
## ✏ github page에 배포하기 위해 추가한 내용 
- 기존 프로젝트는 CORS 문제로 `express`로 간단한 프록시 서버를 만들어 데이터 통신을 했다. 그러나 github page에서는 정적 사이트만 호스팅이 가능하기 때문에 데이터를 json파일로 저장해 사용하는 방식으로 변경하였다. 
- 배포되는 URL에 맞게 코드에서 사용하는 모든 경로를 상대 경로에서 절대경로 `/coffee_shopping_spa/...`로 변경하였다. 
 
 
- 새로고침 후에도 root에 있는 파일을 사용하기 위해, `index.html`과 같은 내용으로 `404.html` 추가 
  - 새로고침을 하면 `root`가 아닌 url 위치에서 파일을 찾기 때문에 에러가 발생한다. 이때, `404.html`가 실행된다. 
