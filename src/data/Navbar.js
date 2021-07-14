import React from 'react'
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import NearMeIcon from '@material-ui/icons/NearMe';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'

export default function Navbar({ tab, setTab }) {
    

    function showCurrent() {
        setTab(0)
    }

    function showForecast() {
        setTab(1)
    }

    return (
        <BottomNavigation value={tab} showLabels>
            <BottomNavigationAction onClick={showCurrent} label="Current Weather" icon={<NearMeIcon />} />

            <BottomNavigationAction onClick={showForecast} label="Weather Forecast" icon={<TrendingUpIcon />} />
        </BottomNavigation>
    )
}
