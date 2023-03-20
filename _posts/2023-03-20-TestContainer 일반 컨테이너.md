---
title: TestContainer 일반 컨테이너
category: JUnit5
---

일반 컨테이너 API
GenericContainer

설정 함수
withExposedPorts, withEnv, waitingFor

<!-- more -->
```
@SpringBootTest
@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
@Testcontainers
@Slf4j
class GenericContainerTest {

    @Mock
    MemberService memberService;

    @Autowired
    StudyRepository studyRepository;

    @Container
    static final GenericContainer<?> postgreSQLContainer = new GenericContainer<>("postgres")
            // container 내부 포트를 설정한다. 외부포트는 항상 랜덤으로 설정이 불가하다
            .withExposedPorts(5432)
            // 환경 변수를 설정할 수 있다.
            .withEnv("POSTGRES_DB", "studytest")
            .withEnv("POSTGRES_HOST_AUTH_METHOD", "trust")
            // 특정 포트나 http, log message 등을 기다렸다가 실행 가능하다
            .waitingFor(Wait.forListeningPort());

    @BeforeEach
    void beforeEach() {
        System.out.println("=======================");
        // 내부 프토와 매핑된 외부 포트를 출력한다.
        System.out.println(postgreSQLContainer.getMappedPort(5432));
        // 컨테이너 로그를 출력한다
        System.out.println(postgreSQLContainer.getLogs());

        studyRepository.deleteAll();
    }

    @BeforeAll
    static void beforeAll() {
        Slf4jLogConsumer logConsumer = new Slf4jLogConsumer(log);
        postgreSQLContainer.followOutput(logConsumer);
    }

    @AfterAll
    static void afterAll() {
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
<a href="https://github.com/KKTRKKT/java8to11/blob/master/src/test/java/me/kktrkkt/java8to11/testcontainers/GenericContainerTest.java" target="_blank">이곳</a>
에서 확인하실수 있습니다.