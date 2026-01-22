import { NOTION_COLOR_MAP } from '@/app/_constants/notion'
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

export default function RichText({ text }: { text: RichTextItemResponse }) {
  if (!text) return null

  // 모든 타입(text, mention)에서 공통으로 사용하는 속성 추출
  const {
    annotations: { bold, code, italic, strikethrough, underline, color },
    plain_text,
    href,
  } = text
  //console.log(text)
  const className = [
    bold ? 'font-bold' : '',
    code ? 'bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm text-pink-500' : '',
    italic ? 'italic' : '',
    strikethrough ? 'line-through' : '',
    underline ? 'underline' : '',
    color !== 'default' ? NOTION_COLOR_MAP[color] : '',
  ]
    .filter(Boolean)
    .join(' ')

  // 링크가 있는 경우
  if (href) {
    return (
      <a
        href={href}
        className={`text-indigo-600 hover:underline ${className}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        {plain_text}
      </a>
    )
  }

  return <span className={className}>{plain_text}</span>
}
