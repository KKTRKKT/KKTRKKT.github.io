---
title: inner nested 클래스
category: java
---

 
<!-- more -->

static nested 클래스
```
class One{
    static class StaticNested{
        ...
    }
}

public void main(){
    One.StaticNested sn = new One.StaticNested();
    ...
}
```
외부 객체의 인스턴스 생성 필요 x

inner nested 클래스
```
class One{
    class InnerNested{
        ...
    }
}

public void main(){
    One.InnerNested in = new One().new Nested();
    ...
}
```
외부 객체의 인스턴스 생성 필요 o

local nested 클래스 
```
public void main(){
    class LocalNested{
        ...
    }
    LocalNested ln = new LocalNested();
    ...
}
```
메소드 안에서 생성 

annoymouse inner 클래스
```
class One{
    public String onePrint(){
        return "1";
    }
    ...
}

public void main(){
    One one = new One(){
        @Override
        public int onePrint(){
            return "one";
        }
    };
    ...
}
```
메소드안에서 구현되며 특정 메소드를 오버라이딩하는 형태로 사용함     