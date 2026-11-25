/* ==========================================================================
   나의 MBTI 성격유형 테스트 - 스크립트 (script.js)
   초보자도 쉽게 질문과 결과를 수정할 수 있도록 데이터와 기능을 분리해 구성했습니다.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. 지표 정보 설정 (질문 상단 배지 및 결과 그래프에 사용됩니다)
   -------------------------------------------------------------------------- */
const DIMENSION_INFO = {
  EI: {
    label: '에너지 방향 · E / I',
    left: { code: 'E', name: '외향형' },
    right: { code: 'I', name: '내향형' }
  },
  SN: {
    label: '인식 방식 · S / N',
    left: { code: 'S', name: '감각형' },
    right: { code: 'N', name: '직관형' }
  },
  TF: {
    label: '판단 기준 · T / F',
    left: { code: 'T', name: '사고형' },
    right: { code: 'F', name: '감정형' }
  },
  JP: {
    label: '생활 양식 · J / P',
    left: { code: 'J', name: '판단형' },
    right: { code: 'P', name: '인식형' }
  }
};

/* --------------------------------------------------------------------------
   2. 질문 데이터 (총 48문항: E/I 12개, S/N 12개, T/F 12개, J/P 12개)
   - 각 질문의 text와 choices를 원하는 문장으로 자유롭게 수정할 수 있습니다.
   - choices의 value는 해당 선택지가 반영하는 MBTI 글자('E','I','S','N','T','F','J','P')입니다.
   -------------------------------------------------------------------------- */
