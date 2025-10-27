# JSX Key 속성

## 1. Key 속성이란?

- React에서 리스트를 렌더링할 때 각 요소에 부여하는 고유 식별자로, 어떤 항목이 변경, 추가, 삭제되었는지 효율적으로 인식하기 위해 사용합니다.

## 2. Key 속성을 사용하는 이유

- **효율적인 업데이트**: Virtual DOM에서 리스트의 변경사항을 비교(Diffing)할 때 key를 기준으로 어떤 요소가 변경되었는지 빠르게 파악할 수 있습니다.
- **불필요한 렌더링 방지**: key가 없으면 React는 전체 리스트를 다시 렌더링하지만, key가 있으면 변경된 항목만 업데이트합니다.

## 3. Key 사용 예시

```jsx
// ✅ 올바른 사용 - 고유한 id 사용
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// ❌ 나쁜 예 - index 사용 (순서가 변경될 수 있는 경우)
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

## 4. Key 선택 기준

- **최우선**: 데이터베이스 ID 같은 안정적이고 고유한 값을 사용합니다.
- **임시 방편**: 배열 순서가 절대 변하지 않는 정적 리스트에서만 index를 사용합니다.
- **피해야 할 것**: Math.random()이나 Date.now() 같은 매번 바뀌는 값은 사용하지 않습니다.

> **참고**: key는 형제 요소 사이에서만 고유하면 되며, 전역적으로 고유할 필요는 없습니다.
