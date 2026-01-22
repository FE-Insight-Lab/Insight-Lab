import { BlockWithChildren } from '@/app/_lib/notion/api'
import Block from './block'

type GroupedBlock =
  | BlockWithChildren
  | { id: string; type: 'numbered_list_group' | 'bulleted_list_group'; items: BlockWithChildren[] }

// 1. noWrapper props 추가
export default function NotionRenderer({
  blocks,
  noWrapper = false,
}: {
  blocks: BlockWithChildren[]
  noWrapper?: boolean
}) {
  const groupedBlocks: GroupedBlock[] = []
  let currentList: {
    type: 'numbered_list_group' | 'bulleted_list_group'
    items: BlockWithChildren[]
  } | null = null

  blocks.forEach((block) => {
    const isNumbered = block.type === 'numbered_list_item'
    const isBulleted = block.type === 'bulleted_list_item'

    if (isNumbered || isBulleted) {
      const listType = isNumbered ? 'numbered_list_group' : 'bulleted_list_group'

      if (!currentList || currentList.type !== listType) {
        currentList = { type: listType, items: [block] }
        groupedBlocks.push({
          id: `group-${block.id}`,
          ...currentList,
        })
      } else {
        currentList.items.push(block)
      }
    } else {
      currentList = null
      groupedBlocks.push(block)
    }
  })

  // 2. 렌더링할 내용을 변수에 담음
  const content = groupedBlocks.map((group) => {
    if (
      'type' in group &&
      (group.type === 'numbered_list_group' || group.type === 'bulleted_list_group')
    ) {
      const Tag = group.type === 'numbered_list_group' ? 'ol' : 'ul'
      const listClass = group.type === 'numbered_list_group' ? 'list-decimal' : 'list-disc'

      return (
        <Tag key={group.id} className={`my-2 ml-5 ${listClass} space-y-1`}>
          {group.items.map((item) => (
            <Block key={item.id} block={item} isGrouped />
          ))}
        </Tag>
      )
    }
    return <Block key={group.id} block={group as BlockWithChildren} />
  })

  // 3. noWrapper 여부에 따라 다르게 반환
  if (noWrapper) {
    return <>{content}</> // div 없이 알맹이만 반환
  }

  return <div className='flex w-full flex-col'>{content}</div>
}
