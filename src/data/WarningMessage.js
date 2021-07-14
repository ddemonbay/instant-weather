import React, { useState, useEffect } from 'react'
import { Typography, Grid } from '@material-ui/core'

export default function WarningMessage({promise}) {
    const [state, setState] = useState({value: ''})

    useEffect(() => {
        promise.then(data => {setState({value: data})})
    }, [])
    

    return (
        <Grid xs={10} sm={7} item>
            <Typography variant="body1">
                {state.value}
            </Typography>
        </Grid>
    );
}