const QUESTIONS = [
  // ==================== [1] E / I 지표 (12문항) ====================
  {
    id: 1,
    dimension: 'EI',
    question: '오랜만에 아무 약속도 없는 주말이 생겼을 때, 나는 주로 어떻게 보내나요?',
    choices: [
      { text: '친구들에게 연락해 같이 맛있는 걸 먹거나 밖에 나가 놀고 싶다.', value: 'E' },
      { text: '집에서 좋아하는 영상이나 책을 보며 혼자만의 휴식을 즐긴다.', value: 'I' }
    ]
  },
  {
    id: 2,
    dimension: 'EI',
    question: '새 학기나 새 모임에서 처음 보는 사람들 사이에 앉게 되었을 때 나는?',
    choices: [
      { text: '옆 사람에게 먼저 가볍게 말을 걸며 분위기를 풀어 나간다.', value: 'E' },
      { text: '상대가 먼저 말을 걸어 줄 때까지 조용히 주변 분위기를 살핀다.', value: 'I' }
    ]
  },
  {
    id: 3,
    dimension: 'EI',
    question: '하루 종일 바쁘고 피곤했던 날, 에너지를 회복하는 나만의 방법은?',
    choices: [
      { text: '친한 사람과 수다를 떨거나 통화하면서 스트레스를 푼다.', value: 'E' },
      { text: '조용한 방에서 누구의 방해도 받지 않고 혼자 쉬며 충전한다.', value: 'I' }
    ]
  },
  {
    id: 4,
    dimension: 'EI',
    question: '여러 명이 모인 회식이나 파티 자리에서 나의 모습에 더 가까운 것은?',
    choices: [
      { text: '다양한 사람들과 두루두루 이야기하며 활기를 얻는다.', value: 'E' },
      { text: '마음이 잘 맞는 소수의 사람과 조용히 깊은 대화를 나눈다.', value: 'I' }
    ]
  },
  {
    id: 5,
    dimension: 'EI',
    question: '고민이 생기거나 머릿속이 복잡할 때, 나는 보통 어떻게 정리하나요?',
    choices: [
      { text: '다른 사람에게 말로 털어놓으면서 생각을 정리하는 편이다.', value: 'E' },
      { text: '혼자 산책하거나 메모를 쓰며 내면에서 먼저 정리하는 편이다.', value: 'I' }
    ]
  },
  {
    id: 6,
    dimension: 'EI',
    question: '학교나 직장에서 팀 프로젝트를 진행할 때 더 편한 역할은?',
    choices: [
      { text: '팀원들과 활발히 의견을 주고받고 발표를 맡는 역할이 편하다.', value: 'E' },
      { text: '맡은 파트를 조용히 집중해서 조사하고 정리하는 역할이 편하다.', value: 'I' }
    ]
  },
  {
    id: 7,
    dimension: 'EI',
    question: '친구의 친구가 갑자기 합석하게 되었을 때 나의 속마음은?',
    choices: [
      { text: '새로운 사람을 알게 되어 반갑고 어떤 사람인지 궁금해진다.', value: 'E' },
      { text: '괜히 어색해질 것 같아 살짝 긴장되고 에너지가 쓰인다.', value: 'I' }
    ]
  },
  {
    id: 8,
    dimension: 'EI',
    question: '인간관계에서 내가 더 선호하는 친구 관계의 형태는?',
    choices: [
      { text: '여러 모임에 속해 폭넓게 어울리는 활발한 인간관계가 좋다.', value: 'E' },
      { text: '소수의 아주 친한 친구들과 오래 깊게 만나는 관계가 좋다.', value: 'I' }
    ]
  },
  {
    id: 9,
    dimension: 'EI',
    question: '갑자기 연락이 와서 "지금 잠깐 나올래?"라고 친구가 물었을 때 나는?',
    choices: [
      { text: '특별한 일정이 없으면 반가운 마음으로 금방 준비해서 나간다.', value: 'E' },
      { text: '이미 집에서 쉴 마음의 준비를 해서 다음으로 미루고 싶어진다.', value: 'I' }
    ]
  },
  {
    id: 10,
    dimension: 'EI',
    question: '새로운 취미를 시작한다면 어떤 환경이 더 끌리나요?',
    choices: [
      { text: '동호회나 원데이 클래스처럼 여럿이 함께 배우는 환경', value: 'E' },
      { text: '온라인 강의나 책을 보며 내 속도에 맞춰 혼자 배우는 환경', value: 'I' }
    ]
  },
  {
    id: 11,
    dimension: 'EI',
    question: '대화할 때 나의 말하기 스타일에 더 가까운 것은?',
    choices: [
      { text: '생각이 떠오르는 대로 바로바로 말하며 대화를 이어가는 편이다.', value: 'E' },
      { text: '머릿속으로 할 말을 한 번 정리한 뒤에 신중하게 꺼내는 편이다.', value: 'I' }
    ]
  },
  {
    id: 12,
    dimension: 'EI',
    question: '여행을 떠난다면 어떤 방식의 여행이 더 즐겁게 느껴지나요?',
    choices: [
      { text: '현지 사람들과 어울리거나 활기찬 명소를 둘러보는 시끌벅적한 여행', value: 'E' },
      { text: '한적한 풍경을 바라보며 여유롭게 사색할 수 있는 조용한 여행', value: 'I' }
    ]
  },

  // ==================== [2] S / N 지표 (12문항) ====================
  {
    id: 13,
    dimension: 'SN',
    question: '새로운 전자기기나 가구를 샀을 때, 나는 어떻게 사용을 시작하나요?',
    choices: [
      { text: '설명서를 차례대로 읽고 정확한 방법대로 조립하고 설정한다.', value: 'S' },
      { text: '대략적인 구조를 보고 직감적으로 먼저 만져보며 익힌다.', value: 'N' }
    ]
  },
  {
    id: 14,
    dimension: 'SN',
    question: '친구에게 어제 있었던 재미있는 일을 이야기할 때 나의 방식은?',
    choices: [
      { text: '언제, 어디서, 누가 무엇을 했는지 구체적인 사실 위주로 말한다.', value: 'S' },
      { text: '그때 느낀 분위기나 비유를 섞어 전체적인 인상을 생생하게 말한다.', value: 'N' }
    ]
  },
  {
    id: 15,
    dimension: 'SN',
    question: '영화를 보고 난 뒤 친구와 이야기를 나눌 때 더 흥미로운 주제는?',
    choices: [
      { text: '인상 깊었던 명장면, 배우의 연기, 현실적인 연출 디테일', value: 'S' },
      { text: '결말에 담긴 숨은 의미, 세계관의 가능성, 또 다른 전개 상상', value: 'N' }
    ]
  },
  {
    id: 16,
    dimension: 'SN',
    question: '처음 가보는 식당에서 메뉴를 고를 때 나는 어떤 편인가요?',
    choices: [
      { text: '후기가 검증된 대표 메뉴나 익숙하게 맛있을 것 같은 메뉴를 고른다.', value: 'S' },
      { text: '이름이 독특하거나 한 번도 먹어보지 못한 새로운 조합에 끌린다.', value: 'N' }
    ]
  },
  {
    id: 17,
    dimension: 'SN',
    question: '시험 공부나 업무 매뉴얼을 익힐 때 더 잘 이해되는 방식은?',
    choices: [
      { text: '구체적인 예시와 실제 사례를 하나씩 확인하며 차근차근 외운다.', value: 'S' },
      { text: '전체적인 큰 흐름과 핵심 원리를 먼저 파악한 뒤 세부 내용을 붙인다.', value: 'N' }
    ]
  },
  {
    id: 18,
    dimension: 'SN',
    question: '평소 혼자 걷거나 버스를 타고 갈 때 머릿속에 더 자주 떠오르는 생각은?',
    choices: [
      { text: '오늘 해야 할 일, 저녁 메뉴, 방금 지나친 풍경 같은 현실적인 생각', value: 'S' },
      { text: '"만약 ~라면 어떨까?" 같은 엉뚱한 상상이나 미래에 대한 아이디어', value: 'N' }
    ]
  },
  {
    id: 19,
    dimension: 'SN',
    question: '새로운 프로젝트 아이디어를 낼 때 내가 더 중요하게 보는 것은?',
    choices: [
      { text: '지금 가진 예산과 시간 안에 실제로 구현 가능한 현실성', value: 'S' },
      { text: '기존에 없던 신선한 발상과 앞으로 확장될 수 있는 가능성', value: 'N' }
    ]
  },
  {
    id: 20,
    dimension: 'SN',
    question: '누군가에게 길을 알려줄 때 내가 더 자주 사용하는 표현은?',
    choices: [
      { text: '"사거리에서 우회전해서 200m 직진하면 편의점 옆 건물이에요."', value: 'S' },
      { text: '"큰길 따라 쭉 내려가다 보면 분위기가 탁 트이는 골목 근처예요."', value: 'N' }
    ]
  },
  {
    id: 21,
    dimension: 'SN',
    question: '내가 더 신뢰하는 정보나 조언의 형태는?',
    choices: [
      { text: '직접 경험해 봤거나 수치와 근거로 확실히 검증된 정보', value: 'S' },
      { text: '앞으로의 흐름을 꿰뚫어 보는 통찰력과 새로운 관점의 조언', value: 'N' }
    ]
  },
  {
    id: 22,
    dimension: 'SN',
    question: '요리를 할 때 나의 스타일에 더 가까운 것은?',
    choices: [
      { text: '레시피에 적힌 계량과 순서를 최대한 정확하게 지키려고 한다.', value: 'S' },
      { text: '기본 맛만 참고하고 집에 있는 재료로 내 느낌대로 변형해 본다.', value: 'N' }
    ]
  },
  {
    id: 23,
    dimension: 'SN',
    question: '누군가 "사과"라는 단어를 말했을 때 가장 먼저 떠오르는 것은?',
    choices: [
      { text: '빨갛고 아삭한 과일 사과의 모양과 달콤한 맛', value: 'S' },
      { text: '백설공주, 뉴턴의 만유인력, IT 브랜드 로고 등 연상되는 이야기', value: 'N' }
    ]
  },
  {
    id: 24,
    dimension: 'SN',
    question: '미래를 계획할 때 나의 시선은 보통 어디에 머무르나요?',
    choices: [
      { text: '당장 이번 달과 올해에 이룰 수 있는 구체적이고 실질적인 목표', value: 'S' },
      { text: '5년, 10년 뒤 내가 그려나갈 큰 비전과 삶의 방향성', value: 'N' }
    ]
  },

  // ==================== [3] T / F 지표 (12문항) ====================
  {
    id: 25,
    dimension: 'TF',
    question: '친구가 "나 오늘 시험 망친 것 같아 너무 속상해"라고 말했을 때 첫 반응은?',
    choices: [
      { text: '"어느 과목이 어려웠어? 다음 시험은 어떻게 대비하면 좋을까?"', value: 'T' },
      { text: '"열심히 준비했는데 정말 속상하겠다. 오늘 맛있는 거 먹으러 갈까?"', value: 'F' }
    ]
  },
  {
    id: 26,
    dimension: 'TF',
    question: '팀 회의에서 두 가지 의견이 팽팽하게 맞설 때, 내가 더 중시하는 기준은?',
    choices: [
      { text: '누구의 의견이든 논리적으로 가장 효율적이고 타당한 방안인지', value: 'T' },
      { text: '팀원 모두가 상처받지 않고 화합하며 함께할 수 있는 방안인지', value: 'F' }
    ]
  },
  {
    id: 27,
    dimension: 'TF',
    question: '친구가 새로 산 옷이 솔직히 잘 안 어울린다고 생각될 때 나는?',
    choices: [
      { text: '친구를 위해 솔직하게 다른 색이나 핏이 더 잘 어울릴 것 같다고 말한다.', value: 'T' },
      { text: '기분이 상할까 봐 장점을 먼저 찾아 칭찬하며 기분 좋게 말해준다.', value: 'F' }
    ]
  },
  {
    id: 28,
    dimension: 'TF',
    question: '중요한 결정을 내려야 할 때 내가 최종적으로 더 의지하는 것은?',
    choices: [
      { text: '장단점을 객관적으로 비교 분석한 합리적인 결론', value: 'T' },
      { text: '나와 주변 사람들의 마음과 가치관에 맞는지 느껴지는 진심', value: 'F' }
    ]
  },
  {
    id: 29,
    dimension: 'TF',
    question: '누군가 나에게 솔직한 피드백을 해줄 때 더 도움이 된다고 느끼는 방식은?',
    choices: [
      { text: '개선할 점을 돌려 말하지 않고 명확하고 객관적으로 짚어주는 피드백', value: 'T' },
      { text: '나의 노력을 먼저 인정해 주고 부드럽게 격려하며 건네는 피드백', value: 'F' }
    ]
  },
  {
    id: 30,
    dimension: 'TF',
    question: '감동적인 드라마나 슬픈 뉴스를 볼 때 나의 반응에 더 가까운 것은?',
    choices: [
      { text: '상황의 원인이나 배경을 차분히 생각하며 객관적으로 바라보는 편이다.', value: 'T' },
      { text: '주인공의 감정에 깊이 몰입해 쉽게 눈시울이 붉어지거나 마음이 쓰인다.', value: 'F' }
    ]
  },
  {
    id: 31,
    dimension: 'TF',
    question: '친구와 사소한 오해로 다투었을 때, 먼저 해결하고 싶은 부분은?',
    choices: [
      { text: '어디서부터 오해가 생겼는지 사실관계를 차근차근 정리하는 것', value: 'T' },
      { text: '서로 서운했던 감정을 먼저 달래고 마음을 푸는 것', value: 'F' }
    ]
  },
  {
    id: 32,
    dimension: 'TF',
    question: '다른 사람에게 듣고 싶은 칭찬은 어느 쪽에 더 가까운가요?',
    choices: [
      { text: '"넌 정말 똑똑하고 일 처리가 깔끔해서 믿음이 가."', value: 'T' },
      { text: '"넌 정말 따뜻하고 배려심이 깊어서 같이 있으면 편해."', value: 'F' }
    ]
  },
  {
    id: 33,
    dimension: 'TF',
    question: '조별 과제에서 한 팀원이 약속된 분량을 해오지 않았을 때 나의 반응은?',
    choices: [
      { text: '남은 일정에 차질이 없도록 역할을 재분배하고 기준을 분명히 한다.', value: 'T' },
      { text: '무슨 개인적인 사정이 있었는지 먼저 물어보고 마음을 살펴본다.', value: 'F' }
    ]
  },
  {
    id: 34,
    dimension: 'TF',
    question: '선물을 고를 때 내가 더 신경 쓰는 포인트는?',
    choices: [
      { text: '상대방이 일상에서 실제로 자주 쓸 수 있는 실용성과 가성비', value: 'T' },
      { text: '상대방이 받았을 때 감동할 만한 정성과 따뜻한 의미', value: 'F' }
    ]
  },
  {
    id: 35,
    dimension: 'TF',
    question: '규칙을 어긴 사람이 안타까운 사정을 이야기할 때 나의 판단은?',
    choices: [
      { text: '사정은 안타깝지만 형평성을 위해 원칙과 규칙을 지키는 것이 옳다.', value: 'T' },
      { text: '어쩔 수 없는 상황이었다면 규칙을 조금 유연하게 적용해도 괜찮다.', value: 'F' }
    ]
  },
  {
    id: 36,
    dimension: 'TF',
    question: '토론이나 논쟁을 할 때 내가 더 중요하게 여기는 태도는?',
    choices: [
      { text: '감정을 배제하고 정확한 근거로 옳고 그름을 분명히 가리는 것', value: 'T' },
      { text: '서로의 입장을 존중하며 분위기가 날카로워지지 않도록 배려하는 것', value: 'F' }
    ]
  },

  // ==================== [4] J / P 지표 (12문항) ====================
  {
    id: 37,
    dimension: 'JP',
    question: '친구들과 2박 3일 여행을 준비할 때 나의 모습은?',
    choices: [
      { text: '숙소, 맛집, 이동 동선까지 시간대별로 꼼꼼하게 일정표를 짠다.', value: 'J' },
      { text: '큰 틀만 정해 두고 현지에 도착해 기분과 상황에 따라 움직인다.', value: 'P' }
    ]
  },
  {
    id: 38,
    dimension: 'JP',
    question: '마감 기한이 일주일 남은 과제나 업무가 주어졌을 때 나는?',
    choices: [
      { text: '매일 해야 할 분량을 미리 나누어 마감 전에 여유롭게 끝내 둔다.', value: 'J' },
      { text: '마감이 다가올수록 집중력이 폭발해 마지막에 몰아서 완성한다.', value: 'P' }
    ]
  },
  {
    id: 39,
    dimension: 'JP',
    question: '평소 내 책상이나 스마트폰 바탕화면의 상태에 더 가까운 것은?',
    choices: [
      { text: '폴더와 물건들이 제자리에 깔끔하게 분류되어 있어야 마음이 편하다.', value: 'J' },
      { text: '조금 흩어져 있어도 내가 어디에 두었는지 알면 크게 신경 쓰지 않는다.', value: 'P' }
    ]
  },
  {
    id: 40,
    dimension: 'JP',
    question: '약속했던 계획이 당일 갑작스럽게 바뀌게 되었을 때 나의 기분은?',
    choices: [
      { text: '미리 세워둔 흐름이 틀어져서 살짝 당황스럽고 스트레스를 받는다.', value: 'J' },
      { text: '오히려 예상치 못한 새로운 재미가 생길 수 있어 유연하게 받아들인다.', value: 'P' }
    ]
  },
  {
    id: 41,
    dimension: 'JP',
    question: '쇼핑하러 마트나 백화점에 갔을 때 나의 행동 패턴은?',
    choices: [
      { text: '살 목록을 미리 적어 가서 필요한 물건만 빠르게 구매하고 나온다.', value: 'J' },
      { text: '이것저것 구경하다가 눈에 띄고 마음에 드는 물건을 즉흥적으로 산다.', value: 'P' }
    ]
  },
  {
    id: 42,
    dimension: 'JP',
    question: '할 일이 여러 가지 쌓여 있을 때 내가 일하는 순서는?',
    choices: [
      { text: '체크리스트를 작성하고 우선순위대로 하나씩 끝내며 지워 나간다.', value: 'J' },
      { text: '그때그때 가장 손이 가거나 흥미로운 일부터 자유롭게 처리한다.', value: 'P' }
    ]
  },
  {
    id: 43,
    dimension: 'JP',
    question: '내일 아침 중요한 약속이나 외출이 있을 때 전날 밤 나의 습관은?',
    choices: [
      { text: '입을 옷과 챙길 물건을 미리 꺼내 두고 알람까지 확인한 뒤 잔다.', value: 'J' },
      { text: '아침에 일어나서 날씨와 기분을 보고 옷을 고르고 가방을 챙긴다.', value: 'P' }
    ]
  },
  {
    id: 44,
    dimension: 'JP',
    question: '결정을 내려야 할 때 나의 마음이 더 편안해지는 순간은?',
    choices: [
      { text: '빨리 확실하게 결론을 정하고 다음 단계로 넘어갈 때', value: 'J' },
      { text: '더 좋은 선택지가 나올 수 있으니 여지를 열어 두고 천천히 볼 때', value: 'P' }
    ]
  },
  {
    id: 45,
    dimension: 'JP',
    question: '하루 일과를 보내는 방식 중 나에게 더 잘 맞는 것은?',
    choices: [
      { text: '정해진 루틴과 시간표 안에서 규칙적으로 움직이는 하루', value: 'J' },
      { text: '틀에 얽매이지 않고 컨디션에 따라 자유롭게 조절하는 하루', value: 'P' }
    ]
  },
  {
    id: 46,
    dimension: 'JP',
    question: '공부나 일을 할 때 휴식을 취하는 나의 방식은?',
    choices: [
      { text: '정해둔 목표 분량을 먼저 다 끝낸 뒤에 마음 편하게 쉰다.', value: 'J' },
      { text: '중간중간 쉬고 싶을 때 쉬면서 자유롭게 리듬을 조절한다.', value: 'P' }
    ]
  },
  {
    id: 47,
    dimension: 'JP',
    question: '새로운 프로젝트나 동아리를 시작할 때 내가 먼저 하고 싶은 일은?',
    choices: [
      { text: '전체 일정표와 목표 달성 로드맵부터 체계적으로 정리한다.', value: 'J' },
      { text: '일단 재미있어 보이는 아이디어부터 가볍게 시도해 보며 방향을 찾는다.', value: 'P' }
    ]
  },
  {
    id: 48,
    dimension: 'JP',
    question: '여행지에서 가려던 맛집이 갑자기 휴무일 때 나의 대처는?',
    choices: [
      { text: '미리 찾아두었던 플랜 B 식당 리스트를 꺼내 바로 이동한다.', value: 'J' },
      { text: '근처 골목을 걷다가 분위기 좋아 보이는 식당에 즉흥적으로 들어간다.', value: 'P' }
    ]
  }
];

