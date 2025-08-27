# CompletableFuture

## supplyAsync 특징

`CompletableFuture.supplyAsync()`는 비동기적으로 값을 생성하는 CompletableFuture를 만드는 메서드.

### 주요 특징
- **비동기 실행**: 별도의 스레드에서 작업을 실행하여 메인 스레드를 블록하지 않음
- **반환값 존재**: `Supplier<T>` 함수형 인터페이스를 받아서 결과값을 반환
- **스레드풀 활용**: 기본적으로 ForkJoinPool.commonPool()을 사용하거나 커스텀 Executor 지정 가능
- **예외 처리**: 실행 중 발생한 예외는 CompletionException으로 래핑되어 전달

### 기본 사용법

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

public class SupplyAsyncExample {
    public static void main(String[] args) {
        // 기본 supplyAsync 사용
        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
            try {
                TimeUnit.SECONDS.sleep(2);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            return "Hello, CompletableFuture!";
        });
        
        // 결과 출력
        future.thenAccept(System.out::println);
        
        // 메인 스레드가 종료되지 않도록 대기
        future.join();
    }
}
```

### 커스텀 Executor 사용

```java
import java.util.concurrent.*;

public class SupplyAsyncWithExecutor {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        
        CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> {
            System.out.println("실행 스레드: " + Thread.currentThread().getName());
            return 42;
        }, executor);
        
        future.thenAccept(result -> 
            System.out.println("결과: " + result)
        );
        
        future.join();
        executor.shutdown();
    }
}
```

### 여러 작업 조합 예제

```java
import java.util.concurrent.CompletableFuture;

public class SupplyAsyncCombination {
    public static void main(String[] args) {
        // 첫 번째 비동기 작업
        CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> {
            sleep(1000);
            return "첫 번째";
        });
        
        // 두 번째 비동기 작업
        CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {
            sleep(1500);
            return "두 번째";
        });
        
        // 두 작업 결과 조합
        CompletableFuture<String> combined = future1.thenCombine(future2, 
            (result1, result2) -> result1 + " + " + result2 + " = 완료!"
        );
        
        System.out.println(combined.join());
    }
    
    private static void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```

### 예외 처리 예제

```java
import java.util.concurrent.CompletableFuture;

public class SupplyAsyncExceptionHandling {
    public static void main(String[] args) {
        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
            if (Math.random() < 0.5) {
                throw new RuntimeException("무작위 에러 발생!");
            }
            return "성공적으로 완료됨";
        }).exceptionally(throwable -> {
            System.out.println("예외 처리: " + throwable.getMessage());
            return "기본값으로 대체";
        });
        
        System.out.println("결과: " + future.join());
    }
}
```

## runAsync 특징

`CompletableFuture.runAsync()`는 비동기적으로 작업을 실행하되 반환값이 없는 CompletableFuture를 생성하는 메서드.

### 주요 특징
- **비동기 실행**: 별도의 스레드에서 작업을 실행하여 메인 스레드를 블록하지 않음
- **반환값 없음**: `Runnable` 함수형 인터페이스를 받아서 `CompletableFuture<Void>`를 반환
- **사이드 이펙트 작업**: 로깅, 파일 쓰기, 데이터베이스 업데이트 등 부수 효과를 위한 작업에 적합
- **스레드풀 활용**: 기본적으로 ForkJoinPool.commonPool()을 사용하거나 커스텀 Executor 지정 가능

### 기본 사용법

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

public class RunAsyncExample {
    public static void main(String[] args) {
        System.out.println("메인 스레드 시작: " + Thread.currentThread().getName());
        
        // 기본 runAsync 사용
        CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
            System.out.println("비동기 작업 실행 중: " + Thread.currentThread().getName());
            try {
                TimeUnit.SECONDS.sleep(2);
                System.out.println("작업 완료!");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        
        System.out.println("비동기 작업 시작됨, 메인 스레드는 계속 실행");
        
        // 작업 완료 대기
        future.join();
        System.out.println("모든 작업 완료");
    }
}
```

### 커스텀 Executor와 체이닝

