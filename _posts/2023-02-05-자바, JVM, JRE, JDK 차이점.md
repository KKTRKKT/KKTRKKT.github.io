---
title: 자바, JVM, JRE, JDK 차이점
category: java
---

자바, JVM, JRE, JDK의 차이점을 알아본다.
<!-- more -->

### 자바
프로그래밍 언어<br/>
JDK의 자바 컴파일러를 이용해 바이트 코드로 컴파일할 수 있다.<br/>
오라클의 Oracle JDK 11버전부터 싱용으로 사용시 유료화<br/>
Oracle openJDK는 무료<br/>

### JVM(Java Virtual Machine)
자바 바이트 코드를 어떻게 실행한건지에 대한 표준(JVM 자체) 스펙이며 구현체(특정 벤더가 구현한 JVM)다.<br/>
자바 바이트 코드를 OS에 특화된 코드로 변환(인터프리터, JIT 컴파일러)하여 실행한다. <br/>
플랫폼마다 서로 다르게 구현되므로 플랫폼에 종속적이다. 

스팩 : https://docs.oracle.com/javase/specs/jvms/se8/html/<br/>
구현체: 오라클, 아마존, Azul...

### JRE(Java Runtime Environment)
자바 애플리케이션을 실행할 수 있도록 구성된 배포판이다<br/>
JVM, 자바의 핵심 라이브러러리, 런타임 환경에서 사용하는 프로퍼티 세팅이나 리소스 파일을 가지고 있다.<br/>
자바 개발 관련 툴들은 들어있지 않다.(javac, javap 등)

### JDK(Java Development Kit)
JRE +  개발 관련 툴<br/>
소스 코드를 작성하는 자바 언어는 플랫폼에 독립적이다. OS가 어디든 똑같은 결과물을 낸다.<br/>
오라클은 자바 11부터 JRE를 따로 제공하지 않음

### JVM 언어
JVM 기반으로 동작 가능한 언어들<br/>
Clojure, Groovy, JRuby, Jython, Kotlin, Scala...

JVM은 바이트 코드를 기반으로 동작하기 때문에 어떤 언어로 짜든 바이트 코드로 컴파일할 수 있다면 작동할 수 있다.