/* --------------------------------------------------------------------------
   3. 16가지 MBTI 결과 설명 데이터
   - 각 유형의 이름, 키워드, 요약, 강점, 주의할 점, 대인관계, 공부/업무 스타일을
     자유롭게 수정할 수 있습니다.
   -------------------------------------------------------------------------- */
const MBTI_RESULTS = {
  ISTJ: {
    name: '청렴결백한 논리주의자',
    tags: ['#책임감최고', '#계획적실행', '#신뢰의아이콘'],
    summary:
      '한 번 맡은 일은 끝까지 정확하게 해내는 성실하고 믿음직한 유형입니다. 사실과 원칙을 중시하며, 안정적이고 체계적인 환경에서 뛰어난 집중력을 발휘합니다.',
    strengths: [
      '약속과 마감 기한을 철저하게 지켜 주변의 두터운 신뢰를 얻습니다.',
      '감정에 흔들리지 않고 사실과 근거를 바탕으로 차분하게 판단합니다.',
      '세부 사항을 꼼꼼히 챙겨 실수가 적고 완성도 높은 결과를 만듭니다.'
    ],
    cautions: [
      '예상치 못한 변화나 갑작스러운 계획 수정에 스트레스를 받을 수 있습니다.',
      '본인의 기준이 높다 보니 스스로와 타인에게 지나치게 엄격해질 때가 있습니다.',
      '감정 표현이 서툴러 본심보다 차갑게 오해받지 않도록 가끔 따뜻한 말을 건네보세요.'
    ],
    relationships:
      '겉으로는 과묵하고 신중해 보이지만, 한 번 마음을 연 사람에게는 변함없는 의리와 진심을 보여줍니다. 화려한 말보다 꾸준한 행동으로 애정을 표현하는 든든한 친구입니다.',
    workStyle:
      '명확한 목표와 단계별 계획이 있을 때 최고의 효율을 냅니다. 체크리스트를 활용해 핵심 내용을 반복 정리하고, 조용하고 정돈된 공간에서 혼자 집중하는 공부·업무 방식이 잘 맞습니다.'
  },

  ISFJ: {
    name: '용감한 수호자',
    tags: ['#섬세한배려', '#따뜻한성실함', '#기억력장인'],
    summary:
      '조용하지만 깊은 따뜻함으로 주변 사람들을 세심하게 챙기는 유형입니다. 맡은 책임을 묵묵히 완수하며, 상대방의 작은 변화와 필요를 빠르게 알아차립니다.',
    strengths: [
      '타인의 입장을 깊이 헤아려 배려심 넘치는 말과 행동을 실천합니다.',
      '성실하고 인내심이 강해 반복적이거나 세밀한 작업도 끝까지 해냅니다.',
      '주변 사람들과의 소중한 기억과 약속을 잘 챙겨 안정감을 줍니다.'
    ],
    cautions: [
      '남의 부탁을 쉽게 거절하지 못해 혼자 무리하다 지칠 수 있습니다.',
      '갈등을 피하려다 자신의 서운함이나 의견을 속으로만 쌓아두기 쉽습니다.',
      '때로는 다른 사람보다 나 자신의 휴식과 감정을 최우선으로 챙기는 연습이 필요합니다.'
    ],
    relationships:
      '먼저 다가가기까지는 시간이 조금 걸리지만, 가까워지면 누구보다 다정하고 헌신적인 편입니다. 상대의 사소한 취향까지 기억해 챙겨주는 모습에 주변 사람들이 큰 감동을 받습니다.',
    workStyle:
      '체계적인 일정 안에서 차근차근 준비할 때 안정적인 성과를 냅니다. 구체적인 예시와 기출 문제 위주로 꼼꼼히 정리하는 스타일이며, 서로 협력하고 존중하는 분위기에서 능률이 크게 오릅니다.'
  },

  INFJ: {
    name: '선의의 옹호자',
    tags: ['#깊은통찰력', '#따뜻한이상주의', '#진정성'],
    summary:
      '조용한 겉모습 속에 단단한 신념과 깊은 통찰력을 품고 있는 유형입니다. 사람과 세상의 본질을 이해하려 노력하며, 의미 있는 가치를 실현하는 데 큰 보람을 느낍니다.',
    strengths: [
      '상대방의 말 너머에 있는 진심과 감정의 흐름을 예리하게 파악합니다.',
      '장기적인 비전을 세우고 차분하게 목표를 향해 나아가는 추진력이 있습니다.',
      '공감 능력과 창의력이 조화를 이루어 깊이 있는 아이디어를 제시합니다.'
    ],
    cautions: [
      '완벽주의 성향과 높은 이상 때문에 스스로를 과도하게 몰아붙일 수 있습니다.',
      '타인의 감정을 지나치게 떠안아 마음의 피로가 쉽게 쌓일 수 있습니다.',
      '생각이 너무 많아 실행이 늦어질 때는 완벽하지 않아도 먼저 한 걸음 내딛어 보세요.'
    ],
    relationships:
      '가벼운 만남보다 가치관과 마음을 깊이 나눌 수 있는 진솔한 관계를 소중히 여깁니다. 상대의 고민을 진심으로 들어주는 훌륭한 조언자이지만, 혼자 재충전하는 시간도 꼭 필요합니다.',
    workStyle:
      '단순 암기보다 "왜?"라는 원리와 전체적인 의미를 이해할 때 기억이 오래 남습니다. 조용한 환경에서 깊이 몰입해 글쓰기, 기획, 분석처럼 창의성과 체계가 함께 필요한 과제에 강점을 보입니다.'
  },

  INTJ: {
    name: '용의주도한 전략가',
    tags: ['#명석한전략가', '#독립적사고', '#큰그림설계'],
    summary:
      '날카로운 분석력과 장기적인 안목으로 문제를 해결하는 전략가 유형입니다. 기존의 방식에 안주하지 않고, 더 효율적이고 합리적인 구조를 스스로 설계하는 것을 즐깁니다.',
    strengths: [
      '복잡한 문제의 핵심을 빠르게 파악하고 체계적인 해결 전략을 세웁니다.',
      '독립심이 강하고 자기 주도적이어서 스스로 목표를 설정하고 달성합니다.',
      '객관적이고 일관된 기준으로 판단하여 흔들림 없는 결단력을 보입니다.'
    ],
    cautions: [
      '효율과 논리를 중시하다 보니 상대방의 감정적인 부분을 놓칠 수 있습니다.',
      '자신의 기준에 맞지 않는 비효율적인 상황에 쉽게 답답함을 느낍니다.',
      '다른 사람의 속도와 관점을 존중하며 부드럽게 소통하려는 노력이 더해지면 더욱 빛납니다.'
    ],
    relationships:
      '넓은 인맥보다는 지적 호기심과 대화가 잘 통하는 소수의 사람들과 깊은 유대를 맺습니다. 표현이 담백할 뿐, 진심으로 아끼는 사람에게는 실질적인 도움과 변함없는 신뢰를 보냅니다.',
    workStyle:
      '전체 개념의 구조를 머릿속에 지도로 그린 뒤 핵심 원리를 파고드는 방식이 탁월합니다. 자율성이 보장되고 명확한 성취 기준이 있는 환경에서 압도적인 집중력과 성과를 발휘합니다.'
  },

  ISTP: {
    name: '만능 재주꾼',
    tags: ['#쿨한문제해결사', '#실용적감각', '#유연한집중력'],
    summary:
      '상황을 냉철하게 관찰하고 손재주와 순발력으로 문제를 해결하는 실용주의자입니다. 불필요한 형식보다 실제 작동을 중시하며, 위기 상황에서도 침착함을 잃지 않습니다.',
    strengths: [
      '예상치 못한 돌발 상황에서도 당황하지 않고 빠르게 해결책을 찾아냅니다.',
      '복잡한 원리나 도구의 구조를 직관적으로 이해하고 능숙하게 다룹니다.',
      '불필요한 감정 소모를 줄이고 객관적이고 효율적으로 행동합니다.'
    ],
    cautions: [
      '흥미가 떨어지거나 반복적인 일에는 동기부여를 유지하기 어려울 수 있습니다.',
      '속마음을 잘 드러내지 않아 가까운 사람에게 무심하다는 오해를 살 수 있습니다.',
      '장기적인 계획이 필요한 일은 중간 점검 일정을 가볍게라도 잡아두면 도움이 됩니다.'
    ],
    relationships:
      '서로의 사생활과 자유를 존중하는 담백하고 편안한 관계를 선호합니다. 말로 길게 위로하기보다 실제로 필요한 문제를 뚝딱 해결해 주며 은근한 배려를 보여주는 편입니다.',
    workStyle:
      '이론만 길게 읽기보다 직접 실습하고 부딪히면서 익힐 때 가장 빠르게 성장합니다. 짧은 시간 안에 핵심만 압축해 집중하는 능력이 뛰어나며, 자율적인 스케줄에서 최고의 실력을 발휘합니다.'
  },

  ISFP: {
    name: '호기심 많은 예술가',
    tags: ['#따뜻한감성', '#자유로운영혼', '#섬세한미적감각'],
    summary:
      '현재의 순간을 온몸의 감각으로 즐기며, 자신만의 고유한 취향과 따뜻한 감성을 지닌 유형입니다. 겉으로는 온화하고 겸손하지만 내면에는 뚜렷한 가치관과 예술적 감각이 살아 있습니다.',
    strengths: [
      '색감, 분위기, 음악 등 일상 속 작은 아름다움을 발견하는 감각이 뛰어납니다.',
      '타인을 있는 그대로 존중하며 편견 없이 따뜻하게 대합니다.',
      '상황에 맞춰 유연하게 적응하며 부드러운 분위기를 만들어 냅니다.'
    ],
    cautions: [
      '계획을 미리 세우거나 경쟁이 치열한 환경에서 쉽게 부담을 느낄 수 있습니다.',
      '거절이나 비판을 개인적인 상처로 받아들여 마음이 위축될 때가 있습니다.',
      '중요한 마감이나 목표는 작은 단위로 쪼개어 부담을 줄이며 시작해 보세요.'
    ],
    relationships:
      '상대방에게 부담을 주지 않으면서도 진심 어린 다정함으로 곁을 지키는 스타일입니다. 말보다 함께 보내는 편안한 시간과 작은 선물, 세심한 행동으로 마음을 전합니다.',
    workStyle:
      '자신의 흥미와 감성이 연결된 주제에서 놀라운 몰입력을 보여줍니다. 시각적 자료나 손으로 직접 만들어 보는 활동과 잘 맞으며, 강압적이지 않고 편안한 공간에서 능률이 올라갑니다.'
  },

  INFP: {
    name: '열정적인 중재자',
    tags: ['#풍부한상상력', '#진심어린공감', '#나만의가치관'],
    summary:
      '풍부한 감수성과 깊은 내면세계를 지닌 따뜻한 이상주의자입니다. 세상의 선한 가능성을 믿으며, 자신의 가치관과 진정성에 맞는 삶을 살아가고자 노력합니다.',
    strengths: [
      '타인의 아픔과 기쁨에 진심으로 공감하며 따뜻한 위로를 건넵니다.',
      '독창적인 상상력과 섬세한 표현력으로 글·예술·기획 분야에서 빛납니다.',
      '자신이 진정으로 의미를 느끼는 일에는 놀라운 열정과 끈기를 발휘합니다.'
    ],
    cautions: [
      '현실적인 마감이나 세부 절차를 챙기는 데 어려움을 느낄 수 있습니다.',
      '스스로에 대한 기대와 현실의 차이 때문에 쉽게 자책하거나 고민에 빠질 수 있습니다.',
      '머릿속 아이디어를 작은 실행 목록으로 옮겨 적으면 성취감을 훨씬 자주 느낄 수 있습니다.'
    ],
    relationships:
      '겉치레보다 마음이 통하는 진실한 대화를 사랑합니다. 상대의 개성을 깊이 존중하고 응원해 주는 따뜻한 친구이지만, 갈등 상황에서는 솔직한 마음을 조금씩 표현하는 연습이 도움이 됩니다.',
    workStyle:
      '단순히 시켜서 하는 일보다 "왜 이 일이 의미 있는지" 스스로 납득될 때 최고의 집중력이 나옵니다. 나만의 속도로 사색하고 정리할 수 있는 조용한 환경과 창의적인 과제에 강합니다.'
  },

  INTP: {
    name: '논리적인 사색가',
    tags: ['#지적호기심', '#독창적분석', '#원리탐구자'],
    summary:
      '끊임없는 질문과 논리적 사고로 세상의 원리를 탐구하는 아이디어 뱅크입니다. 기존의 틀에 얽매이지 않고, 새로운 관점에서 문제의 본질을 파헤치는 것을 즐깁니다.',
    strengths: [
      '복잡한 개념과 논리 구조를 빠르게 이해하고 독창적인 해법을 찾아냅니다.',
      '편견 없이 객관적으로 생각하며, 다양한 가능성을 열어두고 탐구합니다.',
      '관심 있는 분야에 한 번 빠지면 전문가 수준으로 깊이 파고듭니다.'
    ],
    cautions: [
      '아이디어를 구상하는 데 에너지를 쏟느라 마무리가 지연될 수 있습니다.',
      '대화 중 논리적 오류를 지적하다 의도치 않게 차갑게 보일 때가 있습니다.',
      '완벽한 결론을 기다리기보다 실행하면서 다듬어 가는 습관을 들이면 큰 힘이 됩니다.'
    ],
    relationships:
      '형식적인 사교 모임보다 흥미로운 주제에 대해 밤새 이야기할 수 있는 지적 교감을 즐깁니다. 감정 표현은 서툴러도, 진심으로 존중하는 사람에게는 누구보다 솔직하고 유쾌한 모습을 보여줍니다.',
    workStyle:
      '무조건 외우기보다 원리와 인과관계를 스스로 납득해야 머리에 쏙 들어옵니다. 정해진 틀대로 반복하는 과제보다 스스로 탐색하고 문제를 해결하는 프로젝트형 학습·업무에서 뛰어난 실력을 발휘합니다.'
  },

  ESTP: {
    name: '모험을 즐기는 사업가',
    tags: ['#넘치는에너지', '#빠른판단력', '#현장해결사'],
    summary:
      '생생한 현실 감각과 과감한 실행력을 지닌 에너지 넘치는 행동가입니다. 고민만 하기보다 직접 부딪혀 보며 답을 찾고, 어떤 자리에서도 분위기를 활기차게 이끌어 갑니다.',
    strengths: [
      '상황 판단이 빠르고 대범해 위기 순간에도 기지를 발휘합니다.',
      '뛰어난 관찰력과 유머 감각으로 처음 보는 사람과도 금세 친해집니다.',
      '실천력이 좋아 아이디어를 곧바로 행동과 결과로 연결합니다.'
    ],
    cautions: [
      '즉흥적인 결정을 내리다 장기적인 리스크나 세부 조건을 놓칠 수 있습니다.',
      '지루하고 반복적인 루틴이 길어지면 집중력이 빠르게 떨어집니다.',
      '중요한 선택 앞에서는 한 템포만 멈추어 장단점을 점검하는 습관이 도움이 됩니다.'
    ],
    relationships:
      '함께 있으면 지루할 틈이 없는 유쾌하고 시원시원한 친구입니다. 솔직하고 뒤끝이 없으며, 친구가 곤란할 때 말보다 행동으로 가장 먼저 달려와 도와주는 의리파입니다.',
    workStyle:
      '책상 앞에 오래 앉아 이론만 보는 것보다 실제 사례를 다루고 몸을 움직이며 배우는 방식이 잘 맞습니다. 짧은 목표를 게임처럼 하나씩 깨 나가는 스타일로 공부·업무를 하면 몰입도가 극대화됩니다.'
  },

  ESFP: {
    name: '자유로운 영혼의 연예인',
    tags: ['#분위기메이커', '#긍정에너지', '#현재를즐겨'],
    summary:
      '밝은 미소와 넘치는 생동감으로 주변을 환하게 만드는 매력적인 유형입니다. 사람들과 함께 웃고 경험하는 순간을 소중히 여기며, 일상에 즐거운 활력을 불어넣습니다.',
    strengths: [
      '탁월한 친화력과 유쾌한 에너지로 어색한 자리도 금세 화기애애하게 만듭니다.',
      '주변 사람들의 기분과 분위기를 빠르게 눈치채고 따뜻하게 배려합니다.',
      '풍부한 표현력과 센스로 일상 속 재미있는 아이디어를 잘 떠올립니다.'
    ],
    cautions: [
      '당장의 즐거움에 집중하다 보면 장기적인 계획이나 마감을 미루기 쉽습니다.',
      '다른 사람의 시선이나 부정적인 피드백에 생각보다 크게 신경 쓸 수 있습니다.',
      '해야 할 일을 짧고 즐거운 보상과 연결해 두면 꾸준함을 지키는 데 큰 도움이 됩니다.'
    ],
    relationships:
      '누구와도 금방 친해지는 사교성의 달인이며, 친구의 기쁜 일은 진심으로 축하해 주고 슬픈 일은 온몸으로 공감해 줍니다. 함께 맛집을 가고 추억을 만드는 최고의 파트너입니다.',
    workStyle:
      '혼자 조용히 하는 공부보다 친구와 스터디를 하거나 서로 질문하며 주고받는 방식이 훨씬 효과적입니다. 시각적이고 생동감 있는 자료를 활용하고, 소통이 활발한 팀 업무에서 빛을 발합니다.'
  },

  ENFP: {
    name: '재기발랄한 활동가',
    tags: ['#반짝이는아이디어', '#따뜻한열정', '#자유로운소통'],
    summary:
      '호기심과 따뜻한 열정으로 가득 찬 창의적인 소통가입니다. 사람과 아이디어 사이의 새로운 가능성을 발견하는 데 탁월하며, 주변에 긍정적인 영감을 전파합니다.',
    strengths: [
      '고정관념을 깨는 신선한 아이디어와 풍부한 상상력이 돋보입니다.',
      '진심 어린 공감과 밝은 에너지로 사람들의 마음을 편안하게 열어 줍니다.',
      '새로운 도전과 변화를 두려워하지 않고 즐겁게 흡수하는 유연함이 있습니다.'
    ],
    cautions: [
      '관심사가 너무 많아 여러 일을 동시에 벌였다가 마무리가 흐지부지될 수 있습니다.',
      '세부적인 규칙이나 반복적인 정리 작업에서 쉽게 에너지를 소모합니다.',
      '가장 중요한 핵심 목표 1~2가지를 먼저 정하고 끝까지 완주하는 습관을 더해 보세요.'
    ],
    relationships:
      '사람 자체에 깊은 애정과 관심을 가지고 있어 다양한 유형의 친구들과 두루 잘 어울립니다. 상대의 숨은 매력을 발견해 진심으로 칭찬해 주는 따뜻한 응원자입니다.',
    workStyle:
      '자유롭게 브레인스토밍하고 나만의 방식으로 재해석할 수 있을 때 폭발적인 창의력이 나옵니다. 지루함을 줄이기 위해 공부 장소를 바꾸거나 마인드맵처럼 시각적으로 정리하는 방법이 잘 맞습니다.'
  },

  ENTP: {
    name: '뜨거운 논쟁을 즐기는 변론가',
    tags: ['#재치만점발상', '#두뇌회전초고속', '#도전적혁신가'],
    summary:
      '날카로운 지성과 넘치는 재치로 기존의 틀에 유쾌한 질문을 던지는 혁신가입니다. 새로운 지식과 흥미로운 토론을 즐기며, 불가능해 보이는 문제에서도 기발한 돌파구를 찾아냅니다.',
    strengths: [
      '다각도로 생각하는 능력이 뛰어나 남들이 못 보는 해결책을 빠르게 떠올립니다.',
      '언변과 설득력이 좋아 복잡한 내용도 재미있고 명쾌하게 풀어냅니다.',
      '새로운 환경과 변화에 빠르게 적응하며 도전을 성장의 기회로 삼습니다.'
    ],
    cautions: [
      '토론의 재미에 빠져 상대방이 논쟁으로 인해 감정적으로 지칠 수 있음을 놓치기 쉽습니다.',
      '새로운 아이디어에 금방 흥미를 느껴 시작은 화려하지만 끝맺음이 약해질 수 있습니다.',
      '신뢰할 수 있는 마감 체크 습관을 들이고, 대화 시 공감의 한마디를 더하면 매력이 배가됩니다.'
    ],
    relationships:
      '유머 감각이 뛰어나고 대화가 끊이지 않는 흥미로운 친구입니다. 서로 생각을 자유롭게 주고받으며 지적 자극을 나눌 수 있는 관계에서 가장 큰 즐거움을 느낍니다.',
    workStyle:
      '정해진 답을 그대로 외우기보다 "왜 이렇게 될까?"를 따져보고 응용할 때 실력이 급상승합니다. 토론식 학습, 기획, 문제 해결 프로젝트에서 독보적인 존재감을 드러냅니다.'
  },

  ESTJ: {
    name: '엄격한 관리자',
    tags: ['#확실한리더십', '#체계적추진력', '#현실적완벽주의'],
    summary:
      '명확한 기준과 뛰어난 조직력으로 목표를 현실로 만들어 내는 든든한 리더 유형입니다. 책임감이 강하고 일 처리가 깔끔해, 혼란스러운 상황에서도 질서를 빠르게 잡아냅니다.',
    strengths: [
      '목표를 달성하기 위한 현실적인 계획을 세우고 끝까지 밀어붙이는 실행력이 강합니다.',
      '시간 관리와 약속을 철저히 지켜 조직과 팀에서 핵심 역할을 맡습니다.',
      '객관적인 사실과 공정한 원칙을 바탕으로 분명하게 결정을 내립니다.'
    ],
    cautions: [
      '효율과 결과를 중시하다 보니 과정 속 사람들의 감정을 세심하게 살피기 어려울 수 있습니다.',
      '자신만의 방식이 옳다는 확신이 강해 다른 의견을 받아들이는 데 시간이 걸릴 수 있습니다.',
      '가끔은 "다름"을 여유롭게 인정하고 완벽하지 않은 과정도 즐겨 보세요.'
    ],
    relationships:
      '겉으로는 단호해 보이지만, 내 사람이라고 생각하면 누구보다 책임감 있게 챙기고 지켜줍니다. 실질적인 조언과 확실한 행동으로 신뢰를 쌓아가는 든든한 버팀목입니다.',
    workStyle:
      '명확한 일정표, 측정 가능한 목표, 체계적인 커리큘럼이 있을 때 최고의 성과를 냅니다. 해야 할 일을 목록화하고 하루 단위로 점검하며 진행하는 정석적인 공부·업무 스타일에 강합니다.'
  },

  ESFJ: {
    name: '사교적인 외교관',
    tags: ['#다정한리더', '#배려의아이콘', '#화합의중심'],
    summary:
      '따뜻한 마음과 뛰어난 사교성으로 사람들의 마음을 하나로 모으는 조화로운 유형입니다. 주변이 편안하고 행복할 때 가장 큰 보람을 느끼며, 성실하게 책임을 다합니다.',
    strengths: [
      '상대방의 필요를 빠르게 파악하고 진심 어린 친절로 분위기를 따뜻하게 만듭니다.',
      '협동심과 책임감이 뛰어나 모임이나 팀의 일정을 세심하게 챙깁니다.',
      '약속과 예의를 중시해 어떤 집단에서도 호감과 신뢰를 얻습니다.'
    ],
    cautions: [
      '주변 사람들의 평가와 시선에 민감해 스스로의 마음을 억누를 때가 있습니다.',
      '모두를 만족시키려다 정작 본인의 에너지가 바닥날 수 있습니다.',
      '모든 사람에게 완벽하게 맞추지 않아도 충분히 사랑받을 자격이 있음을 기억하세요.'
    ],
    relationships:
      '생일, 기념일, 사소한 대화 내용까지 살뜰히 챙기는 다정함의 대명사입니다. 갈등이 생겼을 때도 서로의 입장을 부드럽게 중재하며 관계를 건강하게 이어 갑니다.',
    workStyle:
      '서로 응원하고 소통하는 스터디나 팀 프로젝트에서 시너지가 극대화됩니다. 정해진 계획에 맞춰 성실하게 준비하며, 배운 내용을 다른 사람에게 설명해 줄 때 기억이 더욱 단단해집니다.'
  },

  ENFJ: {
    name: '정의로운 사회운동가',
    tags: ['#따뜻한카리스마', '#진심어린리더', '#성장촉진자'],
    summary:
      '깊은 공감 능력과 밝은 리더십으로 사람들의 잠재력을 이끌어 내는 영감의 원천입니다. 혼자 앞서가기보다 모두가 함께 성장하고 행복해지는 방향을 고민합니다.',
    strengths: [
      '상대방의 장점을 진심으로 발견하고 격려해 큰 동기부여를 줍니다.',
      '명확한 비전과 뛰어난 소통 능력으로 팀의 방향을 자연스럽게 이끕니다.',
      '계획성과 열정을 겸비해 의미 있는 목표를 현실로 만들어 냅니다.'
    ],
    cautions: [
      '다른 사람을 돕고 챙기는 데 집중하다 자신의 한계를 뒤늦게 알아차릴 수 있습니다.',
      '관계에서의 작은 갈등이나 차가운 반응에 마음이 크게 쓰일 수 있습니다.',
      '남을 챙기는 만큼 나 자신에게도 따뜻한 휴식과 솔직한 감정을 허락해 주세요.'
    ],
    relationships:
      '진정성 있는 대화와 깊은 유대를 통해 주변 사람들에게 긍정적인 변화를 선물합니다. 누구에게나 먼저 따뜻하게 손을 내밀어 주는 믿음직한 친구이자 훌륭한 멘토입니다.',
    workStyle:
      '목표의 의미와 가치를 명확히 이해했을 때 놀라운 추진력을 발휘합니다. 계획적으로 일정을 관리하면서도 팀원들과 아이디어를 나누고 협업하는 환경에서 최고의 성과를 냅니다.'
  },

  ENTJ: {
    name: '대담한 통솔자',
    tags: ['#압도적추진력', '#비전형리더', '#전략적실행'],
    summary:
      '명확한 목표 의식과 뛰어난 전략적 사고로 큰 그림을 현실로 완성하는 카리스마 넘치는 리더입니다. 도전을 두려워하지 않으며, 비효율을 개선하고 성장을 이끌어 내는 데 탁월합니다.',
    strengths: [
      '장기적인 비전을 세우고 자원과 시간을 효율적으로 배치하는 능력이 뛰어납니다.',
      '결단력과 추진력이 강해 어려운 문제 앞에서도 주저하지 않고 돌파합니다.',
      '논리적이고 설득력 있는 커뮤니케이션으로 팀을 목표 지점까지 이끌어 갑니다.'
    ],
    cautions: [
      '빠른 성과와 높은 기준을 추구하다 주변 사람들에게 다소 강하게 비칠 수 있습니다.',
      '감정적인 공감보다 해결책 제시에 집중해 상대가 서운함을 느낄 때가 있습니다.',
      '목표로 달려가는 길목에서 가끔 속도를 늦추고 동료의 마음을 살펴보면 더 큰 신뢰를 얻습니다.'
    ],
    relationships:
      '솔직하고 당당한 매력을 지녔으며, 서로의 성장을 자극하고 응원해 주는 건강한 관계를 좋아합니다. 말보다 확실한 행동과 든든한 지원으로 소중한 사람들을 챙깁니다.',
    workStyle:
      '큰 목표를 세운 뒤 역산하여 단계별 전략을 짜는 방식에 최적화되어 있습니다. 핵심을 빠르게 구조화하고 주도적으로 프로젝트를 이끌 때 가장 높은 성취감과 결과를 얻습니다.'
  }
};