```java
import java.util.concurrent.*;

public class RunAsyncWithChaining {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        
        CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
            System.out.println("1단계: 데이터 준비 중...");
            sleep(1000);
            System.out.println("1단계 완료");
        }, executor)
        .thenRunAsync(() -> {
            System.out.println("2단계: 데이터 처리 중...");
            sleep(500);
            System.out.println("2단계 완료");
        }, executor)
        .thenRun(() -> {
            System.out.println("3단계: 최종 정리 작업");
            System.out.println("모든 단계 완료!");
        });
        
        future.join();
        executor.shutdown();
    }
    
    private static void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```

### 파일 처리 예제

```java
import java.util.concurrent.CompletableFuture;
import java.nio.file.*;
import java.io.IOException;
import java.util.List;

public class RunAsyncFileProcessing {
    public static void main(String[] args) {
        CompletableFuture<Void> fileTask = CompletableFuture.runAsync(() -> {
            try {
                // 파일 생성
                Path tempFile = Files.createTempFile("async-test", ".txt");
                System.out.println("임시 파일 생성: " + tempFile);
                
                // 파일에 데이터 쓰기
                List<String> lines = List.of(
                    "CompletableFuture runAsync 예제",
                    "비동기 파일 처리",
                    "작업 완료 시간: " + java.time.LocalDateTime.now()
                );
                Files.write(tempFile, lines);
                
                System.out.println("파일 쓰기 완료");
                
                // 파일 읽기 및 출력
                Files.lines(tempFile)
                     .forEach(line -> System.out.println("읽은 내용: " + line));
                
                // 임시 파일 삭제
                Files.deleteIfExists(tempFile);
                System.out.println("임시 파일 삭제 완료");
                
            } catch (IOException e) {
                System.err.println("파일 처리 중 오류: " + e.getMessage());
            }
        });
        
        // 다른 작업을 병렬로 실행
        CompletableFuture<Void> logTask = CompletableFuture.runAsync(() -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println("로그 " + i + ": 시스템 정상 동작 중...");
                try {
                    Thread.sleep(300);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        });
        
        // 모든 작업 완료 대기
        CompletableFuture.allOf(fileTask, logTask).join();
        System.out.println("모든 비동기 작업 완료");
    }
}
```

### 예외 처리와 콜백

```java
import java.util.concurrent.CompletableFuture;

public class RunAsyncExceptionHandling {
    public static void main(String[] args) {
        CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
            System.out.println("위험한 작업 시작...");
            
            if (Math.random() < 0.7) {
                throw new RuntimeException("작업 중 오류 발생!");
            }
            
            System.out.println("작업 성공적으로 완료");
        })
        .whenComplete((result, throwable) -> {
            if (throwable != null) {
                System.out.println("작업 실패: " + throwable.getMessage());
                // 로깅, 알림 등의 후속 작업
                System.out.println("오류 로그 기록 완료");
            } else {
                System.out.println("작업 완료 콜백 실행");
            }
        })
        .exceptionally(throwable -> {
            System.out.println("예외 복구 작업 실행");
            // 대안 작업이나 정리 작업 수행
            return null;
        });
        
        future.join();
    }
}
```

## supplyAsync vs runAsync 비교

두 메서드는 비동기 작업을 실행하지만 중요한 차이점들이 있습니다.

### 핵심 차이점

| 구분 | supplyAsync | runAsync |
|------|-------------|----------|
| **반환 타입** | `CompletableFuture<T>` | `CompletableFuture<Void>` |
| **함수형 인터페이스** | `Supplier<T>` | `Runnable` |
| **반환값** | 작업 결과를 반환 | 반환값 없음 |
| **주요 용도** | 계산, 데이터 변환, API 호출 | 로깅, 파일 I/O, 알림, 정리 작업 |

### 사용 시기 가이드라인

**supplyAsync를 사용하는 경우:**
- API 호출 결과가 필요한 경우
- 계산된 값을 다른 작업에서 사용해야 하는 경우
- 데이터 변환이나 처리 결과를 반환해야 하는 경우

**runAsync를 사용하는 경우:**
- 로깅, 모니터링 작업
- 파일 시스템 작업 (파일 생성, 삭제)
- 이메일 발송, 알림 등의 부수 효과 작업
- 캐시 정리, 임시 데이터 삭제 등

### 실제 비교 예제

