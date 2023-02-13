---
title: Code Coverage
category: java
---

테스트코드 실행시 소스코드가 얼마나 실행되는지 백분율로 나타내는 지표다.<br>
테스트되지 않은 영역을 식별하는데 유용하며, 코드 유지 관리할때 도움을 준다.
<!-- more -->

자바에서 Code Coverage를 측정하려면 Jacoco를 이용해 쉽게 측정할 수 있다.

Maven에 아래의 코드를 추가한다.
```
<build>
  <plugins>
     <plugin>
            <groupId>org.jacoco</groupId>
            <artifactId>jacoco-maven-plugin</artifactId>
            <version>0.8.4</version>
            <executions>
                <execution>
                    <goals>
                        <goal>prepare-agent</goal>
                    </goals>
                </execution>
                <execution>
                    <id>report</id>
                    <phase>prepare-package</phase>
                    <goals>
                        <goal>report</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

### 확인 방법
터미널에서 mvn verify를 입력하고,
target/site/jacoco/index.html에서 확인할 수 있다.

### 간단 동작 원리
먼저 코드의 바이트코드를 읽는다.
코드 커버리지를 적용할 부분을 카운트한다. 
이후에 테스트에서 커버리지 부분을 체크해서 보여준다.
