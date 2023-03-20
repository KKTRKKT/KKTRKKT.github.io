---
title: TestContainer 기본 애노테이션
category: JUnit5
---

TestContainer를 등록하기 위한 기본 애노테이션
@Testcontainers, @Container

<!-- more -->
```
@SpringBootTest
@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
//@Testcontainers는 @Container를 사용하기 위해서 선언한다
@Testcontainers
class TestContainerTest {

    @Mock
    MemberService memberService;

    @Autowired
    StudyRepository studyRepository;

    // @Container를 붙이면 BeforeAll과 AfterALL에서 container를 시작하고 종료하는 작업을 대신해준다.
    @Container
    // static을 붙이지 않으면 테스트마다 도커를 새로 만든다.
    static PostgreSQLContainer postgreSQLContainer = new PostgreSQLContainer("postgres")
            .withDatabaseName("studytest");


    @BeforeEach
    void beforeEach() {
        studyRepository.deleteAll();
    }

    @BeforeAll
    static void beforeAll() {
//        postgreSQLContainer.start();
//        System.out.println(postgreSQLContainer.getJdbcUrl());
    }

    @AfterAll
    static void afterAll() {
//        postgreSQLContainer.stop();
    }

    @Test
    void createStudy() {
        Member member = new Member();
        member.setId(1L);
        member.setEmail("kktrkkt@email.com");

        StudyService studyService = new StudyService(memberService, studyRepository);
        Study study = new Study(10, "테스트");

        when(memberService.findById(1L)).thenReturn(Optional.of(member));

        studyService.createStudy(1L, study);
        assertEquals(member.getId(), study.getOwnerId());
    }

    @DisplayName("다른 사용자가 볼 수 있도록 스터디를 공개한다.")
    @Test
    void openStudy() {
        // Given
        StudyService studyService = new StudyService(memberService, studyRepository);
        Study study = new Study(10, "더 자바, 테스트");

        // When
        Study openStudy = studyService.openStudy(study);

        // Then
        assertEquals(StudyStatus.OPENED, openStudy.getStatus());
        assertNotNull(openStudy.getOpenedDateTime());
        then(memberService).should().notify(study);
    }

}
```

예제는 
<a href="https://github.com/KKTRKKT/java8to11/blob/master/src/test/java/me/kktrkkt/java8to11/testcontainers/TestContainerTest.java" target="_blank">이곳</a>
에서 확인하실수 있습니다.