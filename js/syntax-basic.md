# 📘 JavaScript Handbook

JS 문법을 빠르게 복습하거나 학습하기 위한 기본 정리본

------------------------------------------------------------------------

## 1. 변수 (Variables)

``` javascript
// var: 함수 스코프, 재선언 가능
var a = 10;

// let: 블록 스코프, 재선언 불가
let b = 20;

// const: 블록 스코프, 값 재할당 불가
const c = 30;
```

- var 을 사용하지 않는 이유 : `Hoisting`
  - 코드 실행 전에 변수 선언과 함수 선언이 메모리에 먼저 올라가는 현상
  - let, const 는 블록 스코프를 가지며, 선언 전에 접근할 수 없다.
  - 즉, 선언이 끌어올려진 것처럼 동작한다.

------------------------------------------------------------------------

## 2. 데이터 타입 (Data Types)

1. 원시 타입
   - `number`
   - `string`
   - `boolean`
   - `null`
   - `undefined`
   - `symbol`
   - `bigint`
2. 참조 타입
   - `object`
   - `array`
   - `function`

``` javascript
let num = 42;         // number
let str = "hello";     // string
let isTrue = true;    // boolean
let nothing = null;   // null : 의도적으로 값이 없음
let undef;            // undefined : 값이 할당되지 않음 (java 와의 차이점)
let sym = Symbol();   // symbol : 고유한 식별자
let big = 123n;       // bigint
let obj = { a: 1 };   // object
let arr = [1, 2, 3];  // array
function fn() {}      // function
```

------------------------------------------------------------------------

## 3. 연산자 (Operators)

``` javascript
// 산술 연산자
1 + 2;   // 3
5 - 2;   // 3
3 * 4;   // 12
10 / 2;  // 5
10 % 3;  // 1

// 비교 연산자
5 == "5";   // true (값만 비교)
5 === "5";  // false (값과 타입 비교)

// 논리 연산자
true && false; // false
true || false; // true
!true;         // false
```

------------------------------------------------------------------------

## 4. 조건문 (Conditionals)

``` javascript
if (x > 10) {
  console.log("큰 값");
} else if (x === 10) {
  console.log("같음");
} else {
  console.log("작음");
}

// switch
switch (day) {
  case 1:
    console.log("월요일");
    break;
  case 2:
    console.log("화요일");
    break;
  default:
    console.log("기타 요일");
}
```

------------------------------------------------------------------------

## 5. 반복문 (Loops)

``` javascript
// for
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// while
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// for...of (배열)
for (let value of [1, 2, 3]) {
  console.log(value);
}

// for...in (객체 키)
let obj = { a: 1, b: 2 };
for (let key in obj) {
  console.log(key, obj[key]);
}
```

------------------------------------------------------------------------

## 6. 함수 (Functions)

- js 함수에서 리턴 타입은 내부적으로 추론해서 반환한다.

``` javascript
// 함수 선언문
function add(a, b) {
  return a + b;
}

// 함수 표현식
const sub = function(a, b) {
  return a - b;
};

// 화살표 함수
const mul = (a, b) => a * b;
```

------------------------------------------------------------------------

## 7. 객체 & 배열 (Objects & Arrays)

``` javascript
// 객체
const person = {
  name: "Alice",
  age: 25,
  greet() {
    console.log("Hello");
  }
};

// 배열
const numbers = [1, 2, 3, 4];

// 구조 분해 할당
const { name, age } = person;
const [first, second] = numbers;
```

------------------------------------------------------------------------

## 8. ES6+ 문법

``` javascript
// 템플릿 리터럴
const name = "Tom";
console.log(`Hello, ${name}!`);

// 기본 매개변수
function greet(msg = "Hi") {
  console.log(msg);
}

// 스프레드 연산자
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

// Rest 매개변수
function sum(...nums) {
  return nums.reduce((a, b) => a + b);
}
```

------------------------------------------------------------------------

## 9. 클래스 (Classes)

``` javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}

const d = new Dog("Buddy");
d.speak(); // Buddy barks.
```

------------------------------------------------------------------------

## 10. 모듈 (Modules)

``` javascript
// export
export const pi = 3.14;
export function add(a, b) { return a + b; }

// import
import { pi, add } from "./math.js";
```

------------------------------------------------------------------------

✅ 이 핸드북은 기초 문법 중심이며, 추가로 비동기 처리(`async/await`,
`Promise`)나 브라우저 API, Node.js 기능도 확장할 수 있습니다.
