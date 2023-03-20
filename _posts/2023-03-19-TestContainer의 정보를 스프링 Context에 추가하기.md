---
title: TestContainer의 정보를 스프링 Context에 추가하기
category: JUnit5
---

Context 설정 애노테이션 <br>
@ContextConfiguration

Context 설정 API<br>
org.springframework.context.ApplicationContextInitializer


<!-- more -->
```
@SpringBootTest
@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
@Testcontainers
// 스프링 테스트 컨테이너가 사용할 설정 파일 또는 컨텍스트를 설정할 수 있다.
@ContextConfiguration(initializers = ContextConfigurationTest.ContainerPropertyInitializer.class)
class ContextConfigurationTest {

    @Mock
    MemberService memberService;

    @Autowired
    StudyRepository studyRepository;


    @Autowired
    // 프로퍼티와 프로파일을 담당하는 객체다
    Environment environment;

    // @Value를 사용하면 조회와 동시에 캐스팅이 가능하다.
    @Value("${container.port}")
    int port;

    @Container
    static final GenericContainer<?> postgreSQLContainer = new GenericContainer<>("postgres")
            .withEnv("POSTGRES_DB", "studytest");

    @BeforeEach
    void beforeEach() {
        System.out.println("=======================");
//        System.out.println(environment.getProperty("container.port"));
        System.out.println(port);

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

    // 스프링 ApplicationContext를 동적으로 초기화 할때 사용하는 인터페이스
    static class ContainerPropertyInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

        // 특정 프로퍼티를 활성화하거나, 프로퍼티 소스를 추가할 수 있다.
        @Override
        public void initialize(ConfigurableApplicationContext context) {
            // TestPropertyValues는 프로퍼티 소스를 정의할 때 사용한다.
            TestPropertyValues.of("container.port=" + postgreSQLContainer.getMappedPort(5432))
                    .applyTo(context.getEnvironment());
        }
    }

}
```

예제는 
<a href="https://github.com/KKTRKKT/java8to11/blob/master/src/test/java/me/kktrkkt/java8to11/testcontainers/ContextConfigurationTest.java" target="_blank">이곳</a>
에서 확인하실수 있습니다.