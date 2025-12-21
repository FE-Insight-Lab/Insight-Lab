import { PageHeader } from '@/app/_components/page-header'
import { MemberProfileSection } from '@/app/members/_components/member-profile-section'

/**
 * 스터디 멤버 페이지 컴포넌트
 * @returns 스터디 멤버 페이지 JSX 요소
 */
export default function MembersPage() {
  return (
    <main className='mx-auto mb-32 max-w-7xl px-6 py-12'>
      <PageHeader title='스터디 멤버' subTitle='함께 성장하는 프론트엔드 개발자들' />
      <MemberProfileSection />
    </main>
  )
}
