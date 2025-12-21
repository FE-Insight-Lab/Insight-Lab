import { ArticleCardType } from '@/app/_types/article'

/**
 * 아티클 내용 컴포넌트
 * @param article 아티클 데이터
 * @returns 아티클 내용 JSX 요소
 */
export const ArticleContent = ({ article }: { article: ArticleCardType }) => {
  //TODO: 실제 데이터 구조에 맞게 수정 필요

  return (
    <section>
      {article.content.split('\n').map((paragraph, index) => (
        <p key={index} className='whitespace-pre-wrap text-black'>
          {paragraph}
        </p>
      ))}
    </section>
  )
}
