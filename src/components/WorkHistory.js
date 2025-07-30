import React, { useState, useRef, useEffect } from 'react';
import './WorkHistory.css';


const workData = [
    {
        company: 'IBM',
        company_official_name: 'IBM India Pvt Ltd',
        start: 'Jan 2014',
        end: 'Apr 2018',
        title: 'Sr System Engineer',
        location: 'Mumbai, India (On-site)',
        team_size: 10,
        domains: 'Insurance, Enterprise Software',
        tools_used: 'Python, Selenium, ALM, SharePoint, SoapUI',
        logo: require('./images/ibm.png'),
    },
    {
        company: 'Deloitte',
        company_official_name: 'Deloitte Consulting India Pvt Ltd',
        start: 'May 2018',
        end: 'Dec 2020',
        title: 'Consultant',
        location: 'Hyderabad, India (Remote)',
        team_size: 15,
        domains: 'Insurance, FinTech',
        tools_used: 'Robot Framework, Java, MS Power Automate',
        logo: require('./images/deloitte.png'),
    },
    {
        company: 'Techsophy',
        company_official_name: 'Techsophy Information Solutions Pvt Ltd',
        start: 'Dec 2020',
        end: 'Mar 2021',
        title: 'Sr SDET',
        location: 'Hyderabad, India (Remote)',
        team_size: 6,
        domains: 'Mapping',
        tools_used: 'Python, Postman, GitHub',
        logo: require('./images/techsophy.png'),
    },
    {
        company: '9Yards Technology',
        company_official_name: '9Yards IT Technology Pvt Ltd',
        start: 'May 2021',
        end: 'Jan 2023',
        title: 'Sr Automation Engineer',
        location: 'Noida, India (Remote)',
        team_size: 10,
        domains: 'E-commerce, Payments',
        tools_used: 'Protractor, Node.js, Jenkins, PowerShell, BlazeMeter',
        logo: require('./images/9yards.png'),
    },
    {
        company: 'Hitachi Digital Services',
        company_official_name: 'Hitachi Vantara Software Services India Private Limited',
        start: 'Feb 2023',
        end: 'Present',
        title: 'Sr QA Automation Engineer',
        location: 'Bengaluru, India (Hybrid)',
        team_size: 10,
        domains: 'IoT (Internet of Things), R&D',
        tools_used: 'SeleniumBase, Pytest, Jenkins, Docker, JMeter, MongoDB, Azure',
        logo: require('./images/hitachi.png'),
    },
];


function JobItem({ job, index, isExpanded, toggleExpand }) {
    return (
        <li
            className={`job-item ${isExpanded ? 'expanded' : ''}`}
            onClick={(e) => {
                if (e.target.closest('.job-details')) return;
                toggleExpand(index);
            }}
        >
            <div
                className="job-summary"
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') toggleExpand(index);
                }}
            >
                <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className={`company-logo ${isExpanded ? 'bigger_logo' : ''}`}
                />
                <div className={`${isExpanded ? 'hide' : ''}`}>
                    <strong>{job.company}</strong> — {job.start} to {job.end}
                </div>
            </div>
            <div className={`job-details ${isExpanded ? 'show' : ''}`}>
                <p><i>{job.company_official_name}</i></p>
                <p><strong>Role:</strong> {job.title}</p>
                <p><strong>Domains:</strong> {job.domains}</p>
                <p><strong>Tech Stack:</strong> {job.tools_used}</p>
                <p><strong>Location:</strong> {job.location}</p>
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
        setExpandedIndex(prev => (prev === index ? null : index));
    };

    const toggleExpandAll = () => {
        setExpandAll(prev => !prev);
        setExpandedIndex(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setExpandedIndex(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="work-history" ref={containerRef}>
            <div className="work-history-header">
                <h3>My Work History</h3>
                <button onClick={toggleExpandAll}>
                    {expandAll ? 'Collapse All' : 'Expand All'}
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
        title: 'Certified SAFe 5 Practitioner',
        issuer: 'Scaled Agile',
        id: '65685153-1832',
        logo: require('./images/safe.png'),
        url: 'https://scaledagile.com/certification/safe-practitioner/',
    },
    {
        title: 'ISTQB Certified Tester Foundation Level',
        issuer: 'Indian Testing Board',
        id: 'ITB - CTFL - 0093927',
        logo: require('./images/istqb.png'),
        url: 'https://istqb.in/foundation/certified-tester2/102214-naveenchandar-shanmugam/',
    },
    {
        title: 'ISTQB Certified Advanced Level Test Automation Engineer',
        issuer: 'Indian Testing Board',
        id: 'ITB - CTAL-TAE - 000037',
        logo: require('./images/istqb.png'),
        url: 'https://istqb.in/advanced/certified-testers/7487-naveenchandar-shanmugam',

    },
    {
        title: 'ITIL v3 Foundation Certified in IT Service Management',
        issuer: 'Axelos',
        id: 'GR750359834NS',
        logo: require('./images/axelos.png'),
        url: 'https://www.axelos.com/successful-candidates-register/',
    },
    {
        title: 'Certified Selenium Professional',
        issuer: 'Vskills',
        id: '1083ZMF170900105',
        logo: require('./images/vskills.png'),
        url: 'https://www.vskills.in/certification/31823-certified-selenium-professional-naveenchandar-shanmugam/',
    },
    {
        title: 'Bachelor of Engineering',
        issuer: 'Anna University',
        id: '286454',
        logo: require('./images/ceg.png'),
        url: 'https://www.annauniv.edu/',
    },
];


function Certifications() {
    return (
        <div className="certifications">
            <h3>My Credentials</h3>
            <ul className="certification-list">
                {certifications.map((cert, index) => (
                    <li key={index} className="certification-item job-item">
                        <img src={cert.logo} alt={`${cert.issuer} logo`} className="company-logo" />
                        <div className="cert-info">
                            <a href={cert.url} target="_blank" rel="noopener noreferrer">{cert.title}</a>
                            <div className="issuer" title={`Certified by ${cert.issuer}`}>{cert.issuer}</div>
                            <div className="issuer" title={`Certificate ID: ${cert.id}`}>{cert.id}</div>
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
