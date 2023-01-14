---
title: constant pool
category: java
---

String Constant Pool에 의해 문자열 리터럴과 생성자로 생성한 문자열의 주소값이 다르다.
<!-- more -->

## 개요

> String newString1 = new String("abc");    
String newString2 = new String("abc");  
newString1 == newString2; // false  
> 
String StringLiteral1 = "abc";  
String StringLiteral2 = "abc";  
StringLiteral1 == StringLiteral2; // true
```
String Constant Pool에 의해 문자열 리터럴과 생성자로 생성한 문자열의 주소값이 다르다.
```

변수를 선언하거나 객체를 생성할 때마다 메모리에 저장된다. java에서는 이 메모리를 힙과 스택 두 영역으로 나눈다. 이 두 영역중 String Constant Pool이 어디에 존재하고 무슨 역할을 하는지 알아보자.

## String Literal로 생성하면

String Literal로 String을 선언하면 JVM은 String Pool에 객체를 생성하고 해당 참조를 스택에 저장한다. Constant Pool은 문자열이 저장되는 특별한 메모리 영역이다.

java의 String은 불변성을 가지고 있다. 불변성은 const로 선언된 변수처럼 한번 선언되면 바뀌지 않는 특성이다. JVM은 String Pool에 각 문자열 리터럴의 복사본을 하나만 저장하여 문자열에 할당된 메모리 양을 최적화할 수 있다. 이것을 interning이라고 한다.

예를 들어 String 변수를 만들고 값을 할당하면 JVM이 String Pool에서 동일한 값의 String을 검색한다. 발견되면 Java 컴파일러는 추가 메모리를 할당하지 않고 메모리 주소값을 반환한다. 찾을 수 없으면 풀에 추가하고(interning) 해당 주소값을 반환한다.

따라서 아래와 같은 결과가 나온다.

>String StringLiteral1 = "abc";
String StringLiteral2 = "abc";
StringLiteral1 == StringLiteral2; // true


```
참고로 Constant Pool은 구현 시 Hashmap을 사용한다. Hashmap에는 동일한 hashcode를 가진 String 목록이 들어있다.
```

## new(생성자)로 생성하면
new 연산자를 사용하여 String 객체를 생성하면 항상 힙 메모리에 새 객체를 생성한다. 

따라서 아래와 같은 결과들이 나오게 된다.

> String newString1 = new String("abc");
String newString2 = new String("abc");
newString1 == newString2; // false

> String StringLiteral = "abc";
String newString = new String("abc");
StringLiteral == newString; // false

```
new 키워드로 생성한 String 객체도 intern() 함수를 통해 직접 interning을 해줄 수 있다. 
intern() 함수를 실행하면 해당 String을 interning하고 주소값을 반환한다.

String StringLiteral = "abc";
String newString = new String("abc");
String internedString = newString.intern();
StringLiteral == internedString // true
```

## String Constant Pool은 어디에 있지
String Constant Pool은 힙과 스택 두 영역중 한곳에 있을것이다. 그런데 왜 어디에 있는지가 중요하냐면 GC(Garbage Collector)가 활동하는 영역이 힙이기 때문이다. GC는 참조되지 않는 값들을 회수해 메모리누수를 방지한다.

Java7 이상부터 String Constant Pool은 힙 위에 올라가 GC의 영향을 받는다. 

다음 사진을 보면, Stack에는 기본자료형인 int의 num과 힙의 개체인 name, d의 참조값이 올라가 있다. Heap에는 참조자료형인 Demo의 개체가 있고, String Pool 영역 안에 String Literal로 선언한 name의 문자열 값이 올라가있다. 만약 new 키워드로 String을 선언했다면 Demo Object와 같이 heap 영역 어딘가에 생성됐을 것이다

![](https://images.velog.io/images/paulhana6006/post/c1b8668b-62a6-4ee9-8868-2636b146748f/image.png)

```
일반적으로 스택은 수명이 짧은 데이터를 저장한다. 지역 변수(기본 자료형), 힙 개체 참조, 실행 중인 메서드 등.
힙은 런타임에 Java 개체 및 JRE 클래스를 저장한다.
```

## 이제 그만 알아보자
문자열은 메모리를 할당을 최적화할 수 있는 String Constant Pool에 올려서 사용하자.

### 참고
> https://velog.io/@paulhana6006/자바-문자열-쓸-때-이거는-알고-쓰자

