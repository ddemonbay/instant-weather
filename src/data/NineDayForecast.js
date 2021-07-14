import React, { useState } from 'react'

export default function NineDayForecast({promise}) {
    let el
    const [state, setState] = useState({
        1: {
            maxrh: 0,
            maxtemp: 0,
            minrh: 0,
            mintemp: 0
        },
        2: {
            maxrh: 0,
            maxtemp: 0,
            minrh: 0,
            mintemp: 0
        },
        3: {
            maxrh: 0,
            maxtemp: 0,
            minrh: 0,
            mintemp: 0
        },
        4: {
            maxrh: 0,
            maxtemp: 0,
            minrh: 0,
            mintemp: 0
        },
        5: {
            maxrh: 0,
            maxtemp: 0,
            minrh: 0,
            mintemp: 0
        },
        6: {
            maxrh: 0,
            maxtemp: 0,
            minrh: 0,
            mintemp: 0
        },
        7: {
            maxrh: 0,
            maxtemp: 0,
            minrh: 0,
            mintemp: 0
        },
        8: {
            maxrh: 0,
            maxtemp: 0,
            minrh: 0,
            mintemp: 0
        },
        9: {
            maxrh: 0,
            maxtemp: 0,
            minrh: 0,
            mintemp: 0
        },
    })

    return (
        <div>
            {/* {promise.then(data => {
                for (el of data) {
                    console.log(el.forecastMaxrh.value)
                }
            })} */}
            No Forecast Details
        </div>
    )
}
