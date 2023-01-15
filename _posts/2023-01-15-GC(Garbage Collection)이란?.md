---
title: GC(Garbage Collection)이란?
category: java
---

힙 영역에서 더 이상 사용하지 않는 객체를 mark & swipe 과정을 통해 자동으로 정리해준다.
<!-- more -->

### mark & swipe 과정 
mark 과정에서 참조되지 않는 객체를 체크한다.       
swipe 과정에서 mark한 객체들을 제거하는데 이때 stop the world가 일어나며 jvm은 모든 실행을 멈춘다.  
따라서 system GC는 무분별하게 사용하면 성능에 심각한 데미지를 줄 수 있다.

GC를 무분별하지 않게 사용하기 위해서 객체를 등록하는 과정도 특별하다.

### Generation heap
젊은 객체와 늙은 객체로 나뉘어진다.     
많은 객체가 오랫동안 살아남지 못하기 때문에 생명주기가 짦은 객체를 빨리 쳐내기 위해 구분한다.

> old generation    
to survive  
from survive    
eden    

초기 객체들은 eden에 생성되며 eden이 full이 되면 GC가 일어난다. 이때 GC는 minor GC로 빠르고 효율적이다 실행중인 작업을 멈추지 않는다.    

GC 이후에 살아남은 객체들은 from survive로 영역으로 이동한다. 실제로는 이동이 아니라 값만 바뀐다.   

그리고 eden에서 한번 더 GC가 일어나면 to survive 마지막으로 old generation 영역으로 이동한다.   

young generation이 full되면 majar GC가 일어난다. 이 때 GC는 minor GC보다 10배 더 시간이 걸리고, GC를 작업을 제외한 모든 실행중인 작업이 멈춘다. 





