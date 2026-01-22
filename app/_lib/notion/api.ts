import { notion } from './notion'
import { toArticle } from './mapper'
import { Article } from './types'
import { PageObjectResponse, BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { cache } from 'react'
import { unstable_cache } from 'next/cache'

export type BlockWithChildren = BlockObjectResponse & {
  paragraph?: { children?: BlockWithChildren[] }
  heading_1?: { children?: BlockWithChildren[] }
  heading_2?: { children?: BlockWithChildren[] }
  heading_3?: { children?: BlockWithChildren[] }
  bulleted_list_item?: { children?: BlockWithChildren[] }
  numbered_list_item?: { children?: BlockWithChildren[] }
  toggle?: { children?: BlockWithChildren[] }
  table?: { children?: BlockWithChildren[] }
}

const dataSourceId = process.env.NEXT_PUBLIC_NOTION_DATASOURCE_ID || ''

export async function getArticles(): Promise<Article[]> {
  try {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      //sorts: [{ timestamp: 'created_time', direction: 'descending' }],
    })

    return (response.results as PageObjectResponse[]).map(toArticle)
  } catch (error) {
    console.error('getArticles Error:', error)
    return []
  }
}

export const getArticleMetadata = cache(async (pageId: string) => {
  return await unstable_cache(
    async () => {
      const response = await notion.pages.retrieve({ page_id: pageId })
      return toArticle(response as PageObjectResponse)
    },
    [`metadata-${pageId}`],
    { revalidate: 3600 },
  )()
})

async function getAllChildBlocks(blockId: string): Promise<BlockWithChildren[]> {
  const blocks: BlockWithChildren[] = []
  let cursor: string | undefined

  while (true) {
    const { results, next_cursor, has_more } = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    })

    blocks.push(...(results as BlockWithChildren[]))

    if (!has_more) break
    cursor = next_cursor ?? undefined
  }

  return await Promise.all(
    blocks.map(async (block) => {
      if (!block.has_children) return block

      const children = await getAllChildBlocks(block.id)
      const type = block.type

      return {
        ...block,
        [block.type]: {
          ...(block[type as keyof BlockObjectResponse] as object),
          children,
        },
      }
    }),
  )
}

export const getArticleBlocks = cache(async (pageId: string): Promise<BlockWithChildren[]> => {
  return await unstable_cache(
    async () => {
      return await getAllChildBlocks(pageId)
    },
    [`blocks-${pageId}`],
    { revalidate: 3600 },
  )()
})

/**
 * 동일한 태그를 가진 관련 아티클 조회
 */
export const getRelatedArticles = async (
  tags: string[],
  currentArticleId: string,
): Promise<Article[]> => {
  if (tags.length === 0) return []

  try {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
    })

    // 모든 아티클을 변환
    const allArticles = (response.results as PageObjectResponse[]).map(toArticle)

    // 관련 글 필터링
    return allArticles
      .filter((article) => {
        // 현재 보고 있는 글은 제외
        const isNotCurrent = article.id !== currentArticleId

        // 현재 글의 태그 중 하나라도 포함되어 있는지 확인
        const hasCommonTag = article.tags.some((tag) => tags.includes(tag))

        return isNotCurrent && hasCommonTag
      })
      .slice(0, 4) // 최대 4개까지만 반환
  } catch (error) {
    console.error('getRelatedArticles Error:', error)
    return []
  }
}
