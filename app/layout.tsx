import type { Metadata } from 'next'

import '@/app/_styles/index.css'

import { Header } from '@/app/_components/header'
import { Footer } from '@/app/_components/footer'

export const metadata: Metadata = {
  title: 'Insight Lab',
  description: '네이버부스트캠프 웹・모바일 10기 프론트엔드 스터디 그룹의 지식 저장소',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ko'>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
