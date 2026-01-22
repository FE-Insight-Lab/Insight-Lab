import { ArticleCard } from '@/app/_components/article-card'
import { PageHeader } from '@/app/_components/page-header'
import { getArticles } from './_lib/notion/api'

export default async function Home() {
  const articles = await getArticles()
  return (
    <main className='mx-auto max-w-7xl px-6 py-12'>
      <PageHeader
        title='FE Insight Lab'
        subTitle='프론트엔드 기술 스터디 팀이 함께 공부하고 정리한 지식을 공유합니다'
      />

      <div className='mt-16'>
        <header className='flex-between-center'>
          <p className='text-medium text-sm leading-5 text-black'>학습 LOG</p>
        </header>

        <section className='mt-8 grid gap-6 md:grid-cols-3'>
          {articles.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </section>
      </div>
    </main>
  )
}