```java
import java.util.concurrent.CompletableFuture;
import java.time.LocalDateTime;

public class SupplyAsyncVsRunAsync {
    public static void main(String[] args) {
        System.out.println("=== supplyAsync 예제 ===");
        
        // supplyAsync: 계산 결과를 반환
        CompletableFuture<Integer> calculationFuture = CompletableFuture.supplyAsync(() -> {
            System.out.println("복잡한 계산 수행 중...");
            int result = 0;
            for (int i = 1; i <= 1000000; i++) {
                result += i;
            }
            return result;
        });
        
        // 계산 결과를 다른 작업에서 활용
        calculationFuture
            .thenApply(result -> "계산 결과: " + result)
            .thenAccept(System.out::println);
        
        System.out.println("\n=== runAsync 예제 ===");
        
        // runAsync: 로깅 작업 (반환값 불필요)
        CompletableFuture<Void> loggingFuture = CompletableFuture.runAsync(() -> {
            System.out.println("로그: 시스템 시작 시간 - " + LocalDateTime.now());
            System.out.println("로그: 메모리 상태 확인 완료");
            System.out.println("로그: 초기화 작업 완료");
        });
        
        System.out.println("\n=== 조합 사용 예제 ===");
        
        // 실제 업무에서의 조합 패턴
        CompletableFuture<String> dataFuture = CompletableFuture.supplyAsync(() -> {
            // 데이터 조회 (결과가 필요)
            return "사용자 데이터: {id: 123, name: '홍길동'}";
        });
        
        CompletableFuture<Void> auditFuture = CompletableFuture.runAsync(() -> {
            // 감사 로그 기록 (반환값 불필요)
            System.out.println("감사 로그: 데이터 조회 요청 - " + LocalDateTime.now());
        });
        
        // 데이터 조회 결과를 처리하면서 동시에 로깅
        CompletableFuture<Void> combinedFuture = dataFuture
            .thenCombine(auditFuture, (data, voidResult) -> {
                System.out.println("조회된 " + data);
                return null;
            });
        
        // 모든 작업 완료 대기
        CompletableFuture.allOf(calculationFuture, loggingFuture, combinedFuture).join();
        System.out.println("\n모든 작업 완료!");
    }
}
```

### 체이닝에서의 차이

```java
import java.util.concurrent.CompletableFuture;

public class ChainingComparison {
    public static void main(String[] args) {
        // supplyAsync 체이닝: 값을 계속 전달
        CompletableFuture<String> supplyChain = CompletableFuture
            .supplyAsync(() -> "초기 데이터")
            .thenApply(data -> data.toUpperCase())
            .thenApply(data -> data + " - 처리 완료")
            .thenCompose(data -> CompletableFuture.supplyAsync(() -> data + " [검증됨]"));
        
        System.out.println("Supply 체인 결과: " + supplyChain.join());
        
        // runAsync 체이닝: 순차적 작업 실행
        CompletableFuture<Void> runChain = CompletableFuture
            .runAsync(() -> System.out.println("1단계: 초기화"))
            .thenRun(() -> System.out.println("2단계: 설정 로드"))
            .thenRun(() -> System.out.println("3단계: 캐시 워밍업"))
            .thenCompose(v -> CompletableFuture.runAsync(() -> 
                System.out.println("4단계: 최종 확인")));
        
        runChain.join();
        System.out.println("Run 체인 완료");
    }
}
```

## complete 메서드 특징

`CompletableFuture.complete()`는 CompletableFuture를 수동으로 완료시키는 메서드입니다. 비동기 작업 없이 직접 값을 설정하거나, 조건부로 Future를 완료할 때 사용됩니다.

### 주요 특징
- **CompletableFuture가 완료되지 않았다면 주어진 값으로 채운다**
- **이미 완료된 상태라면 아무런 효과가 없다**
- **완료에 의해 상태가 바뀌었다면 true, 아니라면 false를 반환한다**

### 기본 사용법

```java
import java.util.concurrent.CompletableFuture;

public class CompleteBasicExample {
    public static void main(String[] args) throws Exception {
        CompletableFuture<Integer> future = new CompletableFuture<>();
        
        // 첫 번째 완료 시도
        boolean triggered = future.complete(1);
        System.out.println("첫 번째 완료 시도 성공: " + triggered); // true
        System.out.println("Future 완료 상태: " + future.isDone()); // true
        System.out.println("완료된 값: " + future.get()); // 1
        
        // 두 번째 완료 시도 (이미 완료됨)
        triggered = future.complete(2);
        System.out.println("두 번째 완료 시도 성공: " + triggered); // false
        System.out.println("최종 값: " + future.get()); // 1 (변경되지 않음)
    }
}
```

