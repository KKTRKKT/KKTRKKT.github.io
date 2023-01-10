---
title: lazy operator란?
category: java
---

바로바로 연산하는것이 아닌 결과에 따라 연산하는것이다. 반대로 결과에 상관없이 바로 연산하는것은 eager operator이다

<!-- more -->

### eager operator 예시 
```
static String eagerMatch(boolean b1, boolean b2) {
    return b1 && b2 ? "match" : "incompatible!";
}  

public void solution_1() {
    boolean b1 = compute("Hello_1");
    boolean b2 = compute("Hello_2");
    eagerMatch(b1, b2);
}
```
결과에 상관없이 b1, b2의 결과가 나온다.

### lazy operator 예시
```
static String lazyMatch(Supplier<Boolean> a, Supplier<Boolean> b) {
    return a.get() && b.get() ? "match" : "incompatible!";
}

public void solution_2() {
    Supplier<Boolean> a = () -> compute("Hello_1");
    Supplier<Boolean> b = () -> compute("Hello_2"); 
    lazyMatch(a, b);
}
```
결과에 따라 a만 호출되고 b는 호출되지 않는다