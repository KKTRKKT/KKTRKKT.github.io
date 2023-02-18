---
title: JavaAgent
category: java
---

JVM에서 프로그램이 실행되는 동안 클래스 파일을 수정하거나, 프로그램의 동작을 모니터링하거나, 디버깅하는 등의 작업을 할 수 있게 해주는 기능이다.

이걸 사용하면, 프로그램이 동작할 때 다양한 작업을 수행하도록 할 수 있다.
예를 들면, 프로그램 실행 시간을 측정하거나, 메모리 사용량을 모니터링하거나, 로그를 기록하는 등의 작업을 할 수 있다.

javaAgent를 사용하기 위해서는 프로그램을 실행할 때 JVM에 다음과 같은 옵션을 추가해야한다.

```
-javaagent:path/to/agent.jar
```
여기서 path/to/agent.jar는 javaagent가 들어 있는 jar 파일의 경로를 지정해주면된다.

이렇게 javaagent를 실행하면, agent.jar 파일 안에 있는 premain 메소드가 호출되어, 프로그램이 실행되기 전에 작업을 할 수 있다.

작동 프로그램 예제
```
public class MasulsaAgent {

    public static void premain(String agentArgs, Instrumentation inst) {
        new AgentBuilder.Default()
                .type(ElementMatchers.any())
                .transform((builder, typeDescription, classLoader, javaModule) ->
                        builder.method(named("pullOut")).intercept(FixedValue.value("!!Rabbit")))
                .installOn(inst);
    }
}
```

위 예제는 ByteBuddy 라이브러리를 사용하여 클래스 파일을 조작하는 javaagent 예제다.

premain 메소드에서는 AgentBuilder를 생성하고, installOn 메소드를 호출하여 bytebuddy를 사용해 프로그램을 조작할 수 있도록 설정한다.

여기서는 type을 any()로 설정하여, 어떤 클래스든지 대상으로 바이트코드 조작이 가능하도록 하고 있고, transform 메소드에서는 클래스의 pullOut 메소드를 찾아서, 이 메소드가 호출될 때 "!!Rabbit" 문자열을 반환하게된다.

즉, pullOut 메소드를 호출하면, "!!Rabbit" 문자열이 반환하게된다.

이렇게 javaagent를 사용하면, 프로그램의 동작을 다양한 방식으로 모니터링하거나, 디버깅하거나, 클래스 파일을 수정하는 등의 작업을 수행할 수 있다.

<!-- more -->

예제는 
<a href="https://github.com/KKTRKKT/MasulsaAgent" target="_blank">이곳</a>
에서 확인하실수 있습니다.
