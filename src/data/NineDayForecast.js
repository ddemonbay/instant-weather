import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'


const data = {
    labels: ["","","","","","",""],
    datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
}

export default function NineDayForecast({promise}) {
    let el
    // promise.then(data => {console.log(data)})
    const [state, setState] = useState([])
    // maxrh: 0, maxtemp: 0,minrh: 0, mintemp: 0

    useEffect(() => {
        promise.then(data => {
            let days = []
            for (let day of data) {
                console.log(day)
                days = [...days, {
                    date: day.forecastDate,
                    week: day.week,
                    forecastWeather: day.forecastWeather,
                    icon: day.ForecastIcon,
                    maxrh: day.forecastMaxrh.value,
                    minrh: day.forecastMinrh.value,
                    maxtemp: day.forecastMaxtemp.value,
                    mintemp: day.forecastMintemp.value,
                }]
            }
            setState(days)
        })
    }, [])

    return (
        <div>
            <Line data={data} />
            {state[1].mintemp}
            No Forecast Details
        </div>
    )
}
