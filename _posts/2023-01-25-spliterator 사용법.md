---
title: spliterator 사용법
category: java
---

Iterable 기본 메소드로 Spliterater\<E\> spliterator() 형태를 지닌다.<br/>
.trySplit()을 이용해 컬렉션을 반으로 나눌수 있다.<br/>
tryAdvance(Consumer action)를 통해 작업을 수행한다.     

병렬 계산시 유용하게 사용 가능하다.
<!-- more -->

예제
```
    Spliterator<String> spliterator = list.spliterator();
    Spliterator<String> trySpliterator = spliterator.trySplit(); // trySplit한 부분이 앞부분이 된다.
    //list가 1, 2, 3, 4면
    while(trySpliterator.tryAdvance(System.out::println)) //  1 2
    while(spliterator.tryAdvance(System.out::println)) // 3 4
```
