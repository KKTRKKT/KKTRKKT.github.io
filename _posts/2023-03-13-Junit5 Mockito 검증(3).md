---
title: Junit5 Mockito 검증(3)
category: JUnit5
---

검증 API<br>
inOrder, verify<br>
times, never, atLeast, atMost, timeout

<!-- more -->

```
@ExtendWith(MockitoExtension.class)
public class VerifyTest {

    @Mock
    MemberService memberService;

    @Mock
    StudyRepository repository;

    StudyService studyService;

    Member member;

    Study springStudy;

    @BeforeEach
    void beforeEach(){
        studyService = new StudyService(memberService, repository);

        springStudy = new Study(10, "스프링 스터디");

        member = new Member();
        member.setId(1L);
        member.setEmail("kktrkkt@email.com");

        doReturn(Optional.of(member)).when(memberService).findById(1L);
    }

    @Test
    void verify_test(){
        Study study = studyService.createStudy(1L, springStudy);

        // notify가 호출되어야 한다
        verify(memberService).findById(1L);
        // notify를 1번 호출해야 한다
        verify(memberService, times(1)).findById(1L);
        // valid를 호출하지 말아야 한다
        verify(memberService, never()).valid();
        // notify를 적어도 0번 이상 호출해야한다.
        verify(memberService, atLeast(0)).notify(study);
        // notify는 최대 1번까지 호출할 수 있다.
        verify(memberService, atMost(1)).notify(study);
        // notify는 0.1초 내에 호출이 종료되어야 한다.
        verify(memberService, timeout(100)).notify(study);

    }

    @Test
    void inOrder_test(){
        Study study = studyService.createStudy(1L, springStudy);

        InOrder inOrder = inOrder(memberService);

        // findById를 호출하고 notify를 호출해야한다.
        inOrder.verify(memberService).findById(1L);
        inOrder.verify(memberService).notify(study);
        inOrder.verify(memberService).notify(Optional.of(member));

        // notify 후에는 호출되는 메서드가 없어야 한다.
        inOrder.verifyNoMoreInteractions();
    }
}
```

예제는 
<a href="https://github.com/KKTRKKT/java8to11/blob/master/src/test/java/me/kktrkkt/java8to11/mockito/DefaultAnnotaionTest.java" target="_blank">이곳</a>
에서 확인하실수 있습니다.