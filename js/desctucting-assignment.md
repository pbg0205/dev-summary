# 구조 분해 할당 (Destructuring Assignment)

- JavaScript 표현식에서 배열이나 객체의 값을 개별 변수로 해체하여 쉽게 할당할 수 있는 기능.


## 1. 배열 구조 분해

###  (1) 기본 변수 할당

```js
var foo = ["one", "two", "three"];
var [red, yellow, green] = foo;
console.log(red);   // "one"
console.log(yellow); // "two"
console.log(green); // "three"
```

### (2) 선언 분리 할당

```js
var a, b;
[a, b] = [1, 2];
console.log(a, b); // 1 2
```

### (3) 기본값 지정

```js
var [a = 5, b = 7] = [1];
console.log(a); // 1
console.log(b); // 7
```

### (4) 변수 값 교환

```js
var a = 1, b = 3;
[a, b] = [b, a];
console.log(a, b); // 3 1
```

### (5) 함수 반환 배열 해체

```js
function f() { return [1, 2]; }
var [a, b] = f();
console.log(a, b); // 1 2
```

### (6) 일부 반환 값 무시

```js
function f() { return [1, 2, 3]; }
var [a, , b] = f();
console.log(a, b); // 1 3

[, ,] = f(); // 모두 무시
```

### (7) 나머지 요소(rest) 할당

```js
var [a, ...b] = [1, 2, 3];
console.log(a); // 1
console.log(b); // [2, 3]
// 주의: 오른쪽 쉼표는 SyntaxError
var [a, ...b,] = [1, 2, 3]; // SyntaxError
```

### (8) 정규표현식 exec 결과 해체

```js
var parsed = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
var [, protocol, fullhost, fullpath] = parsed;
```

---

## 2. 객체 구조 분해

###  (1) 기본 할당

```js
var o = { p: 42, q: true };
var { p, q } = o;
console.log(p, q); // 42 true
```

### (2) 선언 없는 할당 (괄호 필요)

```js
var a, b;
({ a, b } = { a: 1, b: 2 });
```

### (3) 새로운 변수명으로 할당

```js
var { p: foo, q: bar } = { p: 42, q: true };
console.log(foo, bar); // 42 true
```

### (4) 기본값 지정

```js
var { a = 10, b = 5 } = { a: 3 };
console.log(a, b); // 3 5
```

### (5) 이름 변경 + 기본값

```js
var { a: aa = 10, b: bb = 5 } = { a: 3 };
console.log(aa, bb); // 3 5
```

### (6) 함수 매개변수에서 구조 분해

```js
function draw({ size = "big", cords = { x: 0, y: 0 }, radius = 25 } = {}) {
  console.log(size, cords, radius);
}
```

### (7) 중첩 객체/배열 해체

```js
var metadata = { title: "Scratchpad", translations: [{ title: "..." }] };
var { title: englishTitle, translations: [{ title: localeTitle }] } = metadata;
```

### (8) 반복문 내부 구조 분해 (for…of)

```js
for (var {name: n, family: { father: f }} of people) {
  console.log(`Name: ${n}, Father: ${f}`);
}
```

### (9) 계산된 속성 이름 활용

```js
let key = "z";
let { [key]: foo } = { z: "bar" };
console.log(foo); // "bar"
```

### (10) 나머지 속성(rest)

```js
let { a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 };
console.log(rest); // { c: 30, d: 40 }
```

### (11) 유효하지 않은 식별자명 처리

```js
const foo = { "fizz-buzz": true };
const { "fizz-buzz": fizzBuzz } = foo;
console.log(fizzBuzz); // true
```

---

## Reference

- [MDN] 구조 분해 할당 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring

