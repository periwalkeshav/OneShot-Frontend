import React, { useState } from 'react'
import '../List.css'
export default function CourseList({ name, branch, year, city, studentNumber, id, removeCollege, state, country, fetchSimilarColleges, students, studentDetails }) {
    const [showMore, setShowMore] = useState(false)
    const [enterBranch, setEnterBranch] = useState(false)
    const [branchName, setBranchName] = useState('')
    return (
        <section className="section-center">
            <article className='college-item' >
                <div className="content">
                    <p className="title">Name: {name}</p>
                    <span style={{ display: "flex", flexDirection: "row", margin: 0, padding: 0 }}>
                        <pre className="branch">Courses: </pre>
                        {branch.map((home, index) => <pre className="branch" key={index}>{home} </pre>)}
                    </span>
                    {showMore && <>
                        <p className="branch">Year: {year}</p>
                        <p className="branch">City: {city}</p>
                        <p className="branch">State: {state}</p>
                        <p className="branch">Country: {country}</p>
                        <p className="branch">No. of Students: {studentNumber}</p>
                    </>}
                </div>
                <div className='btn-container'>
                    <button
                        type='button'
                        className='show-btn'
                        onClick={() => setShowMore(!showMore)}
                    >
                        {showMore ? 'Show Less Details' : 'Show More Details'}
                    </button>
                    <span className="btn-span"> | </span>
                    <button
                        type='button'
                        className='edit-btn'
                        onClick={() => setEnterBranch(!enterBranch)}
                    >
                        Similar Colleges
                    </button>
                    <span className="btn-span"> | </span>
                    <button
                        type='button'
                        className='delete-btn'
                        onClick={() => removeCollege(id)}
                    >
                        Remove College
                    </button>
                    <span className="btn-span"> | </span>
                    <button
                        type='button'
                        className='student-btn'
                        onClick={() => studentDetails(students, name)}
                    >
                        Show Student List
                    </button>
                    {enterBranch &&
                        <div>
                            <form >
                                <label>
                                    <p className="branch">Enter State </p>
                                    <input type="text" name="name" placeholder='e.g. Tamil Nadu'
                                        value={branchName}
                                        onChange={(e) => setBranchName(e.target.value)} />
                                </label>
                                <input type="submit" value="Submit" className="edit-btn" onClick={(e) => {
                                    e.preventDefault()
                                    if (branchName !== '') {
                                        fetchSimilarColleges(studentNumber, branchName)
                                    }
                                }} />
                            </form>
                        </div>}
                </div>
            </article>
        </section>
    )
}