/* --------------------------------------------------------------------------
   4. 앱 상태 관리 변수
   -------------------------------------------------------------------------- */
let currentIndex = 0; // 현재 보고 있는 질문 번호 (0 ~ 47)
let userAnswers = new Array(QUESTIONS.length).fill(null); // 사용자가 선택한 답변 저장 배열
let isTransitioning = false; // 질문 전환 애니메이션 중 중복 클릭 방지
let lastResultData = null; // 결과 복사용 최신 결과 데이터
let toastTimer = null;

/* --------------------------------------------------------------------------
   5. DOM 요소 참조
   -------------------------------------------------------------------------- */
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const nextBtnLabel = document.getElementById('next-btn-label');
const selectionHint = document.getElementById('selection-hint');

const dimensionBadge = document.getElementById('dimension-badge');
const progressText = document.getElementById('progress-text');
const progressTrack = document.getElementById('progress-track');
const progressFill = document.getElementById('progress-fill');

const questionStage = document.getElementById('question-stage');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const choiceABtn = document.getElementById('choice-a');
const choiceBBtn = document.getElementById('choice-b');
const choiceAText = document.getElementById('choice-a-text');
const choiceBText = document.getElementById('choice-b-text');

const resultTypeCode = document.getElementById('result-type-code');
const resultTypeName = document.getElementById('result-type-name');
const resultTags = document.getElementById('result-tags');
const resultSummary = document.getElementById('result-summary');
const scoreBarsContainer = document.getElementById('score-bars');
const resultStrengths = document.getElementById('result-strengths');
const resultCautions = document.getElementById('result-cautions');
const resultRelationships = document.getElementById('result-relationships');
const resultWork = document.getElementById('result-work');