### 동적 완료 조건 예제

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ThreadLocalRandom;

public class ConditionalCompleteExample {
    public static void main(String[] args) throws Exception {
        CompletableFuture<String> future = new CompletableFuture<>();
        
        // 백그라운드에서 조건 체크 후 완료
        new Thread(() -> {
            try {
                Thread.sleep(1000);
                
                int randomValue = ThreadLocalRandom.current().nextInt(100);
                String result;
                
                if (randomValue < 30) {
                    result = "낮은 값: " + randomValue;
                } else if (randomValue < 70) {
                    result = "보통 값: " + randomValue;
                } else {
                    result = "높은 값: " + randomValue;
                }
                
                boolean completed = future.complete(result);
                System.out.println("완료 처리 결과: " + completed);
                System.out.println("생성된 값: " + randomValue);
                
            } catch (InterruptedException e) {
                future.completeExceptionally(e);
            }
        }).start();
        
        // 메인 스레드에서 결과 대기
        System.out.println("결과를 기다리는 중...");
        String result = future.get();
        System.out.println("최종 결과: " + result);
    }
}
```

### 경합 조건 처리 예제

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class RaceConditionCompleteExample {
    public static void main(String[] args) throws Exception {
        CompletableFuture<String> future = new CompletableFuture<>();
        ExecutorService executor = Executors.newFixedThreadPool(3);
        
        // 세 개의 스레드가 동시에 완료 시도
        executor.submit(() -> {
            sleep(800);
            boolean success = future.complete("스레드 1의 결과");
            System.out.println("스레드 1 완료 시도: " + success);
        });
        
        executor.submit(() -> {
            sleep(1000);
            boolean success = future.complete("스레드 2의 결과");
            System.out.println("스레드 2 완료 시도: " + success);
        });
        
        executor.submit(() -> {
            sleep(1200);
            boolean success = future.complete("스레드 3의 결과");
            System.out.println("스레드 3 완료 시도: " + success);
        });
        
        // 첫 번째로 완료된 결과만 사용됨
        String winner = future.get();
        System.out.println("승리한 결과: " + winner);
        
        executor.shutdown();
        executor.awaitTermination(5, TimeUnit.SECONDS);
    }
    
    private static void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```

### 타임아웃 처리와 완료

`실행 시나리오`

1. 2초 후: 타임아웃 스케줄러가 먼저 실행
   - future.complete("타임아웃 - 기본값 사용") → true 반환
   - "타임아웃으로 인한 기본값 설정" 메시지 출력
   - future.get()이 즉시 "타임아웃 - 기본값 사용" 반환
2. 3초 후: 실제 작업 스케줄러가 실행
   - future.complete("정상 작업 완료") → false 반환 (이미 완료됨)
   - "작업이 완료되었지만 이미 타임아웃되었습니다" 메시지 출력

`설명`
-  이 패턴은 "가장 빠른 응답 우선" 원칙을 구현.
- 실제 작업이 타임아웃보다 빠르면 정상 결과를, 느리면 기본값을 사용.
- complete 메서드의 원자적 특성(한 번만 성공)이 race condition 없이 안전한 타임아웃 처리를 보장.
- 이는 외부 API 호출, 데이터베이스 쿼리 등에서 무한 대기를 방지하는 패턴

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class TimeoutCompleteExample {
    public static void main(String[] args) throws Exception {
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(2);
        CompletableFuture<String> future = new CompletableFuture<>();
        
        // 실제 작업 (3초 소요)
        scheduler.schedule(() -> {
            boolean success = future.complete("정상 작업 완료");
            if (success) {
                System.out.println("작업이 정상적으로 완료되었습니다");
            } else {
                System.out.println("작업이 완료되었지만 이미 타임아웃되었습니다");
            }
        }, 3, TimeUnit.SECONDS);
        
        // 타임아웃 처리 (2초 후)
        scheduler.schedule(() -> {
            boolean success = future.complete("타임아웃 - 기본값 사용");
            if (success) {
                System.out.println("타임아웃으로 인한 기본값 설정");
            }
        }, 2, TimeUnit.SECONDS);
        
        System.out.println("작업 시작...");
        String result = future.get();
        System.out.println("최종 결과: " + result);
        
        scheduler.shutdown();
        scheduler.awaitTermination(5, TimeUnit.SECONDS);
    }
}
```

## isCompletedExceptionally 메서드 특징

`CompletableFuture.isCompletedExceptionally()`는 CompletableFuture가 예외에 의해서 완료되었는지 확인하는 메서드.

### 주요 특징
- **isCompletedExceptionally()** 를 사용하면 예외로 인한 완료를 명확히 식별 가능.
- isDone() 만으로는 정상 완료와 예외 완료를 구분 불가했음.

### 기본 사용법

```java
import java.util.concurrent.CompletableFuture;

