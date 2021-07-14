import React from 'react'
import AvgTemp from './AvgTemp';
import CurrentIcon from './CurrentIcon';
import WarningMessage from './WarningMessage';
import UvIndex from './UvIndex';
import Humidity from './Humidity';
import Suntime from './Suntime';
import GeneralSituation from './GeneralSituation';
import { Container, Grid, Typography } from '@material-ui/core/'
import NineDayForecast from './NineDayForecast.js'

export default function Content({ tab }) {
    const date = new Date()
    const currentYear = date.getFullYear()
    const currentMonth = date.getMonth() + 1
    const currentDay = date.getDate()
    const currentDayOfWeek = date.getDay()

    let weatherForecastQuery = {
        dataType: "fnd",
        lang: "en"
    }
  
    let currentWeatherQuery = {
        dataType: "rhrread",
        lang: "en"
    }
  
    let sunQuery = { // no station param
        dataType: "SRS",
        rformat: "json",
        station: "",
        lang: "en",
        year: currentYear.toString(),
        month: currentMonth.toString(),
        day: currentDay.toString()
    }
  
    let visibilityQuery = { // no station, year, month, day params
        dataType: "LTMV",
        rformat: "json",
        station: "",
        lang: "en",
        year: "",
        month: "",
        day: ""
    }
  
    // get data part of the requested json values
  
    function requestWeatherInformationApi(query) {
        let url = `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=${query.dataType}&lang=${query.lang}`
        return fetch(url).then(res => res.json())
    }
  
    function requestOpenDataApi(query) {
        let url = `https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=${query.dataType}&lang=${query.lang}&rformat=${query.rformat}&station=${query.station}&year=${query.year}&month=${query.month}&day=${query.day}`
        return fetch(url).then(res => res.json()).then(data => {return data.data})
    }
  
    // get latest 10 min avg visibility 
  
    function getAvgVisibility() {
        let rangeNum = 0, rangeSum = 0
        let regex = /[0-9]/g // all occurence of number
        let details
        return requestOpenDataApi(visibilityQuery).then(data => {
            for (details of data) { // values can be "xxkm" or "N/A"
                if (details[2] != "N/A") {
                    rangeNum += 1
                    rangeSum += parseInt(details[2].match(regex).join(""))
                }
            }
            return rangeSum/rangeNum // cal avg with km unit
        })
    }
  
    function getSunUp() {
        return requestOpenDataApi(sunQuery).then(data => {return data[0][1]})
    }
  
    function getSunSet() {
        return requestOpenDataApi(sunQuery).then(data => {return data[0][3]})
    }
  
    function getCurrentIcon() { // return a list of icons
        return requestWeatherInformationApi(currentWeatherQuery).then(data => {return data.icon})
    }
  
    function getWarningMessage() { // return a list of warning messages
        return requestWeatherInformationApi(currentWeatherQuery).then(data => {return data.warningMessage})
    }
  
    function getUvIndex() {
        return requestWeatherInformationApi(currentWeatherQuery).then(data => {
          if (data.uvindex.data == null) {
            return 0
          } else {
            return data.uvindex.data[0].value
          }
        })
    }

    function getHumidity() { // return persentage value
        return requestWeatherInformationApi(currentWeatherQuery).then(data => {return data.humidity.data[0].value})
    }
    
    function getAvgTemp() {
        return requestWeatherInformationApi(currentWeatherQuery).then(data => {
            let countNum = 0, totalTemp = 0
            let value, avgTemp
            for (value of data.temperature.data) {
                countNum += 1
                totalTemp += value.value
            }
            avgTemp = totalTemp / countNum
            return Number.parseFloat(avgTemp).toPrecision(3)
        })
    }

    function getGeneralSituation() {
        return requestWeatherInformationApi(weatherForecastQuery).then(data => {
            return data.generalSituation
        })
    }

    function getNineDayForecast() {
        return requestWeatherInformationApi(weatherForecastQuery).then(data => {
            return data.weatherForecast
        })
    }

    return (
        <Grid alignItems="center" style={{display: 'flex', height: '70vh', marginTop: '50px'}} container>
            <Container maxWidth="md">
                <Grid
                    justifyContent="center"
                    alignItems="center"
                    direction="column"
                    spacing={9}
                    container
                >
                    <Grid item>
                        <Grid direction="column" alignItems="center" container>
                            <Typography variant="h3">
                                Hong Kong
                            </Typography>
                            <Typography variant="h4">
                                {tab == 0 ? "Current Weather" : "9 day Weather Forecast"}
                            </Typography>
                        </Grid>
                    </Grid>

                    {tab == 0 ?
                    <Grid direction="column" justifyContent="center" alignItems="center" container>
                        <Grid justifyContent="space-evenly" alignItems="center" container>
                            <AvgTemp promise={getAvgTemp()} />
                            <CurrentIcon promise={getCurrentIcon()} />
                        </Grid>
                    </Grid>
                    :
                    <NineDayForecast promise={getNineDayForecast()} />
                    }
                    

                    {tab == 0 ?
                    <WarningMessage promise={getWarningMessage()} />
                    :
                    <GeneralSituation promise={getGeneralSituation()} />
                    }

                    {tab == 0 ?
                    <>
                        <Grid justifyContent="space-evenly" alignItems="center" container>
                            <Humidity promise={getHumidity()} />
                            <UvIndex promise={getUvIndex()} />
                        </Grid>

                        <Grid item>
                            <Suntime sunUp={getSunUp()} sunSet={getSunSet()} />
                        </Grid>   
                    </>
                    : 
                    null
                    }
                </Grid>
            </Container>
        </Grid>
    )
}
