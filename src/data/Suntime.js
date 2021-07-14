import React, { useState, useEffect } from 'react'
import { Typography, Grid, Switch, FormControlLabel } from '@material-ui/core'

export default function AvgTemp({sunUp, sunSet}) {
    const [state, setState] = useState({sunUp: '', sunSet: ''})

    useEffect(() => {
        sunSet.then(data => {
            setState(prevState => {
                return {...prevState, sunSet: data}
            })
        })
        sunUp.then(data => {
            setState(prevState => {
                return {...prevState, sunUp: data}
            })
        })
    }, [])

    useEffect(() => {
        
    }, [state])

    return (
        
        <Grid flexDirection="column" container>
            
            <Grid alignItems="center" justifyContent="center" container>
                <Typography variant="h5">Sun Set Time:&nbsp;</Typography>
                <Typography variant="h4" color="secondary">{state.sunSet}</Typography>
            </Grid>
            <Grid alignItems="center" justifyContent="center" container>
                <Typography variant="h5">Sun Up Time:&nbsp;</Typography>
                <Typography variant="h4" color="secondary">{state.sunUp}</Typography>
            </Grid>
            {/* <FormControlLabel control={<Switch />} label="SunUp">

            </FormControlLabel> */}
            
        </Grid>
    );
}
