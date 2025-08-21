# Sync / Async

## 1. I/O 관점에서 Blocking 구분

### 1. cpu bound & I/O bound

1. CPU-bound blocking
   - thread 가 대부분의 시간을 CPU 를 점유하는 경우
   - 추가적인 코어 투입 필요
2. I/O-bound blocking
   - thread 가 대부분의 시간을 I/O 작업(네트워크, 디스크 등) 대기하는 경우
   - I/O non-blocking 으로 개선 가능

### 2. Blocking 전파

1. 하나의 함수는 여러 함수를 호출하기도 하고, 함수 호출은 중첩적으로 발생
2. blocking 된 함수가 하나라도 존재한다면 caller 는 blocking 상태가 된다.
3. 함수가 non-blocking 하려면 모든 함수가 non-blocking 이어야 한다.
4. 따라서 I/O blocking 또한 발생하면 안됀다.


### 3. I/O model 에서 Blocking 구분

1. sync + blocking
   - application 이 kernel 가 I/O 작업이 완료될 때까지 대기
   - 그 후 결과를 직접 이용해서 본인의 일을 수행
2. sync + non-blocking
   - application 이 kernel 에 주기적으로 I/O 작업 완료 여부를 확인
   - 중간중간 본인의 일을 할 수 있고, 작업이 완료되면 callback 을 통해 그 때 본인의 일을 수행한다.
3. async + non-blocking
    - application 이 kernel 에 I/O 작업을 요청하고, 그 후 본인의 일을 계속 수행한다.
    - 작업이 완료되면 kernel 은 signal 또는 callback 을 수행한다.