public class CompletableFutureIsCompletedExceptionallyExample {
    public static void main(String[] args) {
        var futureWithException = CompletableFuture.supplyAsync(() -> {
            return 1 / 0;
        });
        
        try {
            Thread.sleep(100);
            assert futureWithException.isDone();
            assert futureWithException.isCompletedExceptionally();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```

## allOf 메서드 특징

`CompletableFuture.allOf()`는 여러 CompletableFuture를 모아서 하나의 CompletableFuture로 변환하는 정적 메서드.

### 해결하고자 했던 문제
- **병렬 작업 완료 대기**: 여러 개의 독립적인 비동기 작업을 동시에 실행하고, 모든 작업이 완료될 때까지 대기해야 하는 상황
- **순차 실행의 비효율성**: 서로 독립적인 작업들을 순차적으로 실행하면 전체 실행 시간이 늘어나는 문제
- **복잡한 동기화**: 여러 스레드의 작업 완료를 수동으로 체크하고 동기화하는 복잡성

### 주요 특징
- **여러 CompletableFuture를 모아서 하나의 CompletableFuture로 변환 가능**
- **모든 CompletableFuture가 완료되면 상태가 done 으로 변경됨**
- **Void를 반환하므로 각각의 값에 get 으로 접근 필요**

### 기본 사용법

- allOf()는 "대기 설정"만 하고 실제 대기는 안 함
- join()이 있어야 메인 스레드가 "모든 작업 완료까지 대기"

```java
import java.util.concurrent.CompletableFuture;

public class AllOfBasicExample {
    public static void main(String[] args) throws Exception {
        CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> {
            sleep(1000);
            return "작업 1 완료";
        });
        
        CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {
            sleep(1500);
            return "작업 2 완료";
        });
        
        CompletableFuture<String> future3 = CompletableFuture.supplyAsync(() -> {
            sleep(800);
            return "작업 3 완료";
        });
        
        // 모든 작업이 완료될 때까지 대기
        CompletableFuture<Void> allFutures = CompletableFuture.allOf(future1, future2, future3);
        allFutures.join(); // 모든 작업 완료 대기
        
        // 각각의 결과에 개별적으로 접근
        System.out.println("결과 1: " + future1.get());
        System.out.println("결과 2: " + future2.get());  
        System.out.println("결과 3: " + future3.get());
        System.out.println("모든 작업 완료!");
    }
    
    private static void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```

## anyOf 메서드 특징

`CompletableFuture.anyOf()`는 여러 CompletableFuture 중 가장 먼저 완료되는 하나의 결과를 기다리는 정적 메서드.

### 해결하고자 했던 문제
- **경합 상황 처리**: 여러 개의 비동기 작업 중 가장 빠른 결과만 필요한 상황 (예: 여러 서버에서 같은 데이터 요청)
- **타임아웃과 실제 작업의 경합**: 실제 작업과 타임아웃 처리를 동시에 실행하여 더 빠른 결과 채택
- **최적화된 응답**: 여러 대안적 방법 중 가장 빠른 하나의 결과만 사용하여 응답 시간 단축

### 주요 특징
- **여러 CompletableFuture를 모아서 하나의 CompletableFuture로 변환 가능**
- **주어진 future 중 하나라도 완료되면 상태가 done으로 변경됨**
- **제일 먼저 done 상태가 되는 future의 값을 반환함**

### 기본 사용법

```java
import java.util.concurrent.CompletableFuture;

public class AnyOfBasicExample {
    public static void main(String[] args) throws Exception {
        CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> {
            sleep(1000);
            return "작업 1 완료";
        });
        
        CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {
            sleep(1500);
            return "작업 2 완료";
        });
        
        CompletableFuture<String> future3 = CompletableFuture.supplyAsync(() -> {
            sleep(800);  // 가장 빠름
            return "작업 3 완료";
        });
        
        // 가장 먼저 완료되는 작업을 기다림
        CompletableFuture<Object> anyFuture = CompletableFuture.anyOf(future1, future2, future3);
        Object result = anyFuture.join();
        
        System.out.println("가장 빠른 결과: " + result); // "작업 3 완료"
        System.out.println("전체 실행 시간: 약 800ms");
    }
    
