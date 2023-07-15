'use client'
import "chart.js/auto";
import { ChartData } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export const PieChart = ({ data }: { data: ChartData<"doughnut", number[]> }) =>
    <Doughnut data={data} options={{
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        }
    }} />