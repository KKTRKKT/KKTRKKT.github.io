---
title: JUnit5 Assumption API
category: JUnit5
---

assumeTrue, assumingThat

<!-- more -->

```
class AssumptionTest {

    @Test
    void assume_true() {
        String test_env = System.getenv("TEST_ENV");
        System.out.println(test_env);
        // test_env가 "LOCAL"일 경우에만 다음 테스트가 진행된다
        assumeTrue("LOCAL".equalsIgnoreCase(test_env));

        Study study = new Study(10);
        assertNotNull(study);
    }

    @Test
    void assuming_that() {
        String test_env = System.getenv("TEST_ENV");
        System.out.println(test_env);

        // 조건이 true면 다음 로직을 실행한다.
        assumingThat("LOCAL".equalsIgnoreCase(test_env), ()->{
            System.out.println("local");
            Study study = new Study(10);
            assertNotNull(study);
        });

        assumingThat("kktrkkt".equalsIgnoreCase(test_env), ()->{
            System.out.println("kktrkkt");
            Study study = new Study(10);
            assertNotNull(study);
        });
    }
}
```

예제는 
<a href="https://github.com/KKTRKKT/java8to11/blob/master/src/test/java/me/kktrkkt/java8to11/junit5/AssumptionTest.java" target="_blank">이곳</a>
에서 확인하실수 있습니다.