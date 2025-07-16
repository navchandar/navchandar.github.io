import React, { useState } from 'react';

import './WorkHistory.css';

const workData = [
    {
        company: 'IBM',
        company_official_name: 'IBM India Pvt Ltd',
        start: 'Jan 2014',
        end: 'Apr 2018',
        title: 'Sr System Engineer',
        location: 'Mumbai, India',
        logo: require('./images/ibm.png'),
    },
    {
        company: 'Deloitte',
        company_official_name: 'Deloitte Consulting India Pvt Ltd',
        start: 'May 2018',
        end: 'Dec 2020',
        title: 'Consultant',
        location: 'Hyderabad, India',
        logo: require('./images/deloitte.png'),
    },
    {
        company: 'Techsophy',
        company_official_name: 'Techsophy Information Solutions Pvt Ltd',
        start: 'Dec 2020',
        end: 'Mar 2021',
        title: 'Sr SDET',
        location: 'Hyderabad, India',
        logo: require('./images/techsophy.png'),
    },
    {
        company: '9Yards Technology',
        company_official_name: '9Yards IT Technology Pvt Ltd',
        start: 'May 2021',
        end: 'Jan 2023',
        title: 'Sr Automation Engineer',
        location: 'Noida, India',
        logo: require('./images/9yards.png'),
    },
    {
        company: 'Hitachi Digital Services',
        company_official_name: 'Hitachi Vantara Software Services India Private Limited',
        start: 'Jan 2023',
        end: 'Present',
        title: 'Sr QA Automation Engineer',
        location: 'Bengaluru, India',
        logo: require('./images/hitachi.png'),
    },
];


function WorkHistory() {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="work-history">
            <h3>My Work History</h3>
            <ul>
                {workData.map((job, index) => (
                    <li key={index} onClick={() => toggleExpand(index)} className="job-item">
                        <img src={job.logo} alt={`${job.company} logo`} className="company-logo" />
                        <div>
                            <strong>{job.company}</strong> — {job.start} to {job.end}
                        </div>
                        {expandedIndex === index && (
                            <div className="job-details">
                                <p><strong>Company Name:</strong> {job.company_official_name}</p>
                                <p><strong>Job Role:</strong> {job.title}</p>
                                <p><strong>Location:</strong> {job.location}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default WorkHistory;
