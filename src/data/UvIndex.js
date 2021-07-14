import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Grid } from '@material-ui/core/'

export default function UvIndex({promise}) {
    const [state, setState] = useState({value: ''})

    useEffect(() => {
        promise.then(data => {setState({value: data})})
    }, [])

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
        labels: ["UV Index /10"],
        datasets: [{
          label: 'UV INDEX (MAX: 10)',
          data: [state.value, 10 - state.value],
          backgroundColor: [
            'rgba(75, 192, 192, 0.45)',
            'rgba(0, 0, 0, 0)'
          ],
          borderColor: [
            'rgb(75, 192, 192)',
            'rgb(155, 155, 155)'
          ]
        }],
    }
    

    return (
        <Grid xs={5} sm={2} item>
            <Doughnut data={data} options={options}/>
        </Grid>
    );
}
