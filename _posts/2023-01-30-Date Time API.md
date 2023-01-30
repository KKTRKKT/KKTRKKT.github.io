---
title: Date Time API
category: java
---

Java 8에 추가된 시간관련 API로 Clear, Fluent, Immutable, Extensible을 지향한다.

<!-- more -->
자바 8의 새로운 날짜와 시간 API가 생긴 이유     
https://codeblog.jonskeet.uk/2017/04/23/all-about-java-util-date/       

joda time으로 교체      
자바 8의 date-time api      
JSR-310 스펙의 구현체를 제공한다        

디자인 철학             
Clear           
정의와 행동이 명확해진다. (date에서 time을 꺼내는 일 등이 사라짐)       
Fluent      
로직 이해가 쉬워진다. (메소드 매개변수와 리턴값에서 null이 사라지고, 체인해서 표현할 수 있다)       
Immutable               
불변객체가 된다 (값을 변경하면 새로운 객체 반환)        
Extensible              
확장이 쉬워진다 (커스텀한 달력 생성 가능)            

Instant     
machine time용으로 기준시(UTC)를 기준으로 시간이 생성되며, 유닉스 타임으로 표현할 수 있다.

생성            
Instant now()           
현재의 machine time을 생성한다          

Instant ofEpochSecond(long epochSeconds)        
Instant ofEpochMili(long epochMilli)            
해당 epoch time의 machine time을 생성한다       

연산            
Instant plus(long amountToAdd, TemporalUnit unit)               
Instant minus(long amountToAdd, TemporalUnit unit)      
인스턴스 객체의 시간을 unit 단위로 amountToAdd 만큼 더하거나 뺄 수 있다             

long until(Temporal endExclusive, TemporalUnit unit)                
unit 단위로 endExclusive -  인스턴스 시간의 결과값을 구한다             

LocalDateTime           
human time용으로 로컬 기준 초단위까지 시간을 표현한다.

생성            
LocalDateTime now()             
현재의 로컬기준 human time을 구한다                

LocalDateTime of(int year, Month month, int dayOfMonth, int hour, int minute, int second)       
로컬기준 매개변수에 따른 human time을 구한다        
        
ZonedDateTime atZone(ZoneId zone)       
해당 인스턴스에 zone의 기준시를 구한다.     

연산        
LocalDateTime plus(long amountToAdd, TemporalUnit unit)     
LocalDateTime minus(long amountToSubtract, TemporalUnit unit)       
unit 단위로 amountToAdd만큼 인스턴스의 시간에 더하거나 뺀 값을 반환한다.    

long until(Temporal endExclusive, TemporalUnit unit)        
unit단위로 endExclusive-인스턴스 시간의 결과값을 리턴한다.      

변환        
LocalDateTime ofInstant(Instant instant, ZoneId zone)           
machine time을 human time으로 전환한다          

Instant toInstant(ZoneOffset offset)        
human time을 machine time으로 전환한다      

ZonedDateTime       
human time용으로 특정 지역의 초 단위까지 시간을 표현하는데 사용한다.

생성        
ZonedDateTime now(ZoneId zone)      
원하는 지역의 human time을 구한다.  

ZonedDateTime now()     
로컬 human time을 구한다.       

ZonedDateTime (int year, int month, int dayOfMonth, int hour, int minute, int second, int nanoOfSecond, ZoneId zone)            
매개변수에 따른 지역의 시간을 구한다.       

연산        
ZonedDateTime plus(long amountToAdd, TemporalUnit unit)     
ZonedDateTime minus(long amountToAdd, TemporalUnit unit)        
unit 단위로 amountToAdd만큼 인스턴스의 시간에 더하거나 뺀 값을 반환한다.        

long until(Temporal endExclusive, TemporalUnit unit)              
unit단위로 endExclusive-인스턴스 시간의 결과값을 리턴한다.          

변환        
ZonedDateTime of(LocalDateTime localDateTime, ZoneId zone)      
LocaldateTime을 ZonedDateTime으로 변환한다.     

ZonedDateTime ofInstant(Instant instant, ZoneId zone)   
machine time을 해당 zone의 human time으로 변환한다.         

Instant toInstant()     
machine time으로 변환한다.      

Period      
human time을 비교하거나 기간을 표현할때 사용한다            

생성Period of(int years, int months, int days)      
해당 매개변수의 기간을 생성한다.        

Period between(LocalDate startDateInclusive, LocalDate endDateExclusive)        
endDateExclusive - startDateInclusive 한 기간만큼 Period를 생성한다.        

Duration        
machine time을 비교하거나 기간을 표현할때 사용한다.     

Duration of(long amount, TemporalUnit unit)     
unit단위만큼 기간을 생성한다.       

Duration between(Temporal startInclusive, Temporal endExclusive)        
endDateExclusive - startDateInclusive 한 기간만큼 Duration를 생성한다.      

DateTimeFormatter       
시간을 원하는 포멧으로 지정해서 나타내고 싶을 때 사용한다.

생성        
DateTimeFormatter.ofPattern("yy/MM/dd");        

사용        
String format(DateTimeFormatter formatter)          
time api의 format 함수의 매개변수로 전달하면, 해당 포멧으로 시간을 반환한다     

parse(CharSequence text, DateTimeFormatter formatter)       
formatter와 형식이 같은 시간 text를 넣으면 파싱해서 반환한다.       

레거시 api 지원     

Date        
Instant toInstant()     
Date from(Instant instant)      
Date와 Instant는 상호 변환 가능하다.        

GregorianCalendar       
ZonedDateTime toZonedDateTime()     
GregorianCalendar from(ZonedDateTime zdt)           
GregorianCalendar와 ZonedDateTime는 상호 변환 가능하다.     

TimeZone        
ZoneId toZoneId()       
TimeZone getTimeZone(ZoneId zoneId) 
TimeZone와 ZoneId는 상호 변환이 가능하다.     
 
date/time api 예제는
<a href="https://github.com/KKTRKKT/java8to11/blob/master/src/main/java/me/kktrkkt/java8to11/datetime/App.java" target="_blank">이곳</a>
에서 확인할 수 있다.