import Image from 'next/image'

import { PageHeader } from '@/app/_components/page-header'
import { STUDY_WORKFLOW_STEPS, STUDY_CORE_VALUES } from '@/app/_constants/about'

/**
 * 스터디 핵심 가치 섹션 컴포넌트
 * @returns 스터디 핵심 가치 JSX 요소
 */
const StudyCoreValues = () => {
  return (
    <section className='mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-6'>
      {STUDY_CORE_VALUES.map(({ label, description, icon }) => (
        <div key={label} className='border-grey-300 rounded-2xl border p-6'>
          <div className='bg-icon-bg flex-center size-12 rounded-xl'>
            <Image src={icon} alt={label} width={24} height={24} />
          </div>
          <h4 className='mt-4 text-lg leading-7 font-medium text-black'>{label}</h4>
          <p className='text-grey-500 mt-2 text-base leading-6'>{description}</p>
        </div>
      ))}
    </section>
  )
}

/**
 * 스터디 진행 방식 섹션 컴포넌트
 * @returns 스터디 진행 방식 JSX 요소
 */
const StudyWorkflow = () => {
  return (
    <section className='mx-auto mt-20 max-w-3xl'>
      <h4 className='text-center text-2xl leading-8 font-medium'>스터디 진행 방식</h4>
      <div>
        {STUDY_WORKFLOW_STEPS.map(({ label, description }, index) => (
          <div key={label} className='mt-8 flex items-start gap-4'>
            <div className='flex-center size-8 rounded-full bg-blue-400 text-sm leading-5 font-medium text-white'>
              {index + 1}
            </div>

            <div>
              <h5 className='leading-6 font-medium text-black'>{label}</h5>
              <p className='text-grey-500 mt-1 leading-6'>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/**
 * 소개 페이지 컴포넌트
 * @returns 소개 페이지 JSX 요소
 */
export default function AboutPage() {
  return (
    <main className='mx-auto mb-20 max-w-7xl px-6 py-12'>
      <PageHeader
        title='FE Insight Lab 소개'
        subTitle={`프론트엔드 기술에 대한 열정을 가진 개발자들이 모여\r\n함께 공부하고 성장하는 스터디 그룹입니다.`}
      />
      <StudyCoreValues />
      <StudyWorkflow />
    </main>
  )
}
