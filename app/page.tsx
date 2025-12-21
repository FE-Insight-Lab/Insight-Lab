import { ArticleCard } from '@/app/_components/article-card'
import { PageHeader } from '@/app/_components/page-header'
import { DUMMY_ARTICLES } from '@/app/_constants/dummy'

export default async function Home() {
  return (
    <main className='mx-auto max-w-7xl px-6 py-12'>
      <PageHeader
        title='FE Insight Lab'
        subTitle='프론트엔드 기술 스터디 팀이 함께 공부하고 정리한 지식을 공유합니다'
      />

      <div className='mt-16'>
        <header className='flex-between-center'>
          <p className='text-medium text-sm leading-5 text-black'>학습 LOG</p>
          <p className='text-grey-500 text-sm leading-5'>총 N개의 글</p>
        </header>

        <section className='mt-8 grid grid-cols-3 gap-6'>
          {DUMMY_ARTICLES.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </section>
      </div>
    </main>
  )
}
