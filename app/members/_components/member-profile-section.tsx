import Image from 'next/image'

import { Tag } from '@/app/_components/tag'
import { MEMBER_PROFILES } from '@/app/_constants/members'

/**
 * 멤버 프로필 컴포넌트
 * @param profile 멤버 프로필 데이터
 * @returns 멤버 프로필 JSX 요소
 */
const MemberProfile = ({ profile }: { profile: (typeof MEMBER_PROFILES)[number] }) => {
  return (
    <article key={profile.name} className='flex-column rounded-2xl p-6'>
      <div className='flex items-start gap-4'>
        <Image
          src={profile.profileUrl}
          alt={`${profile.name}의 프로필 사진`}
          width={64}
          height={64}
          className='rounded-full border border-blue-100'
        />

        <div className='flex-column gap-1'>
          <h4 className='text-lg leading-7 font-medium text-black'>{profile.name}</h4>
          <p className='text-grey-500 text-sm leading-5'>{profile.goal}</p>
          <ul className='mt-2 flex gap-2'>
            {profile.tags.map((tag) => (
              <Tag tag={tag} key={tag} size='sm' />
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

/**
 * 멤버 프로필 리스트 섹션 컴포넌트
 * @returns 멤버 프로필 리스트 섹션 JSX 요소
 */
export const MemberProfileSection = () => {
  return (
    <section className='mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-6'>
      {MEMBER_PROFILES.map((profile) => (
        <MemberProfile key={profile.name} profile={profile} />
      ))}
    </section>
  )
}
