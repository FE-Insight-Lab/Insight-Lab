import Image from 'next/image'
import Link from 'next/link'

import { ROUTES } from '@/app/_constants/routes'
import { Tag } from '@/app/_components/tag'
//import { ArticleCardType } from '@/app/_types/article'
import { getRelatedArticles } from '@/app/_lib/notion/api'
import { Article } from '@/app/_lib/notion/types'
export type ArticleCardType = Article

/**
 * URL 여부를 확인하는 유틸리티 (ArticleCard와 로직 통일)
 */
const isUrl = (value?: string) => {
  if (!value) return false
  if (value.startsWith('/')) return true
  if (value.startsWith('http://') || value.startsWith('https://')) return true
  return false
}

/**
 * 관련 아티클 컴포넌트
 * @param article 아티클 데이터
 * @returns 관련 아티클 JSX 요소
 */
const RelatedArticle = ({ article }: { article: ArticleCardType }) => {
  const { imageUrl, title, id, tags } = article
  const isImage = isUrl(imageUrl)
  return (
    <Link
      href={ROUTES.ARTICLES(id)}
      className='hover:bg-grey-200 flex-align-center bg-grey-100 gap-4 rounded-xl p-4 transition-colors duration-200'
    >
      {/* 이미지 영역: URL이면 Image, 아니면 Placeholder div */}
      {isImage ? (
        <Image
          src={imageUrl}
          alt={title}
          width={80}
          height={56}
          className='h-14 w-20 shrink-0 rounded-xl object-contain'
        />
      ) : (
        <div className='flex h-14 w-20 shrink-0 items-center justify-center rounded-xl text-4xl'>
          <span>{imageUrl || '📄'}</span>
        </div>
      )}

      <div className='flex-column min-w-0 gap-1'>
        <h4 className='truncate leading-6 font-medium text-black'>{title}</h4>
        <ul className='flex-align-center gap-2 overflow-x-auto'>
          {tags.map((tag) => (
            <Tag tag={tag} key={tag} size='sm' />
          ))}
        </ul>
      </div>
    </Link>
  )
}

/**
 * 관련 아티클 섹션 컴포넌트
 * @param props tags: 현재 글의 태그 목록, currentId: 현재 글의 ID (제외용)
 * @returns 관련 아티클 섹션 JSX 요소
 */
export const RelatedArticlesSection = async ({
  tags,
  currentId,
}: {
  tags: string[]
  currentId: string
}) => {
  // TODO: 실제 관련 아티클 데이터를 불러오는 로직으로 대체 필요
  const relatedArticles = await getRelatedArticles(tags, currentId)
  if (!relatedArticles) return null
  return (
    <section className='flex-column border-t-grey-300 gap-6 border-t pt-12'>
      <h3 className='text-xl leading-7 font-medium text-black'>관련 글</h3>
      <div className='flex-column gap-4'>
        {relatedArticles.map((article) => (
          <RelatedArticle key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}
