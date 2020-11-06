import React from 'react';

const News = (props) => {
  const { data } = props;
  return (
    <div className="card">
      <div className="card-header">{data.date}</div>
      <div className="card-body">
        {data.activity.map((act) => (
          <>
            <h5 className="card-title">{act.title}</h5>
            <p className="card-text">{act.desc}</p>
            <a href={act.url} className="btn btn-warning">
              Go somewhere
            </a>
          </>
        ))}
      </div>
    </div>
    // <>
    //   <p>
    //     {data.id}
    //     --
    //     {data.date}
    //   </p>
    //   {data.activity.map((act) => (
    //     <>
    //       <p>{act.title}</p>
    //       <a href={act.url}> Baca selengkapnya </a>
    //     </>
    //   ))}
    // </>
  );
};

export default News;
