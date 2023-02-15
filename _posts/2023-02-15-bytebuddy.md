---
title: bytebuddy
category: java
---

런타임에 Java 클래스를 동적으로 생성하고 조작할 수 있는 Java 라이브러리다.<br>
ASM을 기반으로 만들어졌으며, 학습 비용이 높은 ASM에 비해 훨씬 사용하기 쉽다.
<!-- more -->
클래스, 메서드, 필드 등을 수정 또는 삭제할 수 있는 API를 제공한다.

성능 최적화 및 AOP(Aspect-Oriented Programming)에서 테스트 및 런타임 코드작성까지 다양하게 활용 가능하다.

오픈 소스 프로젝트로 무료다.

아래 예제를 통해 바이트 코드를 조작해 빈문자열을 반환하는 Moja.pullOut() 함수에서 Rabit을 꺼내보자

### 예제

#### Moja.java
```
public class Moja {

    public String pullOut() {
        return "";
    }
}
```

#### Masulsa.java
```
public class Masulsa {

    public static void main(String[] args) throws IOException {
        new ByteBuddy().redefine(Moja.class)
                .method(named("pullOut"))
                .intercept(FixedValue.value("!!Rabit"))
                .make().saveIn(new File("/Users/lsh/Documents/GitHub/java8to11/target/classes"));

        // 두번 실행시켜야 적용이 된다.
        // 첫번째는 기존의 Moja클래스를 미리 로드했기 공백이 나온다.
        // 두번째부터는 바이트코드가 조작된 결과가 나오게된다.
        System.out.println(new Moja().pullOut());
    }
}
```

2번 실행시켜야 Rabbit이 나오게 되는데, 

첫번째에서는 이미 클래스로더에서 원본 Moja 바이트코드를 읽어왔기 때문에 원본이 출력되고, 
조작된 Moja가 저장되게 된다.

두번째에서는 조작된 Moja를 클래스 로더에서 로드하므로 Rabbit이 나오게 된다.

아래 예제처럼 문자열을 바로 조작할 수도 있다

#### NewMasulsa.java
```
public class NewMasulsa {

    public static void main(String[] args) throws IOException {
        // 런타임에 클래스 구현을 변경하는 방법
        ClassLoader classLoader = NewMasulsa.class.getClassLoader();
        TypePool typePool = TypePool.Default.of(classLoader);
        new ByteBuddy().redefine(typePool.describe("me.kktrkkt.java8to11.bytebuddy.Moja").resolve()
                , ClassFileLocator.ForClassLoader.of(classLoader))
                .method(named("pullOut"))
                .intercept(FixedValue.value("!!Rabit"))
                .make().saveIn(new File("/Users/lsh/Documents/GitHub/java8to11/target/classes"));

        System.out.println(new Moja().pullOut());
    }
}
```

예제는 
<a href="https://github.com/KKTRKKT/java8to11/tree/master/src/main/java/me/kktrkkt/java8to11/bytebuddy" target="_blank">이곳</a>
에서 확인하실수 있습니다.
