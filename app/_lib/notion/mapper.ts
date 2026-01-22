import { PageObjectResponse } from '@notionhq/client'
import { Article } from './types'

const NICKNAME_MAP: Record<string, string> = {
  재영이: '하니',
  이세비: '제리',
  김동균: '로키',
  '시영 이': '주디',
}

export const toNickname = (name: string): string => {
  return NICKNAME_MAP[name] || name
}

export const formatDate = (dateString: string): string => {
  const d = new Date(dateString)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')

  return `${year}.${month}.${day}`
}

export const extractImageUrl = (page: PageObjectResponse): string => {
  if (page.icon?.type === 'file') return page.icon.file.url
  if (page.icon?.type === 'emoji') return page.icon.emoji
  if (page.icon?.type === 'external') return page.icon.external.url
  return '/images/dummy-article.jpg'
}

export const toArticle = (page: PageObjectResponse): Article => {
  const prop = page.properties

  // 제목
  const titleProp = prop['제목']
  const title = titleProp?.type === 'title' ? titleProp.title[0]?.plain_text : '제목 없음'

  // 작성자
  const authorProp = prop['작성자']
  let rawAuthor = '익명'
  if (authorProp?.type === 'people' && authorProp.people.length > 0) {
    const user = authorProp.people[0]
    if ('name' in user && user.name) {
      rawAuthor = user.name
    }
  }

  // 기술 스택
  const tagProp = prop['기술 스택']
  const tags = tagProp?.type === 'multi_select' ? tagProp.multi_select.map((tag) => tag.name) : []

  //미리보기 설명
  const summaryProp = prop['미리보기 설명']
  const summary =
    summaryProp?.type === 'rich_text' && summaryProp.rich_text.length > 0
      ? summaryProp.rich_text[0].plain_text
      : title // 설명이 없으면 제목으로

  return {
    id: page.id,
    title: title || '제목 없음',
    author: toNickname(rawAuthor),
    date: formatDate(page.created_time),
    tags,
    summary: summary || '',
    imageUrl: extractImageUrl(page) || '',
    url: page.url,
  }
}
