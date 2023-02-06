---
title: Metaspace
category: java
---

자바 1.8 이후부터 메모리 영역중에 PermGen 영역이 사라지고 Metaspace 영역이 생겼다.
<!-- more -->

### PermGen
클래스의 메타데이터정보를 담고 있는 메모리 영역으로, 힙 영역에 속해있다.

크기가 고정되어 있고, 크기를 예측하기가 어려워, 메모리 문제(클래스가 계속 생성되는 경우)가 일어나는 일이 잦았다.

### Metaspace
클래스의 메타데이터 정보를 담고, Native 영역에 속해있다. <br/>
크기가 제한되어 있지 않고, 필요한만큼 늘어난다.<br/>

제한사항으로 초기사이즈와 최대 사이즈를 설정할 수 있다.<br/>
-XX:MetaspaceSize=N 초기사이즈 설정<br/>
-XX:MaxMetaspzceSize=N 최대사이즈 설정

효율적으로 설정하려면 Metaspace에 대한 모니터링이 필요하다.
- jstat 