const copyResultBtn = document.getElementById('copy-result-btn');
const restartBtn = document.getElementById('restart-btn');
const toastEl = document.getElementById('toast');

/* --------------------------------------------------------------------------
   6. 화면 전환 함수
   -------------------------------------------------------------------------- */
function showScreen(targetScreen) {
  [startScreen, quizScreen, resultScreen].forEach((screen) => {
    screen.classList.remove('active');
  });
  targetScreen.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* --------------------------------------------------------------------------
   7. 질문 렌더링 & 진행률 업데이트
   -------------------------------------------------------------------------- */
function renderQuestion(animate = true) {
  const currentQuestion = QUESTIONS[currentIndex];
  const total = QUESTIONS.length;
  const savedAnswer = userAnswers[currentIndex];

  // 상단 지표 배지 및 진행률 갱신
  const dimInfo = DIMENSION_INFO[currentQuestion.dimension];
  dimensionBadge.textContent = dimInfo.label;
  dimensionBadge.className = `dimension-badge dim-${currentQuestion.dimension}`;

  progressText.textContent = `${currentIndex + 1} / ${total}`;
  const progressPercent = ((currentIndex + 1) / total) * 100;
  progressFill.style.width = `${progressPercent}%`;
  progressTrack.setAttribute('aria-valuenow', String(currentIndex + 1));

  // 질문 및 선택지 내용 채우기
  questionNumber.textContent = `Q${currentIndex + 1}`;
  questionText.textContent = currentQuestion.question;

  choiceAText.textContent = currentQuestion.choices[0].text;
  choiceBText.textContent = currentQuestion.choices[1].text;

  // 이전에 선택한 답변이 있으면 강조 표시 복원
  choiceABtn.classList.toggle('selected', savedAnswer === currentQuestion.choices[0].value);
  choiceBBtn.classList.toggle('selected', savedAnswer === currentQuestion.choices[1].value);

  // 이전/다음 버튼 상태 제어 (답변하지 않으면 다음 질문으로 이동 불가)
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = savedAnswer === null;
  nextBtnLabel.textContent = currentIndex === total - 1 ? '결과 보기' : '다음 질문';

  if (savedAnswer === null) {
    selectionHint.textContent = '선택지를 고르면 다음 질문으로 이동해요';
  } else {
    selectionHint.textContent = '다른 선택지를 눌러 답변을 변경할 수 있어요';
  }

  // 부드러운 등장 애니메이션
  if (animate) {
    questionStage.classList.remove('is-entering');
    void questionStage.offsetWidth; // 리플로우 트리거
    questionStage.classList.add('is-entering');
  }
}

/* --------------------------------------------------------------------------
   8. 질문 이동 (부드러운 전환 효과 포함)
   -------------------------------------------------------------------------- */
function transitionToQuestion(nextIndex) {
  if (isTransitioning) return;
  isTransitioning = true;

  questionStage.classList.add('is-leaving');

  setTimeout(() => {
    currentIndex = nextIndex;
    questionStage.classList.remove('is-leaving');
    renderQuestion(true);
    isTransitioning = false;
  }, 190);
}

function handleChoiceSelect(choiceIndex) {
  if (isTransitioning) return;

  const currentQuestion = QUESTIONS[currentIndex];
  const selectedValue = currentQuestion.choices[choiceIndex].value;

  // 선택한 답변 저장 (이전 질문으로 돌아와 다시 선택하면 새로운 값으로 덮어써집니다)
  userAnswers[currentIndex] = selectedValue;

  // 선택 시각적 피드백 즉시 반영
  choiceABtn.classList.toggle('selected', choiceIndex === 0);
  choiceBBtn.classList.toggle('selected', choiceIndex === 1);
  nextBtn.disabled = false;

  // 짧은 피드백 후 다음 질문 또는 결과 화면으로 이동
  isTransitioning = true;
  setTimeout(() => {
    isTransitioning = false;
    if (currentIndex < QUESTIONS.length - 1) {
      transitionToQuestion(currentIndex + 1);
    } else {
      finishTest();
    }
  }, 210);
}

/* --------------------------------------------------------------------------
   9. MBTI 점수 계산 (실제 선택한 48개 답변을 기반으로 독립 집계)
   - 각 지표(E/I, S/N, T/F, J/P)별로 12개 문항의 점수를 따로 계산합니다.
   - 동점(6:6)일 경우 일관된 규칙으로 각 지표의 첫 번째 글자(E, S, T, J)를 선택합니다.
   -------------------------------------------------------------------------- */
function calculateMbtiResult() {
  const scores = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0
  };

  userAnswers.forEach((answer) => {
    if (answer && Object.prototype.hasOwnProperty.call(scores, answer)) {
      scores[answer] += 1;
    }
  });

  // 동점일 때는 지표의 첫 번째 글자(E, S, T, J)를 선택
  const ei = scores.E >= scores.I ? 'E' : 'I';
  const sn = scores.S >= scores.N ? 'S' : 'N';
  const tf = scores.T >= scores.F ? 'T' : 'F';
  const jp = scores.J >= scores.P ? 'J' : 'P';

  const typeCode = `${ei}${sn}${tf}${jp}`;

  return {
    typeCode,
    scores,
    profile: MBTI_RESULTS[typeCode]
  };
}

