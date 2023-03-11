---
title: JUnit5 UseCase
category: JUnit5
---

기본적은 각 테스트는 독립적으로 실행되어 각 테스트간의 의존성이 없어야 하므로, JUnit의 기본 인스턴스 생성 단위는 메소드다.<br>
하지만, 시나리오 테스트 또는 유즈케이스등 테스트간의 의존성이 필요한 경우 인스턴스 생성 단위를 변경할 수 있다.

<!-- more -->

@TestInstance, @TestMethodOrder, @Order

```
// 테스트 인스턴스 생성 단위를 클래스로 변경한다. 기본은 메소드
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
// @Order에 적힌 숫자가 낮을수록 먼저 테스트를 진행한다.
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class TestOrderTest {
    int value = 0;

    @Order(3)
    @Test
    void third_test() {
        System.out.println(this);
        System.out.println(value++);
    }

    @Order(1)
    @Test
    void first_test() {
        System.out.println(this);
        System.out.println(value++);
    }

    @Order(2)
    @Test
    void second_test() {
        System.out.println(this);
        System.out.println(value++);
    }

}
```

예제는 
<a href="https://github.com/KKTRKKT/java8to11/blob/master/src/test/java/me/kktrkkt/java8to11/junit5/TestOrderTest.java" target="_blank">이곳</a>
에서 확인하실수 있습니다.