import Image from 'next/image'
import Link from 'next/link'

import { Tag } from '@/app/_components/tag'
import { ROUTES } from '@/app/_constants/routes'
import { ArticleCardType } from '@/app/_types/article'

interface ArticleCardProps {
  article: ArticleCardType
}

const isUrl = (value: string) => {
  if (!value) return false

  if (value.startsWith('/')) return true

  if (value.startsWith('http://') || value.startsWith('https://')) return true

  return false
}

/**
 * 아티클 카드 컴포넌트
 * @param article 아티클 데이터
 * @returns 아티클 카드 JSX 요소
 */
export const ArticleCard = ({ article }: ArticleCardProps) => {
  const { imageUrl } = article
  const isImage = imageUrl && isUrl(imageUrl)

  return (
    <Link
      href={ROUTES.ARTICLES(article.id)}
      className='hover:shadow-card flex-column overflow-hidden rounded-2xl transition-shadow duration-200'
    >
      {isImage ? (
        <Image
          src={imageUrl}
          alt={article.title}
          width={368}
          height={207}
          className='h-51.75 w-full object-contain'
        />
      ) : (
        <div className='flex h-[207px] w-full items-center justify-center bg-gray-100'>
          <span className='text-7xl'>{imageUrl}</span>
        </div>
      )}

      <div className='flex-column grow p-5'>
        <div className='flex-column grow gap-2 overflow-hidden'>
          <ul className='over flow-x-auto flex gap-2'>
            {article.tags.map((tag) => (
              <Tag tag={tag} key={tag} size='sm' />
            ))}
          </ul>
          <h4 className='text-lg leading-6 font-bold text-black'>{article.title}</h4>
          <p className='text-grey-500 text-sm leading-5'>{article.summary}</p>
        </div>

        <footer className='text-grey-500 flex-between mt-4 text-xs leading-4'>
          <span>{article.author}</span>
          <span>{article.date}</span>
        </footer>
      </div>
    </Link>
  )
}