/* --------------------------------------------------------------------------
   10. 결과 화면 렌더링
   -------------------------------------------------------------------------- */
function finishTest() {
  // 모든 문항이 답변되었는지 최종 검증
  const unansweredIndex = userAnswers.findIndex((answer) => answer === null);
  if (unansweredIndex !== -1) {
    transitionToQuestion(unansweredIndex);
    return;
  }

  const result = calculateMbtiResult();
  lastResultData = result;

  const { typeCode, scores, profile } = result;

  resultTypeCode.textContent = typeCode;
  resultTypeName.textContent = profile.name;
  resultSummary.textContent = profile.summary;

  // 키워드 태그 렌더링
  resultTags.innerHTML = '';
  profile.tags.forEach((tag) => {
    const span = document.createElement('span');
    span.className = 'result-tag';
    span.textContent = tag;
    resultTags.appendChild(span);
  });

  // 4가지 지표 막대 그래프 렌더링
  scoreBarsContainer.innerHTML = '';
  ['EI', 'SN', 'TF', 'JP'].forEach((dimKey) => {
    const info = DIMENSION_INFO[dimKey];
    const leftScore = scores[info.left.code];
    const rightScore = scores[info.right.code];
    const totalDim = leftScore + rightScore || 12;
    const leftPct = Math.round((leftScore / totalDim) * 100);
    const rightPct = 100 - leftPct;
    const isLeftWinner = leftScore >= rightScore;

    const row = document.createElement('div');
    row.className = `score-row bar-${dimKey}`;
    row.innerHTML = `
      <div class="score-row-top">
        <span class="score-side ${isLeftWinner ? 'winner' : ''}">
          ${info.left.code} ${info.left.name} · ${leftPct}% (${leftScore})
        </span>
        <span class="score-side ${!isLeftWinner ? 'winner' : ''}">
          (${rightScore}) ${rightPct}% · ${info.right.name} ${info.right.code}
        </span>
      </div>
      <div class="score-track" aria-label="${info.label} 비율">
        <div class="score-fill-left" style="width: ${leftPct}%"></div>
        <div class="score-fill-right" style="width: ${rightPct}%"></div>
      </div>
    `;
    scoreBarsContainer.appendChild(row);
  });

  // 강점 리스트 렌더링
  resultStrengths.innerHTML = '';
  profile.strengths.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    resultStrengths.appendChild(li);
  });

  // 주의할 점 리스트 렌더링
  resultCautions.innerHTML = '';
  profile.cautions.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    resultCautions.appendChild(li);
  });

  // 대인관계 & 공부/업무 스타일
  resultRelationships.textContent = profile.relationships;
  resultWork.textContent = profile.workStyle;

  showScreen(resultScreen);
}

