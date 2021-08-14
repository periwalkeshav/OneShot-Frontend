import React from 'react'
import '../List.css'
export default function StudentList({ name, year, college, skills, id, removeStudent }) {
    return (
        <section className="section-center">
            <article className='college-item' >
                <div className="content">
                    <p className="title">Name: {name}</p>
                    <span style={{ display: "flex", flexDirection: "row", margin: 0, padding: 0 }}>
                        <pre className="branch">Skills: </pre>
                        {skills.map((home, index) => <pre className="branch" key={index}>{home} </pre>)}
                    </span>
                    <p className="branch">Batch: {year}</p>

                </div>
                <div className='btn-container'>
                    <button
                        type='button'
                        className='delete-btn'
                        onClick={() => removeStudent(id)}
                    >
                        Remove Student
                    </button>
                </div>
            </article>
        </section>
    )
}
