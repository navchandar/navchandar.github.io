import React, { useState, useRef, useEffect } from "react";
import "./WorkHistory.css";

const workData = [
  {
    company: "IBM",
    company_official_name: "IBM India Pvt Ltd",
    start: "Jan 2014",
    end: "Apr 2018",
    title: "Sr System Engineer",
    location: {
      city: "Mumbai",
      country: "India",
      work_mode: "On-site",
    },
    team_size: 10,
    project_domains: ["Insurance", "Enterprise Software"],
    tools_used: [
      "Python",
      "Selenium",
      "Java",
      "TestNG",
      "Maven",
      "SQL",
      "AQT",
      "ALM",
      "SharePoint",
      "SoapUI",
    ],
    awards: [
      {
        title: "Excellence & Eminence Award",
        year: 2016,
        description: "For delivering multiple releases with utmost passion.",
      },
      {
        title: "Manager's Choice Award",
        year: 2014,
        description: "For Restlessly Reinventing IBM and Ourselves.",
      },
    ],
    logo: require("./images/ibm.png"),
  },
  {
    company: "Deloitte",
    company_official_name: "Deloitte Consulting India Pvt Ltd",
    start: "May 2018",
    end: "Dec 2020",
    title: "Consultant",
    location: {
      city: "Hyderabad",
      country: "India",
      work_mode: "Remote",
    },
    team_size: 15,
    project_domains: ["Insurance", "FinTech"],
    tools_used: [
      "Robot Framework",
      "Python",
      "Selenium",
      "Java",
      "Guidewire",
      "GitLab",
      "BitBucket",
      "Power Automate",
      "PowerShell",
    ],
    awards: [
      {
        title: "Applause Award",
        year: 2019,
        description:
          "For good work, zeal, and attitude to enhance overall automation.",
      },
      {
        title: "Spot Award",
        year: 2018,
        description:
          "For enhancing the automation framework and integration with TeamCity.",
      },
    ],
    logo: require("./images/deloitte.png"),
  },
  {
    company: "Techsophy",
    company_official_name: "Techsophy Information Solutions Pvt Ltd",
    start: "Dec 2020",
    end: "Mar 2021",
    title: "Sr SDET",
    location: {
      city: "Hyderabad",
      country: "India",
      work_mode: "Remote",
    },
    team_size: 6,
    project_domains: ["Mapping"],
    tools_used: [
      "Python",
      "PyTest",
      "Requests",
      "Selenium",
      "Postman",
      "Allure",
      "GitHub",
    ],
    awards: [],
    logo: require("./images/techsophy.png"),
  },
  {
    company: "9Yards Technology",
    company_official_name: "9Yards IT Technology Pvt Ltd",
    start: "May 2021",
    end: "Jan 2023",
    title: "Sr Automation Engineer",
    location: {
      city: "Noida",
      country: "India",
      work_mode: "Remote",
    },
    team_size: 10,
    project_domains: ["E-commerce", "Payments"],
    tools_used: [
      "Node.js",
      "Protractor",
      "Jasmine",
      "Jenkins",
      "PowerShell",
      "GitHub",
      "Azure DevOps",
      "Sauce Labs",
      "BlazeMeter",
      "Postman",
      "Newman",
    ],
    awards: [
      {
        title: "Employee of the Year",
        year: 2021,
        description: "For exemplary work and acumen.",
      },
    ],
    logo: require("./images/9yards.png"),
  },
  {
    company: "Hitachi Digital Services",
    company_official_name:
      "Hitachi Vantara Software Services India Private Limited",
    start: "Feb 2023",
    end: "Present",
    title: "Sr QA Automation Engineer",
    location: {
      city: "Bengaluru",
      country: "India",
      work_mode: "Hybrid",
    },
    team_size: 10,
    project_domains: ["IoT", "R&D"],
    tools_used: [
      "SeleniumBase",
      "Pytest",
      "Jenkins",
      "Docker",
      "JMeter",
      "MongoDB",
      "Postman",
      "RabbitMQ",
      "Azure",
      "Swagger",
    ],
    awards: [],
    logo: require("./images/hitachi.png"),
  },
];

