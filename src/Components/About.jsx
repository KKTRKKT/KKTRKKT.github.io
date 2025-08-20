/**
 * About component
 *
 * Space for you to describe more about yourself.
 */

import React from "react";

/**
 * About background image
 *
 * Below is a sample image. Upload the image of your choice into the "images"
 * directory and import here for use. Then, set imageAltText to string that 
 * represents what you see in that image.
 *
 * Need an image? Check out https://unsplash.com to download a image you
 * freely use on your site.
 */
import image from "../images/motion-background.jpg";

const imageAltText = "purple and blue abstract background";

/**
 * Sort description that expands on your title on the Home component.
 */
const description =
  "데이터 중심의 문제 해결에 강점을 가진 풀스택 개발자입니다.  \n" +
  "대규모 데이터 처리와 품질 관리 전산화 등 다양한 산업 분야에서 안정적이고 확장성 있는 솔루션을 구축한 경험이 있습니다.  "

/**
 * List of some of skills or technologies you work on, are learning,
 * passionate about, or enjoy,
 */
const skillsList = [
  "Backend: Java(Spring Boot, JPA, Security), MyBatis, Querydsl, Hasim Framework",
  "Frontend: Vue.js, React(Next.js), Thymeleaf, WebSquare, HTML5, CSS, Bootstrap",
  "Database: PostgreSQL, MariaDB, Oracle, Redis",
  "Infra / DevOps: Docker, Nginx, Prometheus, Grafana",
  "Data / AI: iRODS, Solr, OpenAPI, 데이터 분석 및 통계 자동화",
  "ERP / RPA: SAP 연동, 전사 자원관리, 자동화 시스템 구축",
  "Collaboration & Tools: Maven, npm, Git, Jenkins, Eclipse, IntelliJ",
];

/**
 * Use this to give more information about what you are passionate about,
 * how you best work, or even a quote. This will help someone learn more
 * about you on a professional level.
 */
const detailOrQuote =
  "저는 복잡한 업무 프로세스를 단순화하고 데이터를 기반으로 한 의사결정을 가능하게 하는 시스템 개발에 열정을 가지고 있습니다.  \n" +
  "연구 데이터 플랫폼, 제조 품질관리, ERP 기반 업무자동화 프로젝트를 수행하며 고객사의 실제 문제 해결과 성과 창출에 집중해왔습니다.  \n" +
  "‘좋은 소프트웨어는 조직의 일하는 방식을 근본적으로 바꿀 수 있다’는 믿음으로 안정성과 확장성을 갖춘 아키텍처를 설계·구현합니다.";

const About = () => {
  return (
    <section className="padding" id="about">
      <img className="background" src={image} alt={imageAltText} />
      <div
        style={{
          backgroundColor: "white",
          width: "50%",
          padding: "4rem",
          margin: "3rem auto",
          textAlign: "center",
        }}
      >
        <h2>About Me</h2>
        <p className="large">{description}</p>
        <hr />
        <ul
          style={{
            textAlign: "left",
            columns: 1,
            fontSize: "1.25rem",
            margin: "2rem 3rem",
            gap: "3rem",
          }}
        >
          {skillsList.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <hr />
        <p style={{ padding: "1rem 3rem 0" }}>{detailOrQuote}</p>
      </div>
    </section>
  );
};

export default About;
