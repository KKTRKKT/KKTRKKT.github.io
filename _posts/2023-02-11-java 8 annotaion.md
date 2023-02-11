---
title: java 8 annotaion
category: java
---

java 8 부터 annotaion을 타입 선언부에 선언이 가능하고, 중복해서 사용 가능해졌다.
<!-- more -->

### 타입 선언부
제네릭, 변수, 매개 변수, 예외...

### 타입에 사용하기 위한 Retention Scope

#### TYPE_PARAMETER
타입 변수에만 사용 가능가능하다.

#### TYPE_USE
모든 타입 선언부에 사용 가능하다.

### 예제

#### TypeParameter.java
```
@Retention(RetentionPolicy.RUNTIME)
// 제네릭 부분에만 사용할 수 있다.
@Target(ElementType.TYPE_PARAMETER)
public @interface TypeParameter {
}
```

#### TypeUse.java
```
@Retention(RetentionPolicy.RUNTIME)
// 타입을 사용하는 모든 곳에서 사용할 수 있다.
@Target(ElementType.TYPE_USE)
public @interface TypeUse {
}
```

#### App.java
```
@TypeUse
public class App {

    // void 타입에는 사용할 수 없다
//    @TypeUse
    public static void main(@TypeUse String[] args) {
        List<@TypeUse String> names = List.of("name");
    }

    @TypeUse
    static private class Chicken<@TypeUse @TypeParameter T> {

    }
}
```

### 중복 annotaion
중복 annotaion을 만들기 위해서는 annotaion에 @Repeatable 태그를 추가하고,
annotaion 배열을 담아둘 수 있는 annotaion container를 만들어 설정한다.

이때 anootaion container의 retention과 target의 범위는 @Repeatable 태그가 있는
annotaion보다 더 넓어야한다.

### 예제

#### Chicken.java
```
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE_USE)
@Repeatable(ChickenContainer.class)
public @interface Chicken {
    String value();
}
```

#### ChickentContainer.java
```
// retention과 target이 중복 애노테이션보다 scope가 더 커야된다.
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE_USE)
public @interface ChickenContainer {
    Chicken[] value();
}
```

#### App.java
```
@Chicken("양념")
@Chicken("마늘 간장")
public class App {
    public static void main(String[] args) {
        // 중복 애노테이션의 값을 가져온다.
        Chicken[] chickens = App.class.getAnnotationsByType(Chicken.class);
        Stream.of(chickens)
                .map(Chicken::value)
                .forEach(System.out::println);

        // 컨테이너 타입으로 가져오는 방법
        ChickenContainer chickenContainer = App.class.getAnnotation(ChickenContainer.class);
        Arrays.stream(chickenContainer.value())
                .map(Chicken::value)
                .forEach(System.out::println);
    }
}
```

예제는 
<a href="https://github.com/KKTRKKT/java8to11/tree/master/src/main/java/me/kktrkkt/java8to11/annotaion" target="_blank">이곳</a>
에서 확인하실수 있습니다.