function JobItem({ job, index, isExpanded, toggleExpand }) {
  const handleItemClick = (e) => {
    if (e.target.closest(".job-details")) return;
    toggleExpand(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      toggleExpand(index);
    }
  };

  return (
    <li
      className={`job-item ${isExpanded ? "expanded" : ""}`}
      onClick={handleItemClick}
    >
      <div
        className="job-summary"
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={handleKeyDown}
      >
        <img
          src={job.logo}
          alt={`${job.company} logo`}
          className={`company-logo ${isExpanded ? "bigger_logo" : ""}`}
        />
        <div className={`${isExpanded ? "hide" : ""}`}>
          <strong>{job.company}</strong> — {job.start} to {job.end}
        </div>
      </div>

      <div className={`job-details ${isExpanded ? "show" : ""}`}>
        <p>
          <i>{job.company_official_name}</i>
        </p>
        <p>
          <strong>Role:</strong> {job.title}
        </p>
        <p>
          <strong>Domains:</strong> {job.project_domains.join(", ")}
        </p>
        <p>
          <strong>Tech Stack:</strong> {job.tools_used.join(", ")}
        </p>
        <p>
          <strong>Location:</strong> {job.location.city}, {job.location.country}{" "}
          ({job.location.work_mode})
        </p>

        {/* <p>
          <strong>Team Size:</strong> {job.team_size}
        </p> */}

        {job.awards.length > 0 && (
          <div className="awards">
            <strong>Awards & Recognition:</strong>
            <ul>
              {job.awards.map((award, i) => (
                <li
                  key={i}
                  title={`Awarded ${award.title} ${award.description}`}
                >
                  <i>{award.title}</i> ({award.year})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </li>
  );
}

function WorkHistory() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [expandAll, setExpandAll] = useState(false);
  const containerRef = useRef(null);

  const toggleExpand = (index) => {
    if (expandAll) return;
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const toggleExpandAll = () => {
    setExpandAll((prev) => !prev);
    setExpandedIndex(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setExpandedIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="work-history" ref={containerRef}>
      <div className="work-history-header">
        <h3>My Work History</h3>
        <button onClick={toggleExpandAll}>
          {expandAll ? "Collapse All" : "Expand All"}
        </button>
      </div>
      <ul className="job-list">
        {workData.map((job, index) => (
          <JobItem
            key={index}
            job={job}
            index={index}
            isExpanded={expandAll || expandedIndex === index}
            toggleExpand={toggleExpand}
          />
        ))}
      </ul>
    </div>
  );
}

// Add Certifications
const certifications = [
  {
    title: "Certified SAFe 5 Practitioner",
    issuer: "Scaled Agile",
    id: "65685153-1832",
    logo: require("./images/safe.png"),
    url: "https://scaledagile.com/certification/safe-practitioner/",
  },
  {
    title: "ISTQB Certified Tester Foundation Level",
    issuer: "Indian Testing Board",
    id: "ITB - CTFL - 0093927",
    logo: require("./images/istqb.png"),
    url: "https://istqb.in/foundation/certified-tester2/102214-naveenchandar-shanmugam/",
  },
  {
    title: "ISTQB Certified Advanced Level Test Automation Engineer",
    issuer: "Indian Testing Board",
    id: "ITB - CTAL-TAE - 000037",
    logo: require("./images/istqb.png"),
    url: "https://istqb.in/advanced/certified-testers/7487-naveenchandar-shanmugam",
  },
  {
    title: "ITIL v3 Foundation Certified in IT Service Management",
    issuer: "Axelos",
    id: "GR750359834NS",
    logo: require("./images/axelos.png"),
    url: "https://www.axelos.com/successful-candidates-register/",
  },
  {
    title: "Certified Selenium Professional",
    issuer: "Vskills",
    id: "1083ZMF170900105",
    logo: require("./images/vskills.png"),
    url: "https://www.vskills.in/certification/31823-certified-selenium-professional-naveenchandar-shanmugam/",
  },
  {
    title: "Bachelor of Engineering",
    issuer: "Anna University",
    id: "286454",
    logo: require("./images/ceg.png"),
    url: "https://www.annauniv.edu/",
  },
];

function Certifications() {
  return (
    <div className="certifications">
      <h3>My Credentials</h3>
      <ul className="certification-list">
        {certifications.map((cert, index) => (
          <li key={index} className="certification-item job-item">
            <img
              src={cert.logo}
              alt={`${cert.issuer} logo`}
              className="company-logo cert-logo"
            />
            <div className="cert-info">
              <a href={cert.url} target="_blank" rel="noopener noreferrer">
                {cert.title}
              </a>
              <div className="issuer" title={`Certified by ${cert.issuer}`}>
                {cert.issuer}
              </div>
              <div className="issuer" title={`Certificate ID: ${cert.id}`}>
                {cert.id}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WorkHistoryPage() {
  return (
    <div>
      <WorkHistory />
      <Certifications />
    </div>
  );
}

export default WorkHistoryPage;
