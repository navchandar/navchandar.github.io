import React from 'react';
import './WorkHistory.css';

const workData = [
  {
    company: 'IBM',
    start: 'Jan 2014',
    end: 'Apr 2018',
    title: 'Sr System Engineer',
    company_official_name: 'IBM India Pvt Ltd',
  },
  {
    company: 'Deloitte',
    start: 'May 2018',
    end: 'Dec 2020',
    title: 'Consultant',
    company_official_name: 'Deloitte Consulting India Pvt Ltd',
  },
  {
    company: 'Techsophy',
    start: 'Dec 2020',
    end: 'Mar 2021',
    title: 'Sr SDET',
    company_official_name: 'Techsophy Information Solutions Pvt Ltd',
  },
  {
    company: '9Yards Technology',
    start: 'May 2021',
    end: 'Jan 2023',
    title: 'Sr Automation Engineer',
    company_official_name: '9Yards IT Technology Pvt Ltd',
  },
  {
    company: 'Hitachi Digital Services',
    start: 'Jan 2023',
    end: 'Present',
    title: 'Sr QA Automation Engineer',
    company_official_name: 'Hitachi Vantara Software Services India Private Limited',
  },
];

function WorkHistory() {
  return (
    <div className="work-history">
      <h2>Work History</h2>
      <ul>
        {workData.map((job, index) => (
          <li key={index} title={`${job.title} at ${job.company_official_name}`}>
            <strong>{job.company}</strong> — {job.start} to {job.end}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkHistory;
