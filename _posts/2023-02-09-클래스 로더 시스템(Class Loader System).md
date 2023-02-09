---
title: 클래스 로더 시스템(Class Loader System)
category: java
---

로딩, 링크, 초기화 세부과정을 살펴본다.
<!-- more -->

### 로딩(loading)
클래스 로더가 .class 파일을 읽고 적절한 바이너리 데이터를 생성해 메소드 영역에 클래스 정보를 저장한다.<br>
로딩이 끝나면 Class 객체를 생성해 힙 영역에 저장한다.

클래스 로더 종류

부트 스트랩 클래스 로더(BootClassLoader)<br>
jdk.boot.class.path.append에 존재하는 클래스를 읽어온다.

플랫폼 클래스 로더(PlatformClassLoader)

애플리케이션 클래스 로더(AppClassLoader)<br>
java.class.path 존재하는 클래스를 읽어온다. 보통 패키지에 있는 클래스들을 읽어온다.

메소드 영역에 저장되는 클래스 정보

FQCN(Full Qualified Class Name)

class, interface, enum 구분 정보

메소드와 변수

### 링크(linking)
링크에서 하는 일은 크게 3가지로 나뉜다.

Verifiy: .class 파일 형식이 유효한지 검사한다.

Prepare: 스태틱과 기본값 할당에 필요한 메모리를 준비하는 과정

Resolve(optional): 심볼릭 레퍼런스를 메소드 영역에 있는 실제 레퍼런스로 교체한다.<br>
심볼릭 레퍼런스는 실제 메모리 주소가 아니라 이름만 가지는 논리 레퍼런스다.

### 초기화
링크에서 Prepare한 메모리 영역에다가 static한 변수들의 값을 할당하는 과정이다.


