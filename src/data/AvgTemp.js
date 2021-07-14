import React, { useState, useEffect } from 'react'
import { Typography, Grid } from '@material-ui/core'

export default function AvgTemp({promise}) {
    const [state, setState] = useState({value: ''})

    useEffect(() => {
        promise.then(data => {setState({value: data})})
    }, [])
    

    return (
        <Grid item>
            <Typography variant="h3" color="primary">
                {state.value} °C
            </Typography>
        </Grid>
    );
}
