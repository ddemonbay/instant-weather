import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Grid } from '@material-ui/core/'

export default function Humidity({promise}) {
    const [state, setState] = useState({value: ''})

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: 'rgb(215, 215, 215)',
                    font: {
                        size: 18,
                    }
                }
            }
        }
    }

    const data = {
        labels: ["Humidity (%)"],
        datasets: [{
          label: 'Humidity (%)',
          data: [state.value, 100 - state.value],
          backgroundColor: [
            'rgba(188, 50, 50, 0.45)',
            'rgba(0, 0, 0, 0)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(155, 155, 155)'
          ]
        }],
    }

    useEffect(() => {
        promise.then(data => {setState({value: data})})
    }, [])
    

    return (
        <Grid xs={5} sm={2} item>
            <Doughnut data={data} options={options}/>
        </Grid>
    );
}
