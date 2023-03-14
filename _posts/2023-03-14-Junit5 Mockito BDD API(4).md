---
title: Junit5 Mockito BDD API(4)
category: JUnit5
---

BDD API<br>
given, then

<!-- more -->

BDD(Behaviour Driven Develop)는 시나리오를 기반으로 테스트 케이스를 작성하며 함수 단위 테스트를 권장하지 않는다. 이 시나리오는 개발자가 아닌 사람이 봐도 이해할 수 있을 정도의 레벨을 권장한다. 하나의 시나리오는 Given, When, Then 구조를 가지는 것을 기본 패턴으로 권장하며 각 절의 의미는 다음과 같다.

Feature : 테스트에 대상의 기능/책임을 명시한다.

Scenario : 테스트 목적에 대한 상황을 설명한다.

Given : 시나리오 진행에 필요한 값을 설정한다.

When : 시나리오를 진행하는데 필요한 조건을 명시한다.

Then : 시나리오를 완료했을 때 보장해야 하는 결과를 명시한다.



```
@ExtendWith(MockitoExtension.class)
public class BDDAPITest {

    @Mock
    MemberService memberService;

    @Mock
    StudyRepository repository;

    StudyService studyService;

    Member member;

    @BeforeEach
    void beforeEach(){
        studyService = new StudyService(memberService, repository);

        member = new Member();
        member.setId(1L);
        member.setEmail("kktrkkt@email.com");
    }

    @Test
    void bdd_api_test(){
        Study springStudy = new Study(10, "스프링 스터디");

        // Given
        given(memberService.findById(1L)).willReturn(Optional.of(member));
        // When
        Study study = studyService.createStudy(1L, springStudy);
        // Then
        InOrder inOrder = inOrder(memberService);
        then(memberService).should(inOrder).findById(1L);
        then(memberService).should(inOrder).notify(study);
        then(memberService).should(inOrder).notify(Optional.of(member));
        then(memberService).shouldHaveNoMoreInteractions();
    }
}
```

예제는 
<a href="https://github.com/KKTRKKT/java8to11/blob/master/src/test/java/me/kktrkkt/java8to11/mockito/BDDAPITest.java" target="_blank">이곳</a>
에서 확인하실수 있습니다.