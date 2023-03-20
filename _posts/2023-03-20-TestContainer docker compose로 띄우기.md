---
title: TestContainer docker compose로 띄우기
category: JUnit5
---

DockerComposeContainer 등록 애노테이션
@ClassRule

설정 함수
withExposedService

<!-- more -->
```
@SpringBootTest
@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
@Testcontainers
class DockerComposeContainerTest {

    @Mock
    MemberService memberService;

    @Autowired
    StudyRepository studyRepository;

    // dockerComposeContainer는 classRule을 사용한다
    @ClassRule
    static final DockerComposeContainer<?> environment =
            new DockerComposeContainer<>(new File("src/test/resources/docker-compose.yml"))
                    // 내부포트는 5432, 포트가 연결되고 10초를 기다린다.
                    .withExposedService("study-db", 5432,
                            Wait.forListeningPort().withStartupTimeout(Duration.ofSeconds(10)));

    @BeforeEach
    void beforeEach() {
        studyRepository.deleteAll();
    }

    @BeforeAll
    static void beforeAll() {
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
<a href="https://github.com/KKTRKKT/java8to11/blob/master/src/test/java/me/kktrkkt/java8to11/testcontainers/DockerComposeContainerTest.java" target="_blank">이곳</a>
에서 확인하실수 있습니다.