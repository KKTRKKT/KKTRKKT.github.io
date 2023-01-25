---
title: Comparator
category: java
---

데이터구조에 순서를 제어하거나 제공하는데 사용하는 비교 연산자다.

<!-- more -->

예제
```
    list.sort(String::compareToIgnoreCase);
    list.forEach(System.out::println); // 정렬된 리스트가 출력된다.
```

### 기본 메소드

Comparator\<T\> reversed()  
정렬을 반전시키는데 사용한다.

예제
```
    Comparator<String> compareToIgnoreCase = String::compareToIgnoreCase;
    list.sort(compareToIgnoreCase.reversed()) 
```

Comparator\<T\> thenComparing(Function keyExtractor)    
객체 상태별 정렬시 유용하다.

thenComparing 사용 예제는
<a href="https://github.com/KKTRKKT/java8to11/blob/5de0ffc6f9a6f71d2b21e76ba01a98f31fe122d2/src/main/java/me/kktrkkt/java8to11/api/defaultMethod/App.java#L46" target="_blank">이곳</a>
에서 확인할 수 있다.

### static 메소드
reverseOrder(), naturalOrder(), nullsFirst(), nullsLast() 등
static 메소드들을 사용하기 위해서는 Comparable을 구현이 필요할 수 있다.

static 메소드 사용 예제는
<a href="https://github.com/KKTRKKT/java8to11/blob/5de0ffc6f9a6f71d2b21e76ba01a98f31fe122d2/src/main/java/me/kktrkkt/java8to11/api/defaultMethod/App.java" target="_blank">이곳</a>
에서 확인할 수 있다.
