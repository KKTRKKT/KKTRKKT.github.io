---
title: JUnit5 RepeatedTest
category: JUnit5
---

@RepeatedTest

<!-- more -->

```
class RepeatTest {

    // 반복형 테스트, value에 몇번 반복할지, name에 테스트명을 설정할 수 있다.
    @RepeatedTest(value = 10, name = "{displayName}({currentRepetition} / {totalRepetitions})")
    void repeated_test(RepetitionInfo info) {
        System.out.println(info.getCurrentRepetition() + "/" + info.getTotalRepetitions());
    }
}
```

예제는 
<a href="https://github.com/KKTRKKT/java8to11/blob/master/src/test/java/me/kktrkkt/java8to11/junit5/RepeatTest.java" target="_blank">이곳</a>
에서 확인하실수 있습니다.