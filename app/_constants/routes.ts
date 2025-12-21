/**
 * 애플리케이션 라우트 경로 상수
 */
export const ROUTES = {
  HOME: '/',
  MEMBERS: '/members',
  ABOUT: '/about',
  ARTICLES: (articleId: string) => `/articles/${articleId}`,
} as const
