import React from 'react'
import { Line, Doughnut, Bar, Radar, Polar } from "react-chartjs-2";

export default function Chart(params) {
  const dataLine = {
    labels: params.label,
    datasets: [
      {
        label: '',
        data: params.datos,
        fill: true,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
      },
    ],
  }

  const data = {
    labels: params.label,
    datasets: [
      {
        label: "",
        data: params.datos,
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div >{
      params.line ?
        <Line
          data={dataLine}
          options={{
            title: {
              display: params.titulo,
              text: params.titulo
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }} /> :
        null
    }
      {
        params.doughnut ?
          <Doughnut
            data={data}
            options={{
              title: {
                display: params.titulo,
                text: params.titulo
              }
            }}
          /> :
          null
      }
      {
        params.bar ?
          <Bar
            data={data}
            options={{
              title: {
                display: params.titulo,
                text: params.titulo
              },
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                  },
                }],
              },
            }} /> :
          null
      }
      {
        params.radar ?
          <Radar
            data={data}
            options={{
              title: {
                display: params.titulo,
                text: params.titulo
              },
              scale: {
                ticks: { beginAtZero: true },
              },
            }} /> :
          null
      }
      {
        params.polar ?
          <Polar
            data={data}
            options={{
              title: {
                display: params.titulo,
                text: params.titulo
              },
              scale: {
                ticks: { beginAtZero: true },
              },
            }} /> :
          null
      }
    </div>
  )
}