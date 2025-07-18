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
        logo: require('./images/hitachi.png'),
    },
];




function WorkHistory() {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [expandAll, setExpandAll] = useState(false);
    const containerRef = useRef(null);

    const toggleExpand = (index) => {
        // Disable individual toggle when all are expanded
        if (expandAll) return;
        setExpandedIndex(prev => (prev === index ? null : index));
    };

    const toggleExpandAll = () => {
        setExpandAll(prev => !prev);
        // Reset individual selection
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
                {workData.map((job, index) => {
                    const isExpanded = expandAll || expandedIndex === index;
                    return (
                        <li
                            key={index}
                            className={`job-item ${isExpanded ? 'expanded' : ''}`}
                            onClick={() => toggleExpand(index)}
                        >
                            <div className="job-summary">
                                <img src={job.logo} alt={`${job.company} logo`}
                                    className={`company-logo ${isExpanded ? 'bigger_logo' : ''}`} />
                                <div className={`${isExpanded ? 'hide' : ''}`}>
                                    <strong>{job.company}</strong> — {job.start} to {job.end}
                                </div>
                            </div>
                            <div className={`job-details ${isExpanded ? 'show' : ''}`}>
                                <p><i>{job.company_official_name}</i></p>
                                <p><strong>Role:</strong> {job.title}</p>
                                <p><strong>Domains:</strong> {job.domains}</p>
                                <p><strong>Team Size:</strong> {job.team_size}</p>
                                <p><strong>Location:</strong> {job.location}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}



export default WorkHistory;
