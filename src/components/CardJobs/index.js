import React from 'react';

function CardJobs({ job }) {
  const { _id, title, location } = job;

  return (
    <div className="job-card">
      <span className="job-card-location">{location}</span>
      <p className="job-card-title">{title}</p>
      <a className="btn-yellow" href={`/job/${_id}`}>Detalhes</a>
    </div>
  );
}

export default CardJobs;
