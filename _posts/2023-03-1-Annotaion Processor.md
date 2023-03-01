---
title: Annotaion Processor
category: java
---

lombok또는 @Override 등에서 사용하고 있는 애노테이션 프로세서는,<br>
소스 코드에 메타데이터를 추가하는 기능을 제공한다. 메타데이터는 코드에 대한 추가 정보를 제공하며, 소스 코드를 자동으로 생성하거나 다른 코드와 상호작용할 때 유용하다.
<!-- more -->

### 사용 이유
1.코드의 가독성을 높일 수 있다.<br>
코드의 의도나 목적이 명확해져, 코드 이해가 쉬워진다.

2.유지보수하기 쉽게 작성할 수 있다.<br>
반복적인 작업 자동화. 

3.코드의 안정성을 높일 수 있다.<br>
코드에 대한 추가 검사 및, 런타임 오류 방지 가능

### 예제 Magic-Moja

<a href="https://github.com/KKTRKKT/magic-moja" target="_blank">MagicMoja Processor</a><br>
<a href="https://github.com/KKTRKKT/java8to11/tree/master/src/main/java/me/kktrkkt/java8to11/processor" target="_blank">Moja App</a>

1.MagicMoja Processor를 mvn clean install을 통해 빌드시킨다.

2.MojaApp에서 (인텔리제이 기준) Preferences -> Build, Execution, Deployment -> Compiler -> Annotaion Processor에서 Enabled annotaion processing을 체크한다.

3.MojaApp에서 (인텔리제이 기준) Project Structure -> Modules 에서 Sources 탭 아래 target -> generated-sources -> annotaions를 누르고, Mark as: 옆에 있는 Sources 버튼을 눌러 소스를 추가한다.

4.MojaApp에서 mvn clean complie 명령을 실행하고 바이트 코드의 결과를 확인한다.
