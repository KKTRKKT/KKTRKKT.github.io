---
title: JUnit5 CustomTag
category: JUnit5
---

Junit 테스트 애노테이션은 조합해서 커스텀 태그로 만들 수 있다.

<!-- more -->

#### FastTest.java
```
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Tag("fast")
@Test
public @interface FastTest {
}
```

#### SlowTest.java
```
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Tag("slow")
@Test
public @interface SlowTest {
}
```

#### CustomTagTest.java
```
class CustomTagTest {

    // 커스텀 태그로 여러 애노테이션을 조합할 수 있다.
    @FastTest
    void fast_tag() {
        Study study = new Study(10);
        assertNotNull(study);
    }

    @SlowTest
    void slow_tag() {
        Study study = new Study(10);
        assertNotNull(study);
    }
}
```

예제는 
<a href="https://github.com/KKTRKKT/java8to11/blob/master/src/test/java/me/kktrkkt/java8to11/junit5/CustomTagTest.java" target="_blank">이곳</a>
에서 확인하실수 있습니다.