import Image from 'next/image'
import Link from 'next/link'

import { ROUTES } from '@/app/_constants/routes'
import { DUMMY_ARTICLES } from '@/app/_constants/dummy'
import { Tag } from '@/app/_components/tag'
import { ArticleCardType } from '@/app/_types/article'

/**
 * 관련 아티클 컴포넌트
 * @param article 아티클 데이터
 * @returns 관련 아티클 JSX 요소
 */
const RelatedArticle = ({ article }: { article: ArticleCardType }) => {
  return (
    <Link
      href={ROUTES.ARTICLES(article.id)}
      key={article.title}
      className='hover:bg-grey-200 flex-align-center bg-grey-100 gap-4 rounded-xl p-4 transition-colors duration-200'
    >
      <Image
        src={article.imageUrl}
        alt={article.title}
        width={80}
        height={56}
        className='rounded-xl object-cover'
      />

      <div className='flex-column gap-1'>
        <h4 className='leading-6 font-medium text-black'>{article.title}</h4>
        <ul className='flex-align-center gap-2'>
          {article.tags.map((tag) => (
            <Tag tag={tag} key={tag} size='sm' />
          ))}
        </ul>
      </div>
    </Link>
  )
}

/**
 * 관련 아티클 섹션 컴포넌트
 * @returns 관련 아티클 섹션 JSX 요소
 */
export const RelatedArticlesSection = () => {
  // TODO: 실제 관련 아티클 데이터를 불러오는 로직으로 대체 필요

  return (
    <section className='flex-column border-t-grey-300 gap-6 border-t pt-12'>
      <h3 className='text-xl leading-7 font-medium text-black'>관련 글</h3>
      <div className='flex-column gap-4'>
        {DUMMY_ARTICLES.map((article) => (
          <RelatedArticle key={article.title} article={article} />
        ))}
      </div>
    </section>
  )
}
