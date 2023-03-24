---
title: ArchUnit 예제
category: JUnit5
---

패키지와 클래스에 규칙을 적용하는 예제

<!-- more -->

### ArchUnit에서 제공하는 아키텍처 테스트 애노테이션
@AnalyzeClasses, @ArchTest

### ArchUnit 메소드
classes(): 특정 패키지 또는 클래스를 대상으로 분석을 수행할 클래스를 선택합니다.<br>
that(): 특정 조건을 만족하는 클래스를 선택합니다.<br>
resideInAPackage(): 특정 패키지에 속한 클래스를 선택합니다.<br>
should(): 선택한 클래스가 만족해야 하는 조건을 지정합니다.<br>
onlyBeAccessed(): 선택한 클래스가 다른 클래스에서만 접근될 수 있도록 제한합니다.<br>
byClassesThat(): 선택한 클래스를 접근하는 클래스의 조건을 지정합니다.<br>
resideInAnyPackage(): 여러 패키지 중 하나에 속한 클래스를 선택합니다.<br>
slices(): 클래스들을 그룹으로 묶어 관리하고, 관리된 클래스 간의 의존성 관계를 검사할 수 있도록 지원합니다.<br>
matching(): 클래스 이름이나 패키지 이름과 같은 특정 조건을 만족하는 클래스를 선택합니다.<br>
beFreeOfCycles(): 선택한 클래스들 간의 순환 의존성을 제거하고, 사이클이 없도록 구성되었는지 검증합니다.<br>
noClasses(): 특정 패키지 또는 클래스에 클래스가 존재하지 않아야 함을 검증합니다.<br>
haveSimpleNameEndingWith(): 클래스 이름이 특정 문자열로 끝나는 클래스를 선택합니다.<br>
accessClassesThat(): 선택한 클래스들이 다른 클래스에 접근하는 경우, 이를 접근하는 클래스들의 조건을 지정합니다.<br>
orShould(): 여러 개의 조건 중 하나라도 만족해야 하는 조건을 지정합니다.<br>
and(): 여러 개의 조건을 모두 만족해야 하는 조건을 지정합니다.<br>
areNotEnums(): 선택한 클래스들 중 enum 클래스가 아닌 클래스를 선택합니다.<br>
areNotAnnotatedWith(): 선택한 클래스들 중 특정 애노테이션이 없는 클래스를 선택합니다.<br>
resideInAPackage(): 선택한 클래스들이 특정 패키지에 속한 클래스인지 검사합니다.<br>


### 패키지 규칙 적용 예제
```
// 아키텍처 테스트를 적용할 패키지 경로등의 옵션을 설정할 수 있다.
@AnalyzeClasses(packages = "me.kktrkkt.java8to11.junit5", importOptions = { ImportOption.DoNotIncludeTests.class })
public class Junit5PackageRuleTest {

    // domain 패키지는 study, member, domain에서 접근할 수 있다.
    @ArchTest
    ArchRule domainPackageRule = classes().that().resideInAPackage("..domain..")
            .should().onlyBeAccessed().byClassesThat()
            .resideInAnyPackage("..study..", "..member..", "..domain..");

    // member 패키지는 study, member에서 접근할 수 있다.
    @ArchTest
    ArchRule memberPackageRule = classes().that().resideInAPackage("..member..")
            .should().onlyBeAccessed().byClassesThat()
            .resideInAnyPackage("..study..", "..member..");

    // study 패키지는 오직 study에서만 접근 할 수 있다.
    @ArchTest
    ArchRule studyPackageRule = classes().that().resideInAPackage("..study..")
            .should().onlyBeAccessed().byClassesThat()
            .resideInAnyPackage("..study..");

    // junit5 패키지의 모든 클래스는 순환 참조가 없어야한다.
    @ArchTest
    ArchRule freeOfCycles = slices().matching("..junit5.(*)..")
            .should().beFreeOfCycles();
}
```

### 클래스 규칙 적용 예제
```
@AnalyzeClasses(packages = "me.kktrkkt.java8to11.junit5", importOptions = {ImportOption.DoNotIncludeTests.class})
public class Junit5ClassRuleTest {

    // Controller는 Service와 Repository에 접근할 수 있다.
    @ArchTest
    ArchRule controllerRule = classes().that().haveSimpleNameEndingWith("Controller")
            .should().accessClassesThat().haveSimpleNameEndingWith("Service")
            .orShould().accessClassesThat().haveSimpleNameEndingWith("Repository");

    // Service는 Controller에 접근하면 안된다.
    @ArchTest
    ArchRule serviceRule = noClasses().that().haveSimpleNameEndingWith("Service")
            .should().accessClassesThat().haveSimpleNameEndingWith("Controller");

    // Repository는 Service와 Controller에 접근해서는 안된다.
    @ArchTest
    ArchRule repositoryRule = noClasses().that().haveSimpleNameEndingWith("Repository")
            .should().accessClassesThat().haveSimpleNameEndingWith("Service")
            .orShould().accessClassesThat().haveSimpleNameEndingWith("Controller");

    // study 관련 클래스들은 study package 안에 있어야 한다, 단 enum과 entity는 제외
    @ArchTest
    ArchRule studyRule = classes().that().haveSimpleNameContaining("Study")
            .and().areNotEnums()
            .and().areNotAnnotatedWith(Entity.class)
            .should().resideInAPackage("..study..");

    // member 관련 클래스는 member package 안에 있어야한다, 단 entity는 제외
    @ArchTest
    ArchRule memberRule = classes().that().haveSimpleNameContaining("Member")
            .and().areNotAnnotatedWith(Entity.class)
            .should().resideInAPackage("..member..");

}
```

예제는 
<a href="https://github.com/KKTRKKT/java8to11/tree/master/src/test/java/me/kktrkkt/java8to11/archunit" target="_blank">이곳</a>
에서 확인하실수 있습니다.