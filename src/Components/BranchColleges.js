import React, { useState, useEffect } from 'react';
import CourseList from './CourseList'
import StudentList from './StudentList'
import '../List.css'
const StateColleges = ({ branch }) => {
    const [collegeDetails, setCollegeDetails] = useState([])
    const [similarCollegeDetails, setSimilarCollegeDetails] = useState([])
    const [collegeStudentDetails, setCollegeStudentDetails] = useState([])
    const [fetchStatus, setFetchStatus] = useState(false)
    const [fetchSimilarCollegesStatus, setFetchSimilarCollegeStatus] = useState(false)
    const [fetchStudentStatus, setFetchStudentStatus] = useState(false)
    const [collegeName, setCollegeName] = useState('')
    function capitalize(input) {
        var words = input.split(' ');
        var CapitalizedWords = [];
        words.forEach(element => {
            CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));
        });
        return CapitalizedWords.join(' ');
    }
    const fetchCoursesColleges = async () => {
        setFetchStatus(false)
        const response = await fetch('https://oneshot-backend-keshav.herokuapp.com/college/courses/' + branch)
        let data_rec = await response.json()
        data_rec = JSON.stringify(data_rec)
        data_rec = JSON.parse(data_rec)
        setCollegeDetails(data_rec)
        setFetchStatus(true)
    }
    const removeCollege = (id) => {
        const newDetails = collegeDetails.filter((tour) => tour._id !== id)
        setCollegeDetails(newDetails)
    }
    const fetchSimilarColleges = async (studentNumber, state) => {
        setFetchSimilarCollegeStatus(false)
        setFetchStatus(false)
        state = capitalize(state)
        if(state.length === 2 && (state[1] === 'P' || state[1] === 'p')){
            state = state.toUpperCase();
        }
        const response = await fetch('https://oneshot-backend-keshav.herokuapp.com/college/similarColleges/' + state + '?stu=' + studentNumber + '&branch=' + branch)
        let data_rec = await response.json()
        data_rec = JSON.stringify(data_rec)
        data_rec = JSON.parse(data_rec)
        setSimilarCollegeDetails(data_rec)
        setFetchSimilarCollegeStatus(true)
    }
    const fetchStudentDetails = async (id) => {
        const response = await fetch('https://oneshot-backend-keshav.herokuapp.com/student/id/' + id)
        let data_rec = await response.json()
        console.log(data_rec);
        setCollegeStudentDetails((oldStudents) => {
            return [...oldStudents, ...data_rec]
        })
    }
    const studentDetails = (student, name) => {
        setFetchSimilarCollegeStatus(false)
        setFetchStatus(false)
        setFetchStudentStatus(false)
        setCollegeStudentDetails([])
        console.log(typeof student);
        // eslint-disable-next-line array-callback-return
        student.map(home => { fetchStudentDetails(home) })
        setFetchStudentStatus(true)
        setCollegeName(name)

    }
    const removeStudent = (id) => {
        const newDetails = collegeStudentDetails.filter((student) => student._id !== id)
        setCollegeStudentDetails(newDetails)
    }
    useEffect(() => {
        setCollegeDetails([])
        fetchCoursesColleges()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [branch])
    if (collegeDetails.length === 0 && fetchStatus) {
        return (
            <main>
                <div className='title'>
                    <center>
                        <h2>No Colleges are left in {branch}</h2>
                        <button className='btn' onClick={() => fetchCoursesColleges()}>
                            refresh
                        </button>
                    </center>
                </div>
            </main>
        )
    }
    if (fetchStatus) {
        return (
            <div className="title">
                <center> <h2> Showing Colleges that have {branch} Course</h2></center>
                {fetchStatus && collegeDetails.map((home, index) => <CourseList key={index} name={home.name} branch={home.courses} year={home.year} city={home.city} studentNumber={home.no_students} removeCollege={removeCollege} id={home._id} state={home.state} country={home.country} fetchSimilarColleges={fetchSimilarColleges} studentDetails={studentDetails} students={home.students} />)}
            </div>
        )
    }
    if (similarCollegeDetails.length === 0 && fetchSimilarCollegesStatus) {
        return (
            <center><div className="title"><h2>No Similar Colleges Found</h2>
                <button className='btn' onClick={() => fetchCoursesColleges()}>
                    refresh
                </button>
            </div>
            </center>
        )
    }
    if (fetchSimilarCollegesStatus) {
        return (
            <div className="title">
                <center> <h2> Showing Similar Colleges</h2></center>
                {similarCollegeDetails.map((home, index) => <CourseList key={index} name={home.name} branch={home.courses} year={home.year} city={home.city} studentNumber={home.no_students} removeCollege={removeCollege} id={home._id} fetchSimilarColleges={fetchSimilarColleges} studentDetails={studentDetails} students={home.students} />)}
                <center>
                    <button className='btn' onClick={() => fetchCoursesColleges()}>
                        refresh
                    </button>
                </center>
            </div>
        )
    }
    if (collegeStudentDetails.length === 0 && fetchStudentStatus) {
        return (
            <center><div className="title"><h2>No Students Found for College {collegeName}</h2>
                <button className='btn' onClick={() => fetchCoursesColleges()}>
                    refresh
                </button>
            </div>
            </center>
        )
    }
    if (fetchStudentStatus) {
        return (
            <div className="title">
                <center> <h2> Showing Student Details of College {collegeName}</h2></center>
                {collegeStudentDetails.map((home, index) => <StudentList key={index} id={home._id} name={home.name} year={home.batch} skills={home.skills} removeStudent={removeStudent} />)}
                <center>
                    <button className='btn' onClick={() => fetchCoursesColleges()}>
                        refresh
                    </button>
                </center>
            </div>
        )
    }
    return (
        <div className="title">
        </div>
    )
}

export default StateColleges