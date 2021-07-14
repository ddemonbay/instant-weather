import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core/'

export default function CurrentIcon({promise}) {
    const [state, setState] = useState({value: ''})

    useEffect(() => {
        promise.then(data => {setState({value: data})})
    }, [])
    
    let imgLink = `img/${state.value}.png`

    return (
        <Grid item>
            <img src={imgLink}></img>
        </Grid>
    );
}