/* --------------------------------------------------------------------------
   11. 결과 복사 & 토스트 알림
   -------------------------------------------------------------------------- */
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2400);
}

async function copyResultToClipboard() {
  if (!lastResultData) return;

  const { typeCode, scores, profile } = lastResultData;
  const shareText = [
    `[나의 MBTI 성격유형 테스트 결과]`,
    `유형: ${typeCode} (${profile.name})`,
    `키워드: ${profile.tags.join(' ')}`,
    `지표 점수: E(${scores.E}):I(${scores.I}) | S(${scores.S}):N(${scores.N}) | T(${scores.T}):F(${scores.F}) | J(${scores.J}):P(${scores.P})`,
    `특징: ${profile.summary}`
  ].join('\n');

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareText);
    } else {
      const tempTextarea = document.createElement('textarea');
      tempTextarea.value = shareText;
      tempTextarea.style.position = 'fixed';
      tempTextarea.style.left = '-9999px';
      document.body.appendChild(tempTextarea);
      tempTextarea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextarea);
    }
    showToast('결과가 클립보드에 복사되었습니다!');
  } catch (error) {
    showToast('복사에 실패했습니다. 다시 시도해 주세요.');
  }
}

/* --------------------------------------------------------------------------
   12. 테스트 시작 & 초기화 (다시 테스트하기)
   -------------------------------------------------------------------------- */
function startTest() {
  currentIndex = 0;
  userAnswers = new Array(QUESTIONS.length).fill(null);
  lastResultData = null;
  renderQuestion(true);
  showScreen(quizScreen);
}

function restartTest() {
  currentIndex = 0;
  userAnswers = new Array(QUESTIONS.length).fill(null);
  lastResultData = null;
  showScreen(startScreen);
}

/* --------------------------------------------------------------------------
   13. 이벤트 리스너 연결
   -------------------------------------------------------------------------- */
startBtn.addEventListener('click', startTest);

choiceABtn.addEventListener('click', () => handleChoiceSelect(0));
choiceBBtn.addEventListener('click', () => handleChoiceSelect(1));

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    transitionToQuestion(currentIndex - 1);
  }
});

nextBtn.addEventListener('click', () => {
  // 답변을 선택하지 않았으면 다음으로 넘어갈 수 없음
  if (userAnswers[currentIndex] === null) return;

  if (currentIndex < QUESTIONS.length - 1) {
    transitionToQuestion(currentIndex + 1);
  } else {
    finishTest();
  }
});

copyResultBtn.addEventListener('click', copyResultToClipboard);
restartBtn.addEventListener('click', restartTest);
