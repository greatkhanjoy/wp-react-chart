import React, { PureComponent, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const SimpleLineChart = () => {

  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState();
  const [url, setUrl] = useState(`${appLocalizer.rest_url}`);



  const filter = (e)=> {
    axios.get(url + '/last-n-days/' + e.target.value).then((res) => {
      setApiData(res.data)
      setLoading(false)
    }).catch((err) => {
      setApiData(res.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    setLoading(true)
    axios.get(url + '/settings').then((res) => {
      setApiData(res.data)
      setLoading(false)
    }).catch((err) => {
      setApiData(res.data)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <div style={{marginBottom: "20px"}}>
        <h2 style={{display: "inline"}}>WPCR Chart</h2>
        <div style={{float:"right"}}>
          <select onChange={filter} defaultValue={0}>
            <option value="0" disabled>Filter By Days</option>
            <option value="7">Last 7 Days</option>
            <option value="15">Last 15 Days</option>
            <option value="30">Last 30 Days</option>
          </select>
        </div>
      </div>
        <LineChart
          width={350}
          height={300}
          data={apiData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </div>
  )
}

export default SimpleLineChart