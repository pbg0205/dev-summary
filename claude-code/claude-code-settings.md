# Claude Code 설치 및 사용 가이드

## 설치

### 필수 요구사항
- Node.js (버전 18 이상)
- npm 또는 yarn 패키지 매니저

### Claude Code 설치
```bash
npm install -g @anthropic/claude-code
```

### 인증
1. [Anthropic Console](https://console.anthropic.com/)에서 API 키 발급
2. 인증 설정:
```bash
claude-code auth
```

## 사용법

### Claude Code 시작하기
```bash
claude-code
```

### 기본 명령어
- `claude-code --help` - 도움말 정보 표시
- `claude-code --version` - 버전 표시
- `claude-code auth` - 인증 설정
- `claude-code update` - Claude Code를 최신 버전으로 업데이트
- `claude-code --model <model-name>` - 특정 Claude 모델 사용 (예: claude-3-5-sonnet-20241022)
- `/model` : claude code 내에서 모델 목록 조회

### 주요 기능
- **대화형 CLI**: 터미널에서 Claude와 직접 대화
- **파일 작업**: 프로젝트의 파일 읽기, 쓰기, 편집
- **코드 분석**: 코드베이스 이해 및 설명 제공
- **작업 관리**: 복잡한 작업을 위한 내장 할 일 추적
- **Git 통합**: 커밋 및 풀 리퀘스트 생성
- **웹 검색**: 최신 정보 접근

### 워크플로우 예시

#### 코드 분석
```bash
# 프로젝트 디렉토리에서 Claude Code 시작
cd your-project
claude-code

# Claude에게 코드 분석 요청
> "인증 시스템이 어떻게 작동하는지 설명해줘"
> "코드베이스에서 모든 TODO 주석을 찾아줘"
```
