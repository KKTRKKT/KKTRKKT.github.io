---
title: CompletableFuture 2
category: java
---

작업들을 조합하는 메소드와 예외처리하는 메소드

<!-- more -->

### 작업 조합 메소드

thenCompose(Function\<T, CompletionStage\> fn)<br/>
작업이 끝나면 결과물을 CompletableFuture를 반환하는 fn에 넘긴다.

예제
```
	CompletableFuture<String> hello = CompletableFuture.supplyAsync(() -> {
		System.out.println("Hello " + Thread.currentThread().getName());
		return "Hello";
	});

	// CompletableFuture을 연결해서 사용한다.
	CompletableFuture<String> helloWorld = hello.thenCompose(App::getWorld);
	System.out.println(helloWorld.get()); 
```

getWorld
```
	private static CompletableFuture<String> getWorld(String message) {
		return CompletableFuture.supplyAsync(() -> {
			System.out.println(message + " World " + Thread.currentThread().getName());
			return message + " World";
		});
	}
```

thenCombine(CompletionStage other, BiFunction fn)<br/>
작업의 결과와, other의 결과 fn에 넘겨준다.

예제
```
	CompletableFuture<String> world = CompletableFuture.supplyAsync(() -> {
		System.out.println("World " + Thread.currentThread().getName());
		return "World";
	});

	// CompletableFuture의 각각의 결과값을 받아서 계산한다.
	CompletableFuture<String> helloWorld2 = hello.thenCombine(world, (h, w) -> h + " " + w);
	System.out.println(helloWorld2.get());
```

### 2개 이상의 작업을 처리하는 메소드

allOf(CompletableFuture... cfs)<br/>
cfs의 작업들이 모두 완료되면 null을 반환한다.

예제
```
	CompletableFuture<String> hello = CompletableFuture.supplyAsync(() -> {
		System.out.println("Hello " + Thread.currentThread().getName());
		return "Hello";
	});

	CompletableFuture<String> world = CompletableFuture.supplyAsync(() -> {
		System.out.println("World " + Thread.currentThread().getName());
		return "World";
	});

	CompletableFuture<Integer> hundred = CompletableFuture.supplyAsync(() -> {
		System.out.println("Hundred " + Thread.currentThread().getName());
		return 100;
	});

	// 작업결과는 항상 null이다.
	CompletableFuture<Void> allOf = CompletableFuture.allOf(hello, world, hundred)
					.thenAccept((r)->{
						System.out.println(r + " " + hello.join() + " " + world.join()  + " " + hundred.join());
					});

	System.out.println(allOf.get());
```

anyOf(CompletableFuture... cfs)<br/>
가장 빨리 끝나는 작업의 결과를 반환한다.

예제
```
	// 가장 빨리 끝나는 작업의 결과물 출력
	CompletableFuture<Object> anyOf = CompletableFuture.anyOf(hello, world, hundred)
			.thenApply(r -> r);
	System.out.println(anyOf.get());
```

### 예외처리 메소드

exceptionally(Function fn)
작업 도중 예외가 발생하면 실행된다. fn의 반환값이 get() 호출시 반환된다.

예제
```
	boolean throwError = true;

	// 예외 처리
	CompletableFuture<String> kktrkkt = CompletableFuture.supplyAsync(() -> {
		if (throwError) {
			throw new IllegalStateException();
		}
		return "KKTRKKT";
	}).exceptionally(ex -> {
		System.out.println(ex);
		return "error";
	});

	System.out.println(kktrkkt.get());
```

handle(BiFunction fn)
항상 실행되며, 작업이 완료되면 첫번째 인자에 결과가, 예외가 발생시 두번째 인자에 예외를 던져준다.

예제
```
	// 범용적인 예외 처리
	CompletableFuture<String> handle = CompletableFuture.supplyAsync(()->{
		if(false){
			throw new IllegalStateException();
		}
		return "anything";
	}).handle((result, ex) -> {
		if (ex != null) {
			System.out.println(ex);
			return "error";
		}
		System.out.println(result);
		return result;
	});
	System.out.println(handle.get());	
```

예제는 
<a href="https://github.com/KKTRKKT/java8to11/blob/master/src/main/java/me/kktrkkt/java8to11/excutors/App.java#L19" target="_blank">이곳</a>
에서 확인할 수 있다.