'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { DUMMY_ARTICLES } from '@/app/_constants/dummy'
import { ROUTES } from '@/app/_constants/routes'
import { RelatedArticlesSection } from '@/app/articles/[articleId]/_components/related-articles-section'
import { ArticleContent } from '@/app/articles/[articleId]/_components/article-content'
import { ArticleHeader } from '@/app/articles/[articleId]/_components/article-header'

/**
 * 아티클 상세 페이지 컴포넌트
 * @returns 아티클 상세 페이지 JSX 요소
 */
export default function ArticlePage() {
  const { articleId } = useParams<{ articleId: string }>()

  // TODO: 실제 데이터 패칭 로직으로 대체 필요
  const dummyArticle = DUMMY_ARTICLES.find((article) => article.id === articleId)!

  return (
    <main className='flex-column mx-auto mb-20 max-w-3xl gap-8 px-6 py-12'>
      <Link href={ROUTES.HOME} className='flex-align-center gap-2'>
        <Image src='/icons/arrow-left.svg' alt='홈으로 돌아가기' width={16} height={16} />
        <span className='text-grey-500 text-sm leading-5'>목록으로</span>
      </Link>

      <ArticleHeader article={dummyArticle} />
      <Image
        src={dummyArticle.imageUrl}
        alt='게시글 썸네일'
        width={720}
        height={368}
        className='rounded-2xl'
      />
      <ArticleContent article={dummyArticle} />
      <RelatedArticlesSection />
    </main>
  )
}
