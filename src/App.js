import React, { useEffect, useState } from 'react';
import StateChart from './Components/StateChart';
import CourseChart from './Components/CourseChart';
import StateColleges from './Components/StateColleges'
import BranchColleges from './Components/BranchColleges'
import Loading from './Components/Loading'
import './App.css'

function App() {
  const [stateData, setStateData] = useState([])
  const [coursesData, setCoursesData] = useState([])
  const [count, setcount] = useState(0)
  const [dataFetch, setDataFetch] = useState(false)
  const [showStateColleges, setShowStateColleges] = useState(false)
  const [showCourseColleges, setShowCourseColleges] = useState(false)
  const [stateName, setStateName] = useState('')
  const [courseName, setCourseName] = useState('')
  const [showStateData, setShowStateData] = useState(true)
  const [showCourseData, setShowCourseData] = useState(false)
  const [isLoading, setisLoading] = useState(true)

  const fetchData = async (url1, url2) => {
    setisLoading(true)
    try {
      const response = await fetch(url1)
      let data_rec = await response.json()
      data_rec = JSON.stringify(data_rec)
      data_rec = JSON.parse(data_rec)
      setStateData(data_rec)
      const response2 = await fetch(url2)
      let data_rec2 = await response2.json()
      data_rec2 = JSON.stringify(data_rec2)
      data_rec2 = JSON.parse(data_rec2)
      setCoursesData(data_rec2)
      setDataFetch(true)
      setisLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchCount = async (url) => {
    setisLoading(true)
    try {
      const response = await fetch(url)
      let data_rec = await response.json()
      setcount(data_rec)
      setisLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  const handleStateClick = (node) => {
    setShowCourseColleges(false);
    setShowStateColleges(true);
    setStateName(node.id);
  }
  const handleCourseClick = (node) => {
    setShowStateColleges(false);
    setShowCourseColleges(true);
    setCourseName(node.id);
  }
  useEffect(() => {
    fetchData('https://oneshot-backend-keshav.herokuapp.com/college/state', 'https://oneshot-backend-keshav.herokuapp.com/college/branchcount')
    fetchCount('https://oneshot-backend-keshav.herokuapp.com/college/count')
  }, [])
  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  return (
    <div>
      <div className="dashboard">
        <div className="statechart" >
          <center> <h2 className="statehead">State Dashboard</h2> </center>
          {dataFetch && <StateChart data={stateData} cnt={count} handleStateClick={handleStateClick} />}
        </div>
        <div className="statechart" >
          <center> <h2 className="statehead">Course Dashboard</h2> </center>
          {dataFetch && <CourseChart data={coursesData} cnt={count} handleCourseClick={handleCourseClick} />}
        </div>
      </div>
      <div className="container">
        {/* <center> */}
        <button className="mobile-btn1" onClick={() => {
          setShowCourseData(false)
          setShowStateData(true)
        }}>
          State Dashbord
        </button>
        <button className="mobile-btn2" onClick={() => {
          setShowStateData(false)
          setShowCourseData(true)
        }}>
          Course Dashboard
        </button>
        {/* </center> */}

        {showStateData &&
          <div className="statechart" >
            {dataFetch && <StateChart data={stateData} cnt={count} handleStateClick={handleStateClick} />}
          </div>
        }
        {showCourseData &&
          <div className="statechart" >
            {dataFetch && <CourseChart data={coursesData} cnt={count} handleCourseClick={handleCourseClick} />}
          </div>
        }
      </div>
      <div>
        {showStateColleges && <StateColleges state={stateName} />}
        {showCourseColleges && <BranchColleges branch={courseName} />}
      </div>
    </div>
  );
}

export default App;
