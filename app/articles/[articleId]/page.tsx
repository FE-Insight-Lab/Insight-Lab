import NotionRenderer from '@/app/_components/notion/notion-renderer'
import { getArticleBlocks, getArticleMetadata } from '@/app/_lib/notion/api'
import { notFound } from 'next/navigation'
import { RelatedArticlesSection } from './_components/related-articles-section'
import { Suspense } from 'react'

async function ArticleBody({ articleId }: { articleId: string }) {
  const blocks = await getArticleBlocks(articleId)
  console.log(
    blocks.map((block) => {
      if (block.type === 'heading_1') console.log(block.heading_1)
    }),
  )
  if (!blocks) return null
  return <NotionRenderer blocks={blocks} />
}

/**
 * 아티클 상세 페이지 컴포넌트
 * @returns 아티클 상세 페이지 JSX 요소
 */

export default async function ArticlePage({ params }: { params: Promise<{ articleId: string }> }) {
  const { articleId } = await params
  const article = await getArticleMetadata(articleId)

  if (!article) notFound()

  return (
    <main className='mx-auto max-w-3xl px-6 py-12'>
      <header className='mb-12'>
        <h1 className='mb-4 text-4xl font-bold'>{article.title}</h1>
        <div className='flex gap-4 text-sm text-gray-500'>
          <span>{article.author}</span>
          <span>{article.date}</span>
        </div>
      </header>
      <article>
        <Suspense fallback={<div className='h-64 w-full animate-pulse rounded-lg bg-gray-100' />}>
          <ArticleBody articleId={articleId} />
        </Suspense>
      </article>
      <Suspense fallback={<div>loading ... </div>}>
        <RelatedArticlesSection tags={article.tags} currentId={articleId} />
      </Suspense>
    </main>
  )
}
