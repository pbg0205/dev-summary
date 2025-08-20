# DI (Dependency Injection)

### (1) DI(Dependency Injection) ??

- 객체가 사용할 **다른 객체(의존성)** 를 직접 생성하지 않고 외부에서 주입받는 방식.

### (2) DI 장점 ??

> **결합도 감소**, **테스트 용이성**, **유지보수성 향상**

1. **결합도 감소 (Loose Coupling)**
    - 객체가 직접 의존성을 생성하지 않고 외부에서 주입받기 때문에, 클래스 간의 강한 결합을 피할 수 있습니다.
    - 예: new 키워드로 의존 객체를 만들지 않고 컨테이너에서 주입받음 → 유연한 구조 가능
2. **테스트 용이성 (Testability)**
    - 실제 구현 대신 Mock 객체나 Stub 객체를 쉽게 주입할 수 있어 단위 테스트 작성이 훨씬 편리.
3. **유지보수성 향상 (Maintainability)**
    - 코드 수정이 필요할 때 의존 객체를 직접 바꾸지 않고 설정이나 Bean 정의만 수정하면 됩니다.
    - 즉, 변경에 닫혀 있고 확장에 열려 있는(OCP, 개방-폐쇄 원칙) 구조가 됩니다.

### (3) DI 예시

`❌ DI 미적용 (강한 결합)`

```java
public class Car {
    private Engine engine = new Engine(); // Car가 직접 Engine 생성
}
```

`✅ DI 적용 (약한 결합)`
```java
public class Car {
    private Engine engine;

    // 외부에서 Engine을 주입받음
    public Car(Engine engine) {
        this.engine = engine;
    }
}
```
