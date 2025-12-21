/**
 * 소개 아이템 배열
 */
export const STUDY_CORE_VALUES = [
  {
    label: '기술 학습',
    description: '최신 프론트엔드 기술을 함께 공부하고 깊이 있게 이해합니다.',
    icon: '/icons/technology.svg',
  },
  {
    label: '협업 성장',
    description: '서로의 지식을 공유하며 함께 성장하는 개발자 커뮤니티입니다.',
    icon: '/icons/collaboration.svg',
  },
  {
    label: '지식 아카이브',
    description: '배운 내용을 정리하고 기록하여 누구나 참고할 수 있게 공유합니다.',
    icon: '/icons/archive.svg',
  },
  {
    label: '실무 적용',
    description: '이론을 넘어 실제 프로젝트에 적용할 수 있는 실용적인 학습을 지향합니다.',
    icon: '/icons/practical.svg',
  },
] as const

/**
 * 스터디 진행 방식 배열
 */
export const STUDY_WORKFLOW_STEPS = [
  { label: '주제 선정', description: '매주 팀원들이 관심 있는 프론트엔드 기술 주제를 선정합니다.' },
  { label: '개인 학습 & 정리', description: '각자 주제에 대해 깊이 학습하고 Notion에 정리합니다.' },
  { label: '지식 공유', description: '정리한 내용을 팀원들과 공유하고 토론합니다.' },
  { label: '아카이브 발행', description: 'Notion API를 통해 이 사이트에 자동으로 게시됩니다.' },
] as const
