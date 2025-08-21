# Fork Join Pool

1. **CompletableFuture 는 내부적으로 비동기 함수들을 실행**하기 위해 ForkJoinPool 을 사용
2. ForkJoinPool의 기본 size = 할당된 cpu 코어
3. Fork Join Pool은 데몬 쓰레드이다.
   - 만약 main 쓰레드가 종료되면 즉각적으로 종료된다.


