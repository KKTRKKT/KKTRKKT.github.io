---
title: BigDecimal
category: java
---

BigDecimal 클래스는 자바에서 부동소수점 오류를 해결할 수 있는 방법중 하나이다.
<!-- more -->


사용법  
new BigDecimal("0.1") 이런식으로 스트링형을 통해 초기화 해주고, 아래 메소드등을 이용해 계산을 하면된다.

사칙연산은 메소드 이용  
\<BigDecimal\>.add(\<BigDecimal\>) 더하기    
\<BigDecimal\>.substract(\<BigDecimal\>) 빼기    
\<BigDecimal\>.multiply(\<BigDecimal\>) 곱하기   
\<BigDecimal\>.divide(\<BigDecimal\>) 나누기    
\<BigDecimal\>.remainder(\<BigDecimal\>) 나머지  

그외    
min(BigDecimal), max(BigDecimal), abs() 등등

주의 사항   
double형으로 초기화하지 않도록 한다. BigDecimal.valueOf(0.1) 식으로는 초기화 가능하다  
