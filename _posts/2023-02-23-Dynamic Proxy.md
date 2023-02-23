---
title: Dynamic Proxy
category: java
---

런타임에 특정 인터페이스들을 구현하는 클래스 또는 인스턴스를 만드는 기술
<!-- more -->

### 생성 방법
public static Object newProxyInstance(ClassLoader loader, Class<?>[] interfaces, InvocationHandler handler)

loader : 프록시 클래스를 정의하기 위한 클래스 로더<br>
interfaces : 구현하고자 하는 인터페이스 목록<br>
handler : 실제로 프록시 객체에서 수행할 작업을 정의한 핸들러 객체<br>

예제
```
BookService bookService = (BookService) Proxy.newProxyInstance(BookService.class.getClassLoader(), new Class[]{BookService.class},
            new InvocationHandler() {
                BookService bookService = new BookServiceImpl();
                @Override
                public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                    // 특정 메소드만 적용하고 싶다면 조건문을 추가해야한다.
                    // rent 메소드만 앞뒤로 출력을 덧붙이도록 한다
                    if(!method.getName().equals("rent")) {
                        return method.invoke(bookService, args);
                    }
                    System.out.println("aaa");
                    Object invoke = method.invoke(bookService, args);
                    System.out.println("bbb");
                    return invoke;
                }
            });

    @Test
    public void rent() {
        Book book = new Book();
        book.setTitle("spring");
        bookService.rent(book);
        bookService.returnBook(book);
    }
```

단 인터페이스만 적용할 수 있다

예제는 
<a href="https://github.com/KKTRKKT/java8to11/blob/master/src/test/java/me/kktrkkt/java8to11/dynamicProxy/BookServiceTest.java" target="_blank">이곳</a>
에서 확인하실수 있습니다.
