'use client'
import "chart.js/auto";
import { ChartData } from "chart.js";
import { Line } from "react-chartjs-2";


export const LineGraph = ({ data }: { data: ChartData<"line", (number | [number, number])[]> }) =>
    <Line data={data} options={{
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    display: false
                },
                grid: {
                    display: false
                }
            },
            y: {
                ticks: {
                    color: "#7479B1"
                }
            }
        },
        elements: {
            line: {
                borderColor: "#8C71F4",
                backgroundColor: "rgba(139, 113, 244, 0.40)"
            },
            point: {
                borderColor: "#4ADE80",
                backgroundColor: "#4ADE80"
            }
        }
    }} />