    private static void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```

### 여러 서버 요청 예제

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ThreadLocalRandom;

public class AnyOfServerExample {
    public static void main(String[] args) throws Exception {
        // 3개의 서버에서 같은 데이터 요청
        CompletableFuture<String> server1 = CompletableFuture.supplyAsync(() -> {
            int delay = ThreadLocalRandom.current().nextInt(500, 2000);
            sleep(delay);
            return "서버1 응답 (지연시간: " + delay + "ms)";
        });
        
        CompletableFuture<String> server2 = CompletableFuture.supplyAsync(() -> {
            int delay = ThreadLocalRandom.current().nextInt(500, 2000);
            sleep(delay);
            return "서버2 응답 (지연시간: " + delay + "ms)";
        });
        
        CompletableFuture<String> server3 = CompletableFuture.supplyAsync(() -> {
            int delay = ThreadLocalRandom.current().nextInt(500, 2000);
            sleep(delay);
            return "서버3 응답 (지연시간: " + delay + "ms)";
        });
        
        System.out.println("3개 서버에 동시 요청 시작...");
        long startTime = System.currentTimeMillis();
        
        // 가장 빠른 서버의 응답만 사용
        CompletableFuture<Object> fastest = CompletableFuture.anyOf(server1, server2, server3);
        String result = (String) fastest.join();
        
        long endTime = System.currentTimeMillis();
        System.out.println("가장 빠른 응답: " + result);
        System.out.println("총 응답 시간: " + (endTime - startTime) + "ms");
    }
    
    private static void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```

### 타임아웃 처리와 조합

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

public class AnyOfTimeoutExample {
    public static void main(String[] args) throws Exception {
        // 실제 작업 (3초 소요)
        CompletableFuture<String> actualWork = CompletableFuture.supplyAsync(() -> {
            sleep(3000);
            return "실제 작업 완료";
        });
        
        // 타임아웃 작업 (2초 후 타임아웃)
        CompletableFuture<String> timeout = CompletableFuture.supplyAsync(() -> {
            sleep(2000);
            return "타임아웃 발생";
        });
        
        System.out.println("작업 시작...");
        long startTime = System.currentTimeMillis();
        
        // 실제 작업과 타임아웃 중 먼저 완료되는 것 사용
        CompletableFuture<Object> raceResult = CompletableFuture.anyOf(actualWork, timeout);
        String result = (String) raceResult.join();
        
        long endTime = System.currentTimeMillis();
        System.out.println("결과: " + result);
        System.out.println("실행 시간: " + (endTime - startTime) + "ms");
        
        // 실제 작업이 타임아웃보다 빨랐다면 "실제 작업 완료", 
        // 아니면 "타임아웃 발생" 출력
    }
    
