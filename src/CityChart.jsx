import { useState } from "react";
import { BarChart } from '@mui/x-charts'

const CityChart = props => {
    // const {allAttendees} = props;
    const {chartData} = props;

    // const getCities = (allAttendees) => {
    //     console.log("allAttendees: ", allAttendees);
    //     if(allAttendees === undefined || allAttendees.length === 0) {
    //         return [];
    //     }
    //     return allAttendees.reduce((counts, item) => {
    //         const property = item.city;
    //         counts[property] = (counts[property] || 0) + 1;
    //         return counts;
    //       }, {});
    // }

    return (
        <>
        
        { chartData != null && Object.keys(chartData).length != 0 &&
            (<div>
                {/* {console.log("getCities: ", getCities(allAttendees))} */}
                <BarChart
                // xAxis={[{ scaleType: 'band', data: Object.keys(getCities(allAttendees)) }]}
                // series={[{ data: Object.values(getCities(allAttendees)), label: "Number of attendees", color: "#ffa621" }]}
                xAxis={[{ scaleType: 'band', data: Object.keys(chartData) }]}
                series={[{ data: Object.values(chartData), label: "Number of attendees", color: "#ffa621" }]}
                height={300}
                />
            </div>)
        }
        </>
    );
}
export default CityChart;