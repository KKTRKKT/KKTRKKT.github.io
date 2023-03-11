---
title: JUnit5 Extend
category: JUnit5
---

테스트 실행 또는 실행 전후에 추가적으로 실행할 로직을 추가할 수 있는 기능이다.<br>
@ExtendWith, @RegisterExtension

<!-- more -->

#### FindSlowTestExtension.java
```
public class FindSlowTestExtension implements BeforeEachCallback, AfterEachCallback {

    private final long threshold;

    private final String START_TIME = "START_TIME";

    public FindSlowTestExtension(long threshold) {
        this.threshold = threshold;
    }

    // 각각의 테스트 실행전에 작업할 내용을 명시한다
    @Override
    public void beforeEach(ExtensionContext context) throws Exception {
        ExtensionContext.Store store = getStore(context);
        store.put(START_TIME, System.currentTimeMillis());
    }

    private ExtensionContext.Store getStore(ExtensionContext context) {
        String className = context.getClass().getName();
        String methodName = context.getRequiredTestMethod().getName();
        // 클래스명과 메소드명으로 store 조회해서, store가 있으면 반환하고 없으면 생성해서 반환한다.
        return context.getStore(ExtensionContext.Namespace.create(className, methodName));
    }

    // 각각의 테스트 실행후에 작업할 내용을 명시한다
    @Override
    public void afterEach(ExtensionContext context) throws Exception {
        Method method = context.getRequiredTestMethod();
        SlowTest annotation = method.getAnnotation(SlowTest.class);
        String name = method.getName();

        ExtensionContext.Store store = getStore(context);
        long startTime = (long) store.get(START_TIME);
        long duration = System.currentTimeMillis() - startTime;

        if(duration > threshold && annotation == null){
            System.out.printf("Please Consider mark method [%s] with @SlowTest\n", name);
        }
    }
}
```

#### ExtendTest.java
```
// 확장 모델을 선언적으로 추가하는 방식
//@ExtendWith(FindSlowTestExtension.class)
class ExtendTest {

    // 확장 모델을 프로그래밍적으로 추가하는 방식
    @RegisterExtension
    static FindSlowTestExtension extension = new FindSlowTestExtension(3000L);

    @SlowTest
    void slow_test() throws InterruptedException {
        Thread.sleep(1005L);
        Study study = new Study(10);
        assertNotNull(study);
    }

    @Test
    void test() throws InterruptedException {
        Thread.sleep(1005L);
        Study study = new Study(10);
        assertNotNull(study);
    }
}
```

예제는 
<a href="https://github.com/KKTRKKT/java8to11/blob/master/src/test/java/me/kktrkkt/java8to11/junit5/ExtendTest.java" target="_blank">이곳</a>
에서 확인하실수 있습니다.