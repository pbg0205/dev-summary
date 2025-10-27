# React onClick 이벤트 핸들러 에러

## 문제 코드
```typescript
<button style={buttonStyle} onClick={handleClick()}>X</button>
```

## 에러 원인

**`onClick={handleClick()}`** 부분이 잘못되었습니다.

### 문제점:

#### 1. 즉시 실행 문제
- `handleClick()`는 함수를 **즉시 실행**합니다
- 버튼을 클릭할 때가 아니라 **컴포넌트가 렌더링될 때** 함수가 실행됩니다
- 렌더링마다 계속 실행되어 무한 루프나 예상치 못한 동작이 발생할 수 있습니다

#### 2. 타입 에러
- `onClick`은 함수를 받아야 하는데, `handleClick()`의 **반환값**을 전달하게 됩니다
- `handleClick()`이 `void`를 반환하면 `onClick={undefined}`가 되어 타입 에러 발생

## 올바른 방법

### 방법 1: 함수 참조 전달 (권장)
```typescript
<button style={buttonStyle} onClick={handleClick}>X</button>
```

### 방법 2: 화살표 함수로 감싸기 (매개변수가 필요한 경우)
```typescript
<button style={buttonStyle} onClick={() => handleClick()}>X</button>
```

### 방법 3: 인자를 전달해야 하는 경우
```typescript
<button style={buttonStyle} onClick={() => handleClick(id)}>X</button>
```

## 핵심 차이

- `onClick={handleClick}` → 함수 자체를 전달 (클릭 시 실행) ✅
- `onClick={handleClick()}` → 함수의 반환값을 전달 (렌더링 시 즉시 실행) ❌
