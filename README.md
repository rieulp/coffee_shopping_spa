# Vanilla JavaScript로 SPA 구현하기
- `Express`, `vanilla typescript`, `history API`, `Webpack` 사용
- SPA 라우팅 시스템 구현

> 프로그래머스 과제테스트 **커피 주문 페이지** 만들기 활용

## npm scripts
### 빌드
  `npm run build`

### 개발서버 실행
  `npm run dev`

### 실행
  `npm run start`

## proxy server
프로젝트에서 데이터를 요청할 때 동일 출처 정책(동일한 출처의 리소스에만 접근하도록 제한하는 것)으로 CORS 에러가 발생했다.

이를 해결하기위해 express로 간단한 proxy server를 만들었다 (`server.js` 파일)
> - CORS(Cross Origin Resource Sharing)
>
>   CORS는 한 도메인 또는 Origin의 웹 페이지가 다른 도메인 (도메인 간 요청)을 가진 리소스에 액세스 할 수 있게하는 보안 메커니즘
