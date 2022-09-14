// route : 경로, 서로 다른 네트워크 간 데이터를 전송하고 전송한 데이터를 받는 경로
// router: 한개의 인터넷 회신을 여러개의 네트워크가 사용할 수 있도록 쪼개주는, 중계역할을 해주는 장치
// routing: 엔트 포인트(URL)의 정의, 해당 엔드 포인트에 대한 클라이언트 요청에 애플리케이션이 응답하는 방식
interface Route {
  path: string | RegExp;
  view: any;
}

let router: Router | null = null;
export function initRouter($app: Element, routes: Route[]) {
  if (router) return router;
  router = new Router($app, routes);
  return router;
}
export function useRouter() {
  return router;
}
class Router {
  constructor(private $app: Element, private routes: Route[]) {
    window.addEventListener('DOMContentLoaded', () => {
      this.router();
    });
    window.addEventListener('popstate', () => {
      this.router();
    });
  }

  public router() {
    this.$app.innerHTML = '';
    const TargetPage = this.routes?.find((route) => {
      if (typeof route.path === 'string') return route.path === location.pathname;
      return route.path.test(location.pathname);
    })?.view;
    if (TargetPage) {
      new TargetPage({ $target: this.$app });
    }
  }

  public to(url: string) {
    history.pushState(null, '', url);
    this.router();
  }
}
