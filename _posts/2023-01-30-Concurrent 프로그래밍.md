---
title: Concurrent 프로그래밍
category: java
---

Concurrent 소프트웨어는 동시에 여러 작업을 할 수 있다.      
<!-- more -->
예) 게임을 다운로드 받으면서, 웹 쇼핑을 할 수 있다.     
예) docs를 찾아보면서, 노래를 듣는다    

자바에서 지원하는 concurrent 프로그래밍은 두가지가 있다.    
멀티 프로세싱 (process Builder)     
멀티 스레드     

멀티스레드를 구현하기 위해서는      
Thread를 상속하거나     
Runnable 인터페이스를 구현또는 람다로 표현한다      

멀티스레드의 주요 기능 3가지        
sleep()     
자는 동안은 다른 스레드에게 우선순위가 넘어감       

interrupt()     
인터럽트가 발생하면 InterruptedException이 발생한다. catch문에서 인터럽트시 실행할 작업을 작성한다      

join()      
join을 호출한 스레드가 종료될때까지 모든 스레드가 기다린다.     

concurrent 예제는
<a href="https://github.com/KKTRKKT/java8to11/blob/master/src/main/java/me/kktrkkt/java8to11/concurrent/App.java" target="_blank">이곳</a>
에서 확인할 수 있다.
