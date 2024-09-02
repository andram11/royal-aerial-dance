import React from 'react';
import {Pie} from 'react-chartjs-2'
import {ChartData,  ChartOptions, Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)



  const PieChart: React.FC = ()=> {
    const rootStyle = getComputedStyle(document.documentElement);
        //Chart data
        const data: ChartData<'pie'>= {
            labels: ['Pole Dance', 'Aerial Hoop', 'Yoga', 'Contemporary Dance', 'Heels Dance'],
            datasets: [
                {
                    label: "Revenue per category",
                    data: [10000, 5000, 8000, 3000, 1500],
                    backgroundColor: [
                        rootStyle.getPropertyValue('--primary').trim(),
                        rootStyle.getPropertyValue('--primary-200').trim(),
                        rootStyle.getPropertyValue('--secondary').trim(),
                        rootStyle.getPropertyValue('--secondary-200').trim(),
                        rootStyle.getPropertyValue('--tertiary').trim(),
                    ],
                    borderColor: [
                        rootStyle.getPropertyValue('--primary-100').trim(),
                        rootStyle.getPropertyValue('--primary-200').trim(),
                        rootStyle.getPropertyValue('--secondary').trim(),
                        rootStyle.getPropertyValue('--secondary-200').trim(),
                        rootStyle.getPropertyValue('--tertiary').trim(),
                    ],
                    borderWidth: 1
                }
            ]
        }
        const options: ChartOptions<'pie'> = {
            responsive: true,
            layout: {
                padding: 15
            },
            plugins: {
   
            legend: {
                position: 'top',
                align: 'start'
            },
            tooltip: {
                callbacks: {
                  label: function (context) {
                    const label = context.label || '';
                    const value = context.raw as number;  // Assume it's always a number
                    const formattedValue = new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(value);
          
                    return `${label}: ${formattedValue}`;
                  },
                },
              },
            },
        };

    return (
        <div className='shadow-2xl drop-shadow-xl'>
            <Pie style={{width: '300px', height:'300px'}} data= {data} options={options}/>
        </div>
      )
  }

export default PieChart;