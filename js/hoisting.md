# 호이스팅(Hoisting)

## 호이스팅이란?

- 코드 실행 전에 변수 선언과 함수 선언이 메모리에 먼저 올라가는 현상

### (1) 변수 호이스팅

1. JS 변수(variable) 가 어떤 의미에서 함수(function) 나 문(statement) 의 최상단으로 끌어올려지는 것을 말한다.
   <br>(하지만, 끌어올려진 변수는 undefined 값을 반환한다.)
2. ECMAScript 2015의 `let` 과 `const`는 변수를 블록의 상단으로 끌어올리지만 초기화하지 않는다.
    - 변수가 선언되기 전에 블록 안에서 변수를 참조하게 되면 `ReferenceError`를 발생
3. 호이스팅 때문에, 함수 내의 모든 var 문은 가능한 함수 상단 근처에 두는 것이 좋다.

```javascript
/**
 * Example 1
 */
console.log(x === undefined); // true
var x = 3;

/**
 * Example 2
 */
// undefined 값을 반환함.
var myvar = "my value";

(function () {
  console.log(myvar); // undefined
  var myvar = "local value";
})();
```

### (2) 함수 호이스팅

1. 함수에서는 함수 선언으로는 호이스팅되지만 함수 표현식으로는 호이스팅 되지 않는다.

```javascript
/* 함수 선언 (function declaration) */

foo(); // "bar"

function foo() {
  console.log("bar");
}

/* 함수 표현식 (function expression) */

baz(); // TypeError: baz is not a function

var baz = function () {
  console.log("bar2");
};
```

### (3) 클래스 호이스팅

1. 클래스 선언문(class declaration) 은 호이스팅되지 않습니다.
2. 사실 내부적으로는 호이스팅되지만, let/const 와 마찬가지로 `TDZ(Temporal Dead Zone)` 때문에 선언문에 도달하기 전에는 사용할 수 없다.

<br>

`🔹 Class 표현식 (Class Expressions)`

- 클래스도 함수처럼 표현식(Expression) 으로 작성할 수 있습니다.

```javascript

const MyClass = class {
  constructor(name) {
    this.name = name;
  }
};
const obj = new MyClass("Alice"); // ✅ 정상 동작
```

`이름 있는 클래스 표현식`

- 클래스 표현식은 이름을 가질 수도 있음
- 단, 그 이름은 클래스 내부에서만 접근 가능

```javascript
const MyClass = class MyClassLongerName {
  constructor() {
  }

  printName() {
    console.log(MyClassLongerName.name);
  }
};

new MyClass(); // ✅ 정상 동작
new MyClassLongerName();
// ❌ ReferenceError: MyClassLongerName is not defined
```

<br>

> TDZ(Temporal Dead Zone) : 변수가 선언되기 전까지 접근할 수 없는 영역을 의미한다.

## Reference

- [MDN] 호이스팅 : https://developer.mozilla.org/ko/docs/Glossary/Hoisting
- [MDN] 변수
  호이스팅 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Grammar_and_types#%EB%B3%80%EC%88%98_%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85
- [MDN] 함수
  호이스팅 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Grammar_and_types#%ED%95%A8%EC%88%98_%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85
- [MDN] 클래스
  호이스팅 : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes#class_declaration_hoisting


