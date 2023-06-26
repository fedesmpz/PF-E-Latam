import React from 'react'
import Sidebar from '../ComponentsAdmin/SideBar/SideBar'
import SalesCard from '../ComponentsAdmin/Statistics/SalesCard'
import SalesStats from '../ComponentsAdmin/Statistics/SalesStats'
import LineChart from '../ComponentsAdmin/Statistics/LineChart'

const Statistics = () => {
  return (
    <div>
      <Sidebar />
      <SalesCard />
      <SalesStats />
      {/* <LineChart /> */}
    </div>
  )
}

export default Statistics