import { Highlight, themes } from 'prism-react-renderer'
import RichText from './rich-text'
import NotionRenderer from './notion-renderer'
import Image from 'next/image'
import { NOTION_COLOR_MAP } from '@/app/_constants/notion'
import { BlockWithChildren } from '@/app/_lib/notion/api'

interface BlockProps {
  block: BlockWithChildren
  isGrouped?: boolean
}

export default function Block({ block, isGrouped }: BlockProps) {
  const { type } = block

  // 색상 클래스 헬퍼 (타입 안전)
  const getColorClass = (color: string | undefined) =>
    color && color !== 'default' ? NOTION_COLOR_MAP[color as keyof typeof NOTION_COLOR_MAP] : ''

  // 자식 블록 렌더링 헬퍼
  const renderChildren = (children?: BlockWithChildren[]) => {
    if (!children || children.length === 0) return null
    return (
      <div className='mt-1'>
        <NotionRenderer blocks={children} />
      </div>
    )
  }

  // 각 Case에서 block.type에 따라 데이터 구조가 정해집니다.
  switch (block.type) {
    case 'paragraph': {
      const v = block.paragraph
      return (
        <div className={`py-1 ${getColorClass(v.color)}`}>
          <p className='min-h-[1.5rem]'>
            {v.rich_text.map((text, i) => (
              <RichText key={i} text={text} />
            ))}
          </p>
          {renderChildren(v.children)}
        </div>
      )
    }

    case 'heading_1': {
      const v = block.heading_1
      return (
        <h1 className={`mt-8 mb-3 text-3xl font-bold ${getColorClass(v.color)}`}>
          {v.rich_text.map((text, i) => (
            <RichText key={i} text={text} />
          ))}
        </h1>
      )
    }

    case 'heading_2': {
      const v = block.heading_2
      return (
        <h2 className={`mt-6 mb-3 text-2xl font-bold ${getColorClass(v.color)}`}>
          {v.rich_text.map((text, i) => (
            <RichText key={i} text={text} />
          ))}
        </h2>
      )
    }

    case 'heading_3': {
      const v = block.heading_3
      return (
        <h3 className={`mt-4 mb-2 text-xl font-bold ${getColorClass(v.color)}`}>
          {v.rich_text.map((text, i) => (
            <RichText key={i} text={text} />
          ))}
        </h3>
      )
    }

    case 'bulleted_list_item': {
      const v = block.bulleted_list_item
      const content = (
        <>
          {v.rich_text.map((text, i) => (
            <RichText key={i} text={text} />
          ))}
          {renderChildren(v.children)}
        </>
      )
      return isGrouped ? (
        <li className={`py-1 ${getColorClass(v.color)}`}>{content}</li>
      ) : (
        <ul className='ml-5 list-disc'>
          <li className={`py-1 ${getColorClass(v.color)}`}>{content}</li>
        </ul>
      )
    }

    case 'numbered_list_item': {
      const v = block.numbered_list_item
      const content = (
        <>
          {v.rich_text.map((text, i) => (
            <RichText key={i} text={text} />
          ))}
          {renderChildren(v.children)}
        </>
      )
      return isGrouped ? (
        <li className={`py-1 ${getColorClass(v.color)}`}>{content}</li>
      ) : (
        <ol className='ml-5 list-decimal'>
          <li className={`py-1 ${getColorClass(v.color)}`}>{content}</li>
        </ol>
      )
    }

    case 'toggle': {
      const v = block.toggle
      return (
        <details className={`group my-2 w-full ${getColorClass(v.color)}`}>
          <summary className='flex cursor-pointer list-none items-center gap-2 py-1 transition-colors hover:bg-gray-50 focus:outline-none'>
            <svg
              className='h-4 w-4 text-gray-400 transition-transform group-open:rotate-90'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M9 5l7 7-7 7' />
            </svg>
            <div className='flex-1'>
              {v.rich_text.map((text, i) => (
                <RichText key={i} text={text} />
              ))}
            </div>
          </summary>
          <div className='mt-1 ml-[22px] border-l-2 border-gray-100 pl-4'>
            {renderChildren(v.children)}
          </div>
        </details>
      )
    }

    case 'code': {
      const v = block.code
      return (
        <div className='my-4 text-sm'>
          <Highlight
            theme={themes.palenight}
            code={v.rich_text[0]?.plain_text || ''}
            language={v.language === 'plain text' ? 'text' : v.language}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={`${className} overflow-auto rounded-lg p-4`} style={style}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      )
    }

    case 'image': {
      const v = block.image
      const src = v.type === 'external' ? v.external.url : v.file.url
      return (
        <figure className='my-6'>
          <div className='relative min-h-[300px] w-full'>
            <Image
              src={src}
              alt={v.caption?.[0]?.plain_text || 'notion image'}
              fill
              className='object-contain'
            />
          </div>
          {v.caption && v.caption.length > 0 && (
            <figcaption className='mt-2 text-center text-sm text-gray-500'>
              {v.caption[0].plain_text}
            </figcaption>
          )}
        </figure>
      )
    }

    case 'quote': {
      const v = block.quote
      if (!v) return null

      const vWithChildren = v as typeof v & { children?: BlockWithChildren[] }

      return (
        <blockquote
          className={`my-4 border-l-4 border-gray-300 bg-gray-50 py-2 pl-4 text-gray-700 italic ${getColorClass(v.color)}`}
        >
          {v.rich_text.map((text, i) => (
            <RichText key={i} text={text} />
          ))}
          {/* 이제 vWithChildren.children에 안전하게 접근 가능합니다. */}
          {renderChildren(vWithChildren.children)}
        </blockquote>
      )
    }

    case 'table': {
      const { table: v } = block
      if (!v) return null

      // children 타입을 위해 타입 단언 (BlockWithChildren 구조에 따라)
      const tableRows = (v.children as BlockWithChildren[]) || []

      return (
        <div className='my-4 w-full overflow-x-auto'>
          <table className='w-full table-fixed border-collapse border border-gray-300 text-sm'>
            <tbody className='divide-y divide-gray-300'>
              {/* noWrapper를 사용하여 <tbody> 바로 아래 <tr>이 오도록 함 */}
              <NotionRenderer blocks={tableRows} noWrapper />
            </tbody>
          </table>
        </div>
      )
    }

    case 'table_row': {
      const { table_row: v } = block
      if (!v) return null
      return (
        // <tbody> 바로 아래에는 반드시 <tr>이 와야 함
        <tr className='divide-x divide-gray-300'>
          {v.cells.map((cell, i) => (
            <td key={i} className='border border-gray-300 p-3 align-top break-words'>
              {cell.map((text, j) => (
                <RichText key={j} text={text} />
              ))}
            </td>
          ))}
        </tr>
      )
    }

    case 'divider':
      return <hr className='my-8 border-t border-gray-200' />

    default:
      return null
  }
}
