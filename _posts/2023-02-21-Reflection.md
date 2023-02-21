---
title: Reflection
category: java
---

Reflection이란 "Class"에서 사용하는 API 명칭으로,  Java 프로그램에서 클래스, 메서드, 필드 등의 객체를 동적으로 검사하고 조작하는 데 사용되는 기능이다.
<!-- more -->

> "Class"는 실행중인 자바 애플리케이션에서 "클래스" 또는 "인터페이스"를 나타낸다.

따라서 "Class"는 Reflection을 사용하여 실행 중인 Java 애플리케이션에서 클래스와 인터페이스의 정보를 확인하고 이를 조작할 수 있다.

예를 들어, "Class"의 getClass()  클래스 정보를 가져오거나, newInstance() 메서드를 사용하여 새로운 인스턴스를 생성할 수 있고,<br>
getMethods() 메서드를 사용하여 클래스가 가지고 있는 메서드 정보를 가져올 수 있다.

아래는 "Class" API 사용 예제다.

### class 가져오기

```
// 클래스 로딩이 끝나면 클래스 타입의 인스턴스를 만들어서 힙에 저장됨
// 타입에서 가져오는 방법
Class<Book> bookClass = Book.class;

// 인스턴스에서 가져오는 방법
Book book = new Book();
Class<? extends Book> aClass = book.getClass();

// FQCN(Full Qualified Class Name)으로 찾는 방법
Class<?> forName = Class.forName("me.kktrkkt.java8to11.reflection.Book");
```

### getFields()
```
// public한 변수들만 가져온다.
Arrays.stream(bookClass.getFields()).forEach(System.out::println);
```

### getDeclaredFields()
```
// 접근지시자 제한없이 모든 변수들을 가져온다.
Arrays.stream(bookClass.getDeclaredFields()).forEach(System.out::println);

```

### 필드 값 가져오기
```
Arrays.stream(bookClass.getDeclaredFields()).forEach(f->{
    try {
        // 모든 변수의 접근을 허용해준다. private한 변수를 접근할 때 꼭 true로 설정해야한다.
        f.setAccessible(true);
        System.out.printf("%s, %s\n", f, f.get(book));
    } catch (IllegalAccessException e) {
        e.printStackTrace();
    }
});
```

### getMethod
```
// 상위에 메소드들까지 모두 가져온다.
Arrays.stream(bookClass.getMethods()).forEach(System.out::println);
```

### getConstructors
```
// 생성자를 가져온다.
Arrays.stream(bookClass.getConstructors()).forEach(System.out::println);
```

### getSuperclass
```
// 상속받은 수퍼 클래스를 가져온다.
Class<? super MyBook> superclass = MyBook.class.getSuperclass();
System.out.println(superclass);
```

### getInterfaces
```
// 구현한 인터페이스를 모두 가져온다.
Arrays.stream(MyBook.class.getInterfaces()).forEach(System.out::println);
```

### getModifiers
```
// 변수의 접근제한자를 구분할 수 있다.
Arrays.stream(Book.class.getDeclaredFields())
        .filter(f->Modifier.isPrivate(f.getModifiers()))
        .forEach(System.out::println);
```

### getParameterTypes
```
// 메소드의매개변수를 가져올 수 있다.
Arrays.stream(Book.class.getConstructors()).forEach(f->{
    Class<?>[] parameterTypes = f.getParameterTypes();
    System.out.println(f);
    Arrays.stream(parameterTypes).forEach(System.out::println);
});
```

### getReturnType
```
// 리턴 타입을 가져올 수 있다.
Arrays.stream(Book.class.getDeclaredMethods()).forEach(f->{
    Class<?> returnType = f.getReturnType();
    System.out.println(f);
    System.out.println(returnType);
});
```

### getAnnotations
```
// 기본적으로 annotation은 주석과 같은 취급을 받는다.
// 따라서 바이트 코드 로딩 후에 메모리 영역에 남아있지 않는다.
// 런타임에 애노테이션 정보를 읽어오기 위해서는 @Retention(RetentionPolicy.RUNTIME)을 추가해줘야한다.
Arrays.stream(Book.class.getAnnotations()).forEach(System.out::println);
```

### getDeclearedAnnotaion
```
// 상속받은 애노테이션을 제외하고 출력할 때 사용한다.
Arrays.stream(MyBook.class.getDeclaredAnnotations()).forEach(System.out::println);
```

### 필드의 모든 annotaion값 가져오기
```
// 모든 필드의 모든 annotaion 값을 출력하는 방법
Arrays.stream(Book.class.getDeclaredFields()).forEach(f->{
    Arrays.stream(f.getAnnotations()).forEach(System.out::println);
});

// 특정 애노테이션의 값만 출력하는 방법
Arrays.stream(Book.class.getDeclaredFields()).forEach(f->{
    Arrays.stream(f.getAnnotations()).forEach(a ->{
        if(a instanceof MyAnnotation){
            MyAnnotation myAnnotation = (MyAnnotation) a;
            System.out.println(myAnnotation.value());
            System.out.println(myAnnotation.name());
            System.out.println(myAnnotation.number());
        }
    });
});
```

### newInstance
```
// class의 newInstance는 Deprecated되었으므로, 생성자를 이용해 인스턴스를 생성한다.
Constructor<Book> constructor = Book.class.getConstructor();
Book book = constructor.newInstance();
System.out.println(book);
```

### get, set
```
// static 필드 값 변경하기
Field b = Book.class.getDeclaredField("b");
b.setAccessible(true);
// 특정 인스턴스의 값을 가져오기 위해서는 get에 매개변수로 인스턴스를 전달해야한다.
// static인 경우에는 null을 전달한다.
System.out.println(b.get(null));
b.set(null, "BOOK");
System.out.println(b.get(null));

// 인스턴스의 필드 값 변경하기
Field d = Book.class.getDeclaredField("d");
System.out.println(d.get(book));
b.set(book, "d");
System.out.println(b.get(book));
```

### invoke
```
// 메소드를 실행시킨다.
Method sum = Book.class.getDeclaredMethod("sum", String.class, String.class);
String invoke = (String) sum.invoke(book, "hello", "world");
System.out.println(invoke);
```

### 리플렉션 사용시 주의사항

* 런타임에 클래스 정보를 조작하기 때문에 런타임 에러를 발생시킬 수 있다.<br>
* 일반적인 객체 접근 방식보다 성능이 많이 떨어지므로, 과도한 사용은 성능 이슈를 일으킬 수 있다.<br>
* 코드 복잡성이 증가한다.

### 리플렉션 유틸 라이브러리
reflections

예제는 
<a href="https://github.com/KKTRKKT/java8to11/blob/master/src/main/java/me/kktrkkt/java8to11/reflection/App.java" target="_blank">이곳</a>
에서 확인하실수 있습니다.