    private static void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```

### anyOf vs allOf 비교

```java
import java.util.concurrent.CompletableFuture;

public class AnyOfVsAllOfExample {
    public static void main(String[] args) throws Exception {
        CompletableFuture<String> task1 = CompletableFuture.supplyAsync(() -> {
            sleep(1000);
            return "작업1";
        });
        
        CompletableFuture<String> task2 = CompletableFuture.supplyAsync(() -> {
            sleep(1500);
            return "작업2";
        });
        
        CompletableFuture<String> task3 = CompletableFuture.supplyAsync(() -> {
            sleep(800);
            return "작업3";
        });
        
        System.out.println("=== anyOf 테스트 ===");
        long anyOfStart = System.currentTimeMillis();
        
        CompletableFuture<Object> anyResult = CompletableFuture.anyOf(task1, task2, task3);
        System.out.println("anyOf 결과: " + anyResult.join());
        System.out.println("anyOf 실행 시간: " + (System.currentTimeMillis() - anyOfStart) + "ms (약 800ms)");
        
        // 새로운 작업들로 allOf 테스트
        CompletableFuture<String> newTask1 = CompletableFuture.supplyAsync(() -> {
            sleep(1000);
            return "새작업1";
        });
        
        CompletableFuture<String> newTask2 = CompletableFuture.supplyAsync(() -> {
            sleep(1500);
            return "새작업2";
        });
        
        CompletableFuture<String> newTask3 = CompletableFuture.supplyAsync(() -> {
            sleep(800);
            return "새작업3";
        });
        
        System.out.println("\n=== allOf 테스트 ===");
        long allOfStart = System.currentTimeMillis();
        
        CompletableFuture<Void> allResult = CompletableFuture.allOf(newTask1, newTask2, newTask3);
        allResult.join();
        System.out.println("allOf 완료, 모든 결과: " + newTask1.join() + ", " + newTask2.join() + ", " + newTask3.join());
        System.out.println("allOf 실행 시간: " + (System.currentTimeMillis() - allOfStart) + "ms (약 1500ms)");
    }
    
    private static void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```

## CompletableFuture의 한계

`CompletableFuture`는 Java 8에서 도입된 강력한 비동기 처리 도구이지만, 현대적인 리액티브 프로그래밍 관점에서는 몇 가지 근본적인 한계가 있습니다.

### 주요 한계점

1. 지연 로딩 기능 부재 : 생성과 동시에 즉시 실행
2. 지속 생성 데이터 처리에 대한 어려움 : 단일 값만 처리할 수 있어 연속적인 데이터 스트림에 부적합
3. 재사용성 : 한 번 완료된 CompletableFuture는 재사용 불가
4. 취소 및 제어 어려움 : 취소나 재시도 메커니즘이 부족
5. 실시간 데이터 처리의 한계 : 실시간으로 들어오는 데이터를 효율적으로 처리하기 어려움

### 1. 지연 로딩 기능 부재

CompletableFuture는 생성과 동시에 즉시 실행됩니다 (eager evaluation):

```java
import java.util.concurrent.CompletableFuture;

public class EagerExecutionProblem {
    public static void main(String[] args) throws Exception {
        System.out.println("CompletableFuture 생성 전");
        
        // 이 순간 즉시 백그라운드에서 실행 시작
        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
            System.out.println("작업 실행 중... (즉시 시작됨)");
            sleep(2000);
            return "완료";
        });
        
        System.out.println("CompletableFuture 생성 후");
        System.out.println("2초 대기 중...");
        Thread.sleep(2000);
        
        // 이미 완료되어 있음
        System.out.println("결과: " + future.get()); // 즉시 반환
    }
    
    private static void sleep(long millis) {
        try { Thread.sleep(millis); } 
        catch (InterruptedException e) { Thread.currentThread().interrupt(); }
    }
}
```

### 2. 스트리밍 데이터 처리의 어려움

CompletableFuture는 단일 값만 처리할 수 있어 연속적인 데이터 스트림에 부적합합니다:

```java
import java.util.concurrent.CompletableFuture;
import java.util.ArrayList;
import java.util.List;

public class StreamingDataProblem {
    public static void main(String[] args) throws Exception {
        // ❌ 문제: CompletableFuture로 연속 데이터 처리 시도
        CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> "데이터1");
        CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> "데이터2");
        CompletableFuture<String> future3 = CompletableFuture.supplyAsync(() -> "데이터3");
        
        // 각각을 개별적으로 처리해야 함 - 비효율적
        System.out.println(future1.get());
        System.out.println(future2.get());
        System.out.println(future3.get());
        
        // 실시간으로 들어오는 데이터를 처리하기 위해서는
        // 각 데이터마다 새로운 CompletableFuture를 만들어야 함
        List<CompletableFuture<Void>> futures = new ArrayList<>();
        
        for (int i = 1; i <= 5; i++) {
            final int data = i;
            futures.add(CompletableFuture.runAsync(() -> {
                System.out.println("실시간 데이터 처리: " + data);
            }));
        }
        
