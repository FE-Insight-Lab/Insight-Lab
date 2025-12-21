interface PageHeaderProps {
  title: string
  subTitle: string
}

/**
 * 페이지 헤더 컴포넌트
 * @param title 제목
 * @param subTitle 부제목
 * @returns 페이지 헤더 JSX 요소
 */
export const PageHeader = ({ title, subTitle }: PageHeaderProps) => {
  return (
    <header>
      <h2 className='text-center text-5xl leading-12 font-bold text-black'>{title}</h2>
      <h3 className='text-grey-500 mt-4 text-center text-lg leading-7 whitespace-pre-line'>
        {subTitle}
      </h3>
    </header>
  )
}
