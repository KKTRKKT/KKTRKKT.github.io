---
title: CompletableFuture 1
category: java
---

완료 시 호출할 수 있는 콜백 함수 및 작업을 지원하는 Future다.
<!-- more -->

### 메소드

completedFuture(U value)<br/>
완료된 CompletableFuture를 생성한다. get() 호출시 value를 반환한다.

예제
```
	CompletableFuture<String> stringCompletableFuture = CompletableFuture.completedFuture("Hello");
	System.out.println(stringCompletableFuture.get());
```

complete(T value)<br/>
작업이 완료 상태가 아니면 완료상태로 바꾸고, get() 호출시 value를 반환한다. 완료 상태면 아무일도 일어나지 않는다. 

예제
```
	CompletableFuture<String> stringCompletableFuture = CompletableFuture.completedFuture("Hello")
	stringCompletableFuture.complete("hello");
	System.out.println(stringCompletableFuture.get());
```

runAsync(Runnable runnable)<br/>
작업의 리턴값이 없을 경우에 사용한다

예제
```
	CompletableFuture<Void> runAsync = CompletableFuture.runAsync(getRunnable("runAsync"));
	runAsync.get();
```


supplyAsync(Supplier supplier)<br/>
작업의 리턴값이 있을 경우 사용한다.

예제
```
	CompletableFuture<String> supplyAsync = CompletableFuture.supplyAsync(() -> "supplyAsync" 
		+ Thread.currentThread().getName());
	System.out.println(supplyAsync.get());
```

thenApply(Function fn)<br/>
리턴값이 있는 콜백함수

예제
```
	CompletableFuture<String> supplyAsync = CompletableFuture.supplyAsync(() -> "supplyAsync" 
		+ Thread.currentThread().getName());
	String supplyAsyncUpper = supplyAsync.thenApply(String::toUpperCase).get();
	System.out.println(supplyAsyncUpper);
	
```

thenAccept(Consumer action)<br/>
리턴값이 없는 콜백함수

예제
```
	CompletableFuture<String> supplyAsync = CompletableFuture.supplyAsync(() -> "supplyAsync" 
		+ Thread.currentThread().getName());
	supplyAsync.thenAccept(r -> System.out.println(r.toUpperCase())).get();
```

thenRun(Runable action)<br/>
결과 상관없는 콜백함수

예제
```
	CompletableFuture<String> supplyAsync = CompletableFuture.supplyAsync(() -> "supplyAsync" 
		+ Thread.currentThread().getName());
	supplyAsync.thenRun(()->{
		System.out.println("isDone! "+Thread.currentThread().getName());
	}).get();
```

then*Async(task, Excutor excutor)<br/>
작업을 실행할 excutor를 설정할 수 있다.

예제
```
	CompletableFuture<String> supplyAsync = CompletableFuture.supplyAsync(() -> "supplyAsync" 
		+ Thread.currentThread().getName());
	ExecutorService executorService = Executors.newFixedThreadPool(4);
	supplyAsync.thenRunAsync(()-> System.out.println(Thread.currentThread().getName()), executorService);
	executorService.shutdown();
```

예제는 
<a href="https://github.com/KKTRKKT/java8to11/blob/master/src/main/java/me/kktrkkt/java8to11/excutors/App.java#L116" target="_blank">이곳</a>
에서 확인할 수 있다.