        // 모든 Future 완료 대기
        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
    }
}
```

### 3. 재사용성 문제

한 번 완료된 CompletableFuture는 재사용 불가 :

```java
import java.util.concurrent.CompletableFuture;

public class ReuseabilityProblem {
    public static void main(String[] args) throws Exception {
        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
            System.out.println("첫 번째 실행");
            return "첫 번째 결과";
        });
        
        String result1 = future.get();
        System.out.println("첫 번째 호출: " + result1);
        
        // ❌ 문제: 이미 완료된 Future는 재사용 불가
        // future를 다시 실행할 방법이 없음
        String result2 = future.get(); // 같은 결과만 반환, 재실행 안됨
        System.out.println("두 번째 호출: " + result2);
        
        // 새로운 작업을 위해서는 새로운 CompletableFuture 생성 필요
        CompletableFuture<String> newFuture = CompletableFuture.supplyAsync(() -> {
            System.out.println("새로운 실행");
            return "두 번째 결과";
        });
        
        System.out.println("새 Future 결과: " + newFuture.get());
    }
}
```

### 4. 취소 및 제어 어려움

CompletableFuture는 진정한 취소나 재시도 메커니즘이 부족합니다:

```java
import java.util.concurrent.CompletableFuture;

public class CancellationProblem {
    public static void main(String[] args) throws Exception {
        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
            try {
                System.out.println("5초 작업 시작...");
                Thread.sleep(5000); // 5초 작업
                System.out.println("작업 완료!");
                return "완료";
            } catch (InterruptedException e) {
                System.out.println("작업이 중단됨");
                return "취소됨";
            }
        });
        
        // 1초 후 취소 시도
        Thread.sleep(1000);
        boolean cancelled = future.cancel(true);
        System.out.println("취소 성공: " + cancelled);
        
        try {
            String result = future.get();
            System.out.println("결과: " + result);
        } catch (Exception e) {
            System.out.println("예외 발생: " + e.getClass().getSimpleName());
        }
        
        // ❌ 문제: 취소되어도 백그라운드 작업은 계속 실행될 수 있음
        // 진정한 취소나 재시도 메커니즘이 부족함
        Thread.sleep(6000); // 백그라운드 작업이 계속 실행되는지 확인
    }
}
```

### 5. 실시간 데이터 처리의 한계

```java
import java.util.concurrent.CompletableFuture;

public class RealTimeDataLimitation {
    public static void main(String[] args) throws Exception {
        // ❌ CompletableFuture로 실시간 주식 가격 스트림 처리 시도
        // 각 가격 업데이트마다 새로운 Future가 필요함
        
        System.out.println("주식 가격 모니터링 시작...");
        
        for (int i = 0; i < 10; i++) {
            final int price = 100 + i;
            
            // 각 가격마다 새로운 CompletableFuture 생성 필요
            CompletableFuture.runAsync(() -> {
                System.out.println("현재 주식 가격: $" + price);
                
                if (price > 105) {
                    System.out.println("⚠️ 가격 상승 알림: $" + price);
                }
            });
            
            Thread.sleep(500); // 0.5초마다 가격 업데이트
        }
        
        Thread.sleep(1000);
        System.out.println("모니터링 완료");
        
        // 리액티브 스트림 방식이라면:
        // Observable.interval(500, TimeUnit.MILLISECONDS)
        //     .map(i -> 100 + i)
        //     .filter(price -> price > 105)
        //     .subscribe(price -> System.out.println("가격 알림: $" + price));
    }
}
```

## 리액티브 프로그래밍과의 비교

이러한 한계들 때문에 **RxJava, Project Reactor** 같은 리액티브 프로그래밍 라이브러리들이 등장했으며, 이들은:

- **지연 실행 (Lazy Evaluation)**: 구독할 때까지 실행하지 않음
- **스트림 처리**: 연속적인 데이터를 자연스럽게 처리
- **백프레셔**: 데이터 생산 속도 제어
- **강력한 취소/재시도**: 세밀한 생명주기 관리
- **풍부한 연산자**: map, filter, reduce 등 함수형 연산

CompletableFuture는 단순한 비동기 작업에는 적합하지만, 복잡한 데이터 스트림이나 리액티브한 시스템에는 한계가 있습니다.
```
