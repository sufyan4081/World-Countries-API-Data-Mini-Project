import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./snapshots.css"
import Loading from '../Loader/Loading';

const Snapshots = () => {
  const [post, setPost] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios.get("https://restcountries.com/v3.1/all")
      .then((res) => {
        console.log(res.data)
        setPost(res.data)
        const result = res.data.sort((a,b)=> a.name.common.localeCompare(b.name.common))
        setRecords(result)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  // filter for searching data 
  const filter = (e) => {
    setRecords(post.filter(f => [f.name.common, f.capital]?.toString().toLowerCase().includes(e.target.value)))
  }

  return (
    <div className='container'>

      {/* input search button */}
      <div className="search">
        <input type="search" placeholder='Enter Country Name or Capital' onChange={filter} />
      </div>

      {loading ? <Loading/> : ''};
      <div className="box">

        {/* single card UI */}
        {records.map((p) => (
          <div className='card' key={p.name.common}>
            <img src={p.flags.png} alt="" />
            <h2>{p.name.common}</h2>
            <p><span>Capital : </span>{p.capital}</p>
            <p><span>Region : </span>{p.region}</p>
            <p><span>Population : </span>{p.population}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Snapshots












