---
title: Junit5 Mockito 생성(1)
category: JUnit5
---

Mock을 생성하는 API<br>
MockitoExtension, @Mock, mock

<!-- more -->

```
// mockito 확장 모델 선언
@ExtendWith(MockitoExtension.class)
public class DefaultAnnotaionTest {

    // 필드 선언 방식
    @Mock
    MemberService memberService;

    @Test
    // 매개변수 선언 방식
    void mock_test(@Mock StudyRepository repository){
        // 메소드 내에서 선언 방식
        StudyRepository mock = mock(StudyRepository.class);

        // 선언된 mock들의 메소드들은 모두 아무것도 없는 백지 상태라고 보면된다.
        // 메소드들은 빈값을 리턴하며, void는 아무일도 하지 않는다.
        assertNotNull(memberService);
        assertNotNull(repository);
        assertNotNull(mock);
    }
}
```

예제는 
<a href="https://github.com/KKTRKKT/java8to11/blob/master/src/test/java/me/kktrkkt/java8to11/mockito/DefaultAnnotaionTest.java" target="_blank">이곳</a>
에서 확인하실수 있습니다.