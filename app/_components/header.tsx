'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ROUTES } from '@/app/_constants/routes'

/**
 * 네비게이션 링크 배열
 */
const NAV_LINKS = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'Members', href: ROUTES.MEMBERS },
  { label: 'About', href: ROUTES.ABOUT },
] as const

/**
 * 현재 경로와 대상 링크를 비교하여 적절한 클래스 이름을 반환하는 함수
 * @param pathname 현재 경로
 * @param targetLink 대상 링크
 * @returns 링크의 현재 경로에 따른 클래스 이름 반환
 */
const getLinkClassName = (pathname: string, targetLink: string) => {
  if (pathname === targetLink) return 'text-black bg-grey-200 rounded-xl'
  return 'text-grey-500'
}

/**
 * 헤더 컴포넌트
 * @returns 헤더 JSX 요소
 */
export const Header = () => {
  const pathname = usePathname()

  return (
    <header className='border-b-grey-300 h-16 border-b'>
      <div className='flex-between-center mx-auto h-full max-w-7xl px-6'>
        <Link href={ROUTES.HOME}>
          <h1 className='text-xl leading-7 font-bold text-black'>FE Insight Lab</h1>
        </Link>

        <div className='flex gap-1'>
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`nav-hover px-4 py-2 text-sm leading-5 ${getLinkClassName(
                pathname,
                href,
              )}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
