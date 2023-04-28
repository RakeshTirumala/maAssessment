import './App.css';
import React, { useState} from 'react';
import {FaMoon} from 'react-icons/fa'
import {BsFillSunFill} from 'react-icons/bs'
import ReactEcharts from "echarts-for-react"
import * as echarts from 'echarts';

function App() {
  const [theme, setTheme] = useState(1)
  const [ChartTheme, setChartTheme] = useState("theme1")
  const [themeColor, setThemeColor] = useState("#FFFFFF")

  echarts.registerTheme('theme1', {
    backgroundColor: '#ffffff'
  });
  echarts.registerTheme('theme2', {
    backgroundColor: '#242124' 
  });

  // Loading data
  const data = require('./Wine-Data.json')
  console.log("data:",data)
  const ashData = data.map((dp)=>{
    return dp.Ash
  })
  const flavanoidsData = data.map((dp)=>{
    return dp.Flavanoids
  })
  console.log("ashData: ",ashData)
  console.log("Flavanoids: ", flavanoidsData)

  const sndGraphMap = {}
  data.map((dp)=>{
    if(sndGraphMap[dp.Alcohol]){
      if(dp.Magnesium<sndGraphMap[dp.Alcohol]){
        sndGraphMap[dp.Alcohol] = dp.Magnesium
      }
    }else{
      sndGraphMap[dp.Alcohol] = dp.Magnesium
    }
  })

  console.log("map:", sndGraphMap)

  // graph properties
  const option = {
    grid: { top: 72, right: 72, bottom: 72, left: 72 },
    dataZoom: {
      show: true,
      start: 0,
      end: 100
    },
    xAxis: {
      type: 'value',
      data: flavanoidsData,
      name:"Flavanoid",

    },
    yAxis: {
      type: 'value',
      name:"Ash"
    },
    series: [
      {
        data: ashData,
        type: 'line',
        smooth:true,
        lineStyle: {
            color: "#25f1f5",
            width: 2
        },
        itemStyle: {
            borderWidth: 2,
            borderColor: "#a5b0af"
        }
      }
    ],
    tooltip: {
      trigger: 'axis',
    },
  }; 

  const option2 = {
    xAxis: {
      type: 'category',
      data: Object.keys(sndGraphMap),
      name:"Alcohol"
    },
    yAxis: {
      type: 'value',
      name:"Min. Magnesium"
    },
    series: [
      {
        data: Object.values(sndGraphMap),
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          valueAnimation: true
        }
      }
    ]
  }

  const handleTheme=()=>{
    if(theme==1){
      setTheme(0)
      setThemeColor("#282A36")
    }
    else{
      setTheme(1)
      setThemeColor("#FFFFFF")
    }
  }

  const handleLineGraphTheme=()=>{
    if(ChartTheme=="theme1"){
      setChartTheme("theme2")
    }else{
      setChartTheme("theme1")
    }
  }
  const mediaQuery = window.innerWidth
  console.log(mediaQuery)

  return (
    mediaQuery>1080
    ?(
      <div className='App' style={{backgroundColor:themeColor, width:"100%", height:"100%", paddingTop:"10%"}}>
        <nav className='appNavBar'>
          <h1 style={{fontFamily:"Arial", color:"white"}}>Manufac Analytics</h1>
          <div className='themeBtn' onClick={()=>{handleTheme()}}>
            {
              theme==1
              ?(
                <FaMoon style={{width:"90%", height:"90%"}}/>
              )
              :(
                <BsFillSunFill style={{width:"90%", height:"90%"}}/>
              )
            }
          </div>
        </nav>
        <div>
          {/* LineGraph */}
          <div className='GraphDiv'>
            <ReactEcharts option={option} style={{width:"60%", height:"100%"}} theme={ChartTheme}/>
            <div style={{backgroundColor:"black", color:"white", 
            fontFamily:'Arial', fontSize:"14px",
            borderRadius:"1.5rem",margin:"2%", 
            height:"50%",
            width:"25%",
            padding:"5%"}}>
            <p style={{textAlign:"justify", textJustify:"inter-word"}}>This is a line chart visualizing ash and Flavanoid data. 
            With “Ash” on Y-axis and “Flavanoids” on the X-axis for the wine dataset</p>
            </div>
            <div className='graphThemeBtn' onClick={()=>handleLineGraphTheme()}>
              {
                  ChartTheme=="theme1"
                  ?(
                    <FaMoon style={{width:"90%", height:"90%", color:"black"}}/>
                  )
                  :(
                    <BsFillSunFill style={{width:"90%", height:"90%", color:"black"}}/>
                  )
                }
            </div>
          </div>
          {/* Graph */}
          <div className='GraphDiv'>
            <ReactEcharts option={option2} style={{width:"60%", height:"100%"}} theme={ChartTheme}/>
            <div style={{backgroundColor:"black", color:"white", 
            fontFamily:"Arial", fontSize:"14px",
            borderRadius:"1.5rem",margin:"2%", 
            height:"50%",
            width:"25%",
            padding:"5%"}}>
            <p style={{textAlign:"justify", textJustify:"inter-word"}}> 
            The Bar graph visualizes the “Alcohol” categories on the X-axis and the
            minimum “Magnesium” value for each alcohol category on the Y-axis for the wine dataset.
            </p>
            </div>
            <div className='graphThemeBtn' onClick={()=>handleLineGraphTheme()}>
              {
                  ChartTheme=="theme1"
                  ?(
                    <FaMoon style={{width:"90%", height:"90%", color:"black"}}/>
                  )
                  :(
                    <BsFillSunFill style={{width:"90%", height:"90%", color:"black"}}/>
                  )
                }
            </div>
          </div>
        </div>
      </div>
    )
    :mediaQuery>768?
    (
      <div className='App' style={{backgroundColor:themeColor, width:"100%", height:"100%", paddingTop:"10%"}}>
        <nav className='appNavBar'>
          <h1 style={{fontFamily:"Arial", color:"white"}}>Manufac Analytics</h1>
          <div className='themeBtnTabs' onClick={()=>{handleTheme()}}>
            {
              theme==1
              ?(
                <FaMoon style={{width:"90%", height:"90%"}}/>
              )
              :(
                <BsFillSunFill style={{width:"90%", height:"90%"}}/>
              )
            }
          </div>
        </nav>
        {/* LineGraph */}
        <div className='GraphDivTab'>
          <ReactEcharts option={option} style={{width:"100%", height:"80%"}} theme={ChartTheme}/>
          <div className='graphThemeBtnTab' onClick={()=>handleLineGraphTheme()}>
            {
                ChartTheme=="theme1"
                ?(
                  <FaMoon style={{width:"90%", height:"90%", color:"black"}}/>
                )
                :(
                  <BsFillSunFill style={{width:"90%", height:"90%", color:"black"}}/>
                )
              }
          </div>
          <h3 style={{display:"flex", position:"absolute", marginTop:"35vh", marginLeft:"5vw"}}>Line Graph Ash-Flavanoid</h3>
        </div>
              
        <div className='GraphDivTab'>
          <ReactEcharts option={option2} style={{width:"100%", height:"80%"}} theme={ChartTheme}/>
          <div className='graphThemeBtnTab' onClick={()=>handleLineGraphTheme()}>
            {
                ChartTheme=="theme1"
                ?(
                  <FaMoon style={{width:"90%", height:"90%", color:"black"}}/>
                )
                :(
                  <BsFillSunFill style={{width:"90%", height:"90%", color:"black"}}/>
                )
              }
          </div>
          <h3 style={{display:"flex", position:"absolute", marginTop:"35vh", marginLeft:"5vw"}}>Bar Graph Alcohol-Magnesium(Min.)</h3>
        </div>
      </div>
    )
    :(
      <div className='App' style={{backgroundColor:themeColor, width:"100%", height:"100%", paddingTop:"10%"}}>
        <nav className='appNavBar'>
          <h1 style={{fontFamily:"Arial", color:"white"}}>Manufac Analytics</h1>
          <div className='themeBtnTabs' onClick={()=>{handleTheme()}}>
            {
              theme==1
              ?(
                <FaMoon style={{width:"90%", height:"90%"}}/>
              )
              :(
                <BsFillSunFill style={{width:"90%", height:"90%"}}/>
              )
            }
          </div>
        </nav>
        <div className='GraphDivTab' style={{marginTop:"10vh"}}>
          <ReactEcharts option={option} style={{width:"100%", height:"80%"}} theme={ChartTheme}/>
          <div className='graphThemeBtnTab' onClick={()=>handleLineGraphTheme()}>
            {
                ChartTheme=="theme1"
                ?(
                  <FaMoon style={{width:"90%", height:"90%", color:"black"}}/>
                )
                :(
                  <BsFillSunFill style={{width:"90%", height:"90%", color:"black"}}/>
                )
              }
          </div>
          <h6 style={{display:"flex", position:"absolute", marginTop:"35vh", marginLeft:"5vw"}}>Line Graph Ash-Flavanoid</h6>
        </div>
              
        <div className='GraphDivTab'>
          <ReactEcharts option={option2} style={{width:"100%", height:"80%"}} theme={ChartTheme}/>
          <div className='graphThemeBtnTab' onClick={()=>handleLineGraphTheme()}>
            {
                ChartTheme=="theme1"
                ?(
                  <FaMoon style={{width:"90%", height:"90%", color:"black"}}/>
                )
                :(
                  <BsFillSunFill style={{width:"90%", height:"90%", color:"black"}}/>
                )
              }
          </div>
          <h6 style={{display:"flex", position:"absolute", marginTop:"35vh", marginLeft:"5vw"}}>Bar Graph Alcohol-Magnesium(Min.)</h6>
        </div>
      </div>
    )

  );
}

export default App;
