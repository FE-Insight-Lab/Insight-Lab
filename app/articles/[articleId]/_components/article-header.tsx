import { Tag } from '@/app/_components/tag'
import { ArticleCardType } from '@/app/_types/article'

/**
 * 아티클 헤더 컴포넌트
 * @param article 아티클 데이터
 * @returns 아티클 헤더 JSX 요소
 */
export const ArticleHeader = ({ article }: { article: ArticleCardType }) => {
  return (
    <header className='flex-column gap-4'>
      <ul className='flex-align-center gap-2'>
        {article.tags.map((tag) => (
          <Tag tag={tag} key={tag} size='lg' />
        ))}
      </ul>

      <h2 className='text-4xl leading-10 font-bold'>{article.title}</h2>

      <div className='text-grey-500 flex-align-center gap-4 text-sm leading-5'>
        <span>{article.author}</span>
        <span>·</span>
        <span>{article.date}</span>
      </div>
    </header>
  )
}
