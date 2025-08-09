import React, { useState } from "react";
import image from "../images/design-desk.jpeg";

const imageAltText = "desktop with books and laptop";

const projectList = [
  {
    title: "커미조아 품질 전산화 시스템 구축",
    summary:
        "엑셀로 관리하던 품질문서들을 전산화시켜 통계 및 대시보드를 제공합니다",
    url: "",
  },
  {
    title: "수자원공사 REC관리시스템 구축",
    summary:
        "REC 생성부터 판매까지 회계처리를 비롯한 복잡한 프로세스를 자동화하고, REC 보유자들에게 Nice기반 인증 대민포털 제공합니다",
    url: "https://www.kwater.or.kr/rec/wq/index.jsp?w2xPath=/rec/ui/rec/po/main.xml",
  },
  {
    title: "KISTI 과학기술 AI 데이터 공유·활용 서비스 고도화",
    summary:
        "승인된 사용자에게 대용량 데이터인 데이터셋 및 모델을 제공하고, 저장소를 연계한 경진대회 프로세스를 설계 및 구축합니다",
    url: "https://aida.kisti.re.kr/",
  },
  {
    title: "인천공항공사 공공데이터개방플랫폼 구축",
    summary:
        "각 부서에 관리하던 openAPI를 Gateway 방식으로 전환해 활용 편의성을 향상시킵니다.",
    url: "https://odp.airport.kr/apiPortal/main",
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
            <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
            >
              <div
                  style={{
                    backgroundColor: "white",
                    padding: "2rem",
                    borderRadius: "8px",
                    maxWidth: "600px",
                    width: "100%",
                    maxHeight: "80vh",
                    overflowY: "auto",
                  }}
              >
                <h3>{selectedProject.title}</h3>
                <p>{selectedProject.summary}</p>
                {selectedProject.url && (
                    <a
                        href={selectedProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "blue", textDecoration: "underline" }}
                    >
                      웹사이트
                    </a>
                )}

                <button
                    onClick={closeModal}
                    style={{
                      float: "right",
                      display: "block",
                      marginTop: "1rem",
                      backgroundColor: "gray",
                      color: "white",
                      border: "none",
                      padding: "0.5rem",
                      cursor: "pointer",
                    }}
                >
                  Close
                </button>
              </div>
            </div>
        )}
      </section>
  );
};

export default Portfolio;
