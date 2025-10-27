# React State

## 1. State란?

- 컴포넌트 내부에서 관리되는 동적인 데이터로, 값이 변경되면 컴포넌트가 자동으로 리렌더링되어 UI를 업데이트합니다.

## 2. State의 특징

1. **컴포넌트 내부 관리**: State는 컴포넌트 안에서 선언되고 관리됩니다.
2. **변경 가능(Mutable)**: setState 또는 setter 함수를 통해 값을 변경할 수 있습니다.
3. **리렌더링 트리거**: State가 변경되면 React가 자동으로 컴포넌트를 리렌더링합니다.

## 3. State 사용 예시

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```

## 4. State vs Props

| 구분 | State | Props |
|------|-------|-------|
| **정의** | 컴포넌트 내부 데이터 | 부모에서 전달받은 데이터 |
| **변경 가능 여부** | 변경 가능 (setState) | 읽기 전용 (불변) |
| **관리 주체** | 해당 컴포넌트 | 부모 컴포넌트 |
| **변경 시** | 리렌더링 발생 | 새로운 props 전달 시 리렌더링 |

### 핵심 차이점

- State는 컴포넌트 내부에서 관리하는 변경 가능한 데이터로, setState를 통해 값을 변경하면 컴포넌트가 리렌더링됩니다.
- Props는 부모 컴포넌트에서 전달받은 읽기 전용 데이터로, 자식 컴포넌트에서 직접 변경할 수 없으며 부모가 새로운 값을 전달해야만 업데이트됩니다.
- State는 컴포넌트의 "내부 상태"이고, Props는 "외부에서 받은 설정값"입니다.

> **참고**: State는 컴포넌트의 "기억"이며, 사용자 인터랙션이나 비동기 작업 결과를 저장하는 데 사용됩니다.
