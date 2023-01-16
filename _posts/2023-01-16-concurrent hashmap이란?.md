---
title: concurrent hashmap이란?
category: java
---

thread-safe하면서 성능도 뛰어난 자료구조다.

<!-- more -->

hashmap은 성능이 뛰어나지만 thread-safe하지 않고, hashtable은 동기화는 되지만 성능이 뛰어나지 않다(다른 synchronized map도 마찬가지)

그래서 성능도 뛰어나고, thread-safe한 자료구조가 concurrent map이다. concurrent map은 검색 작업에 대해 동기화하지 않고, 데이터 삽입 작업 중 해당 데이터에 대해서만 동기화를 하기 때문에 효율적인 동기화를 한다

주의할 점으로 수정 작업을 제외한 나머지 작업들은 동기화가 이루어지지 않으므로 수정 작업이 동시에 일어날 경우, 신뢰성을 보장할 수 없다. 

추가로 데이터가 int형 최대값을 넘을 수 있으므로 mappingCount() (long 반환)를 사용하면 좋다

키의 순서 있는 맵 ConcurrentNavigableMap 인터페이스
treeMap 동시성 버전 ConcurrentSkipListMap





