export interface ArticleCardType {
  id: string
  title: string
  author: string
  date: string
  tags: readonly string[]
  summary: string
  imageUrl: string
  content: string
}
