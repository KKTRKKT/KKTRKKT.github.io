import React, { useState } from "react";
import image from "../images/design-desk.jpeg";

const imageAltText = "desktop with books and laptop";

const projectList = [
  {
    title: "KISTI 과학기술 AI 데이터 공유·활용 서비스 고도화",
    summary:
      "승인된 사용자에게 대용량 데이터인 데이터셋 및 모델을 제공하고, 저장소를 연계한 경진대회 프로세스를 설계 및 구축합니다",
    details: {
      projects: [
        "KISTI 과학기술기계학습데이터서비스 (2022.06~2022.11)",
        "KISTI AI 데이터 공유·활용 서비스 구축 및 운영 (2023.06~2023.11)",
      ],
      background: [
        "연구 데이터 공유·활용 증가에도 불구하고 AI 연구자 활용 인프라 부족",
        "대규모 데이터 저장·관리 아키텍처(데이터 댐) 구축 및 연구자 대상 데이터·모델 공유 플랫폼 개발",
      ],
      outcomes: [
        "월간 활성 사용자 4천 → 4만 (2년 만에 10배 성장)",
        "6000GB 이상 대규모 데이터 저장·제공, 69건 모델/데이터셋 운영",
        "OpenAPI, DOI 기반 검색 제공 → 학술적 인용 가능",
        "데이터톤·리더보드 운영 통한 우수 모델 확산",
      ],
      features: [
        "iRODS 기반 데이터 댐 구축",
        "DOI·Solr·OpenAPI 기반 데이터 검색 및 활용",
        "사용자·관리자 포털 제공",
        "데이터톤·경진대회 운영 플랫폼",
      ],
      techStack: [
        "Spring Boot",
        "JPA",
        "Redis",
        "PostgreSQL",
        "Vue.js",
        "Docker",
        "Solr",
        "iRODS",
        "Grafana",
        "Prometheus",
        "WordPress",
        "Next.js",
      ],
    },
    url: "https://github.com/KKTRKKT/Portfolio/blob/main/docs/portfolio1.pdf",
  },
  {
    title: "커미조아 품질 전산화 시스템 구축",
    summary: "엑셀로 관리하던 품질문서들을 전산화시켜 통계 및 대시보드를 제공합니다",
    details: {
      projects: ["커미조아 품질관리 시스템 (2025.05~2025.07)"],
      background: [
        "종이·수기·스캔·엑셀 등 비효율적 관리대장 작성 프로세스 개선 필요",
        "데이터 표준화 부족, 통계 작성 수작업 과다",
        "목표: 관리대장 전산화, 중앙집중 관리, 제품조회 기능 제공, 데이터 표준화 확보",
      ],
      outcomes: [
        "기록 과정 단순화 → 생산성 향상",
        "통계·분석 자동화 → 하루 이상 걸리던 작업 즉시 확인",
        "입고~출하·AS까지 제품 전 과정 추적 가능",
        "데이터 표준화·일관성 확보, 과거 데이터 안전 이관",
      ],
      features: [
        "관리대장: 수입/공정/출고/출하/부적합/AS 등 관리",
        "제품조회: 전 과정 추적 조회",
        "대시보드: 월간 검사 결과 및 품질지표 차트 시각화",
        "검사/변경점 관리, 통계, 품질문서 관리",
      ],
      techStack: [
        "Spring Boot",
        "JPA",
        "QueryDSL",
        "MariaDB",
        "Thymeleaf",
        "Spring Validation",
        "Spring Cache",
        "Spring Security",
        "Docker",
        "Node.js",
        "Maven/npm",
      ],
    },
    url: "https://github.com/KKTRKKT/Portfolio/blob/main/docs/portfolio2.pdf",
  },
  {
    title: "수자원공사 REC관리시스템 구축",
    summary:
      "REC 생성부터 판매까지 회계처리를 비롯한 복잡한 프로세스를 자동화하고, REC 보유자들에게 Nice기반 인증 대민포털 제공합니다",
    details: {
      projects: ["REC 통합관리 시스템 구축 (2024.06~2024.11, 수자원공사)"],
      background: [
        "REC 발급량 급증으로 민원 증가, 처리 지연 및 수작업 회계 업무 과중",
        "목표: RPA 기반 자동화, SAP 연동, 통합 포털 구축, 보고·분석 기능 고도화",
      ],
      outcomes: [
        "민원 대응 속도 및 품질 향상 (실시간 민원 처리 현황 제공)",
        "SAP 연동으로 회계 데이터 무결성/보안성 확보",
        "매매계약 검증 ~ 회계전표 생성/내부결재 원클릭 처리 구현",
      ],
      features: [
        "REC 매매계약 검증 및 회계 처리 자동화",
        "계약 체결·계좌 변경 이력 관리",
        "대민용 포털: 단가 조회, 요금·발전소 정보, 지급 현황, 민원 조회, 게시판(Q&A/공지)",
      ],
      techStack: [
        "Oracle",
        "Java",
        "MyBatis",
        "Hasim Framework",
        "Maven",
        "WebSquare",
        "Eclipse",
      ],
    },
    url: "https://github.com/KKTRKKT/Portfolio/blob/main/docs/portfolio3.pdf",
  },
];


const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
      <section className="padding" id="portfolio">
        <h2 style={{ textAlign: "center" }}>Portfolio</h2>
        <div style={{ display: "flex", flexDirection: "row", paddingTop: "3rem" }}>
          <div style={{ maxWidth: "40%", alignSelf: "center" }}>
            <img
                src={image}
                style={{ height: "90%", width: "100%", objectFit: "cover" }}
                alt={imageAltText}
            />
          </div>
          <div className="container">
            {projectList.map((project) => (
                <div className="box" key={project.title}>
                  <button
                      onClick={() => handleProjectClick(project)}
                      style={{ textAlign: "left", background: "none", border: "none", padding: 0 }}
                  >
                    <h3 style={{cursor:"pointer"}}>{project.title}</h3>
                  </button>
                  <p className="small">{project.summary}</p>
                </div>
            ))}
          </div>
        </div>

        {/* Modal for showing detailed project information */}
        {selectedProject && (
          <div className="modal-overlay">
            <div className="modal-container">
              <h3 className="modal-title">{selectedProject.title}</h3>

              <p className="modal-summary">{selectedProject.summary}</p>

              <div className="modal-section">
                <h4>프로젝트명</h4>
                <ul>
                  {selectedProject.details.projects.map((proj, idx) => (
                    <li key={idx}>{proj}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <h4>배경 및 목표</h4>
                <ul>
                  {selectedProject.details.background.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <h4>성과</h4>
                <ul>
                  {selectedProject.details.outcomes.map((outcome, idx) => (
                    <li key={idx}>{outcome}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <h4>핵심 기능</h4>
                <ul>
                  {selectedProject.details.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <h4>기술스택</h4>
                <div className="tech-stack">
                  {selectedProject.details.techStack.map((tech, idx) => (
                    <span key={idx} className="tech-badge">
              {tech}
            </span>
                  ))}
                </div>
              </div>

              {selectedProject.url && (
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-link"
                >
                  포트폴리오 상세
                </a>
              )}

              <button onClick={closeModal} className="modal-close-btn">
                닫기
              </button>
            </div>
          </div>
        )}

      </section>
  );
};

export default Portfolio;
