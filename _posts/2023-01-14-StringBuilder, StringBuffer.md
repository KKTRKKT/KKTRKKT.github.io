---
title: StringBuilder, StringBuffer
category: java
---

String의 내부 값은 변경할 수 없다. 아래 코드에서 immutable 객체를 수정한 것처럼 보이지만, "abcdef"라는 새 객체를 생성한 것이다.
<!-- more -->
```
String immutable = "abc";
immutable = immutable + "def";
```

내부값이 변경 가능한 문자열을 만드려면 StringBuilder 또는 StringBuffer을 사용해야 한다. 
```
StringBuffer sb = new StringBuffer("abc");
sb.append("def");
```
StringBuffer의 append 함수를 통해 내부 값을 변경하고 있다

String과 String Buffer, String Builder로 문자열을 수정할 때 어떤 차이점 있는지 알아보자.

### String vs String Buffer vs String Builder
String 객체는 내부값이 변하지 않기 때문에, 문자열을 수정할 때마다 새로운 객체를 생성한다. 따라서 문자열 값만 변경하는 String Builder나 String Buffer에 비해 상대적으로 성능이 떨어진다. 하지만 불변성 덕분에 여러 스레드간에 안전하게 공유할 수 있다는 장점이 있다.

String Buffer는 append를 통해 내부 값을 수정할 수 있고, 스레드에 안전하다.

String Builder는 스레드에 안전하지 않지만, 안전한 구현인 String Buffer에 비해 빠르다. 하지만 성능에서 큰 차이는 없다.

### 결론
상황에 맞춰 여러 스레드 사이에서 문자열을 수정할 일이 있으면 String Buffer를 사용하고, 단일 스레드에서 문자열 수정은 String Builder를 사용한다