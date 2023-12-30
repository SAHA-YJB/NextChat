# cahtApp - 1:1 채팅과 그룹채팅을 해보자

### 사용기술: Next / Typescript / Prisma / pusher / TailwindCSS

# 1. Next-Auth 적용

### - NextAuth 설정, 미들웨어 설정

### - 프리즈마 스키마 작성(mongoDB 스키마)

### - 메인 레이아웃은 서버 컴포넌트로 사용(세션프로바이더와 토스터 분리하여 레이아웃 래핑)

### - 로그인 / 회원가입 페이지 분기 처리 UI제작

### - register API 정의

# 2. Sidebar 제작

### - currentUser actions 정의

### - mobile / basic sidebar UI 정의

# 3. User & chatList 나열

### - 공통 로딩모달(HeadlessUI) 생성

### - 유저 리스트(유저박스[1명의 유저])(본인 제외 유저 나열)/getUsers action create

### - 대화생성(conversation) API 정의 -> 대화방 리스트(대화방[한 개의 채팅])

### - 대화 리스트 컴포넌트 / 모든 대화getConversations actions 정의

# 4. 채팅 방 구현

### - getConversationById / getMessages actions 정의

### - chatHeader -> zustand사용 온라인 오프라인 유저 아이디 스토어 생성(useActiveList)

### - 프로필 모달 구현(HeadlessUI) / DELETE API 정의

### - 채팅 작성을 위한 폼 생성

### - 클라우디너리 커넥팅

# 5. 실시간 채팅 구현

### - pusher 연동
