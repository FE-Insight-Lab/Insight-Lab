/**
 * 태그 스타일 맵
 */
const tagStyles = {
  lg: 'px-2.5 py-1.5 text-sm leading-5',
  sm: 'px-2.5 py-1 text-xs leading-4',
}

interface TagProps {
  tag: string
  size?: 'lg' | 'sm'
}

/**
 * 태그 컴포넌트
 * @param tag 태그 이름
 * @returns 태그 JSX 요소
 */
export const Tag = ({ tag, size = 'sm' }: TagProps) => {
  return (
    <li
      key={tag}
      className={`w-fit list-none rounded-[10px] bg-blue-100 text-blue-500 ${tagStyles[size]}`}
    >
      {tag}
    </li>
  )
}
