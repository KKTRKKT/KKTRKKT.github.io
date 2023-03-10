---
title: JUnit5 Condition Annotaion
category: JUnit5
---

@EnabledOnOs, @DisabledOnOs, @EnabledOnJre, @EnabledIfEnvironmentVariable

<!-- more -->

```
class ConditionTest {

    @Test
    // 조건에 맞는 OS만 테스트를 실행한다.
    @EnabledOnOs({OS.MAC, OS.LINUX})
    void enabled_on_os() {
        Study study = new Study(10);
        assertNotNull(study);
    }

    @Test
    // 조건에 맞는 OS는 테스트에서 제외한다.
    @DisabledOnOs({OS.MAC, OS.LINUX})
    void disabled_on_os() {
        Study study = new Study(10);
        assertNotNull(study);
    }

    @Test
    // 다음 JRE 버전만 실행한다.
    @EnabledOnJre(JRE.JAVA_11)
    void enabled_on_jre() {
        Study study = new Study(10);
        assertNotNull(study);
    }

    @Test
    // 환경변수가 matches와 일치하면 테스트를 실행한다.
    @EnabledIfEnvironmentVariable(named = "TEST_ENV", matches = "LOCAL")
    void enabled_if_environment_variable_local() {
        Study study = new Study(10);
        assertNotNull(study);
    }

    @Test
    @EnabledIfEnvironmentVariable(named = "TEST_ENV", matches = "kktrkkt")
    void enabled_if_environment_variable_kktrkkt() {
        Study study = new Study(10);
        assertNotNull(study);
    }
}
```

예제는 
<a href="https://github.com/KKTRKKT/java8to11/blob/master/src/test/java/me/kktrkkt/java8to11/junit5/ConditionTest.java" target="_blank">이곳</a>
에서 확인하실수 있습니다.