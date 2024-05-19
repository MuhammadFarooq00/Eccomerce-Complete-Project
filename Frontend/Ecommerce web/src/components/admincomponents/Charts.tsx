
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

interface Barchartprops{
    horizontal?: boolean;
    data_1: number[];
    data_2: number[];
    title_1: string;
    title_2: string;
    bg_color1: string;
    bg_color2: string;
    labels?: string[];
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',];


export const BarChart = ({horizontal=false, data_1=[],data_2=[],title_1,title_2,bg_color1,bg_color2,labels=months}:Barchartprops) => {

    const options:ChartOptions<'bar'> = {
        responsive: true,
        indexAxis: horizontal? 'y': 'x',
        plugins: {
          legend: {
            display: false,
            // position: 'top' as const,
          },
          title: {
            display: false,
            text: 'Chart.js Bar Chart',
          },
        },
        scales:{
            y:{
            beginAtZero: true,
            grid:{
               display: false,
            }
         },
         x:{
            // beginAtZero: true,
            grid:{
               display: false,
            }
         }
        }
      };
      
      
      const data:ChartData<"bar", number[],string> = {
        labels,
        datasets: [
          {
            label: title_1,
            data: data_1,
            backgroundColor: bg_color1,
            barThickness: 'flex',
            barPercentage: 1,
            categoryPercentage: 0.4,
          },
          {
            label: title_2,
            data: data_2,
            backgroundColor: bg_color2,
            barThickness: 'flex',
            barPercentage: 1,
            categoryPercentage: 0.4,
          },
        ],
      };
  return (<Bar width={horizontal? "200%":''} options={options} data={data} />);

}

interface Doughnutchartprops{
    labels: string[];
    data: number[];
    backgroundColor: string[];
    cutout?: string | number;
    legends?: boolean;
    offset?: number[];
}

export const Doughnutchart = ({labels,data,backgroundColor,cutout,legends=true,offset}: Doughnutchartprops)=>{
    const Dounghnudata: ChartData<'doughnut',number[],string>={
        labels,
        datasets: [
            {
                data,
                backgroundColor,
                borderWidth: 0,
                offset,
            }
        ]
    };
    const DoughnutOption: ChartOptions<'doughnut'> = {
        responsive: true,
        plugins:{
            legend:{
                display: legends,
                position: 'bottom',
                labels:{
                    padding: 40,
                }
            }
        },
        cutout,
    };
    return (<Doughnut data={Dounghnudata} options={DoughnutOption}/>)
}

// pie charts .......................................

interface Piechartprops{
  labels: string[];
  data: number[];
  backgroundColor: string[];
  offset?: number[];
}

export const PieChart = ({labels,data,backgroundColor,offset}: Piechartprops)=>{
  const Piechartdata: ChartData<'pie',number[],string>={
      labels,
      datasets: [
          {
              data,
              backgroundColor,
              borderWidth: 1,
              offset,
          }
      ]
  };
  const PiechartOption: ChartOptions<'pie'> = {
      responsive: true,
      plugins:{
          legend:{
              display: false,
          }
      },
  };
  return (<Pie data={Piechartdata} options={PiechartOption}/>)
}

// Line chart ................................................... 

interface Linechartprops{
  data: number[];
  label: string;
  backgroundColor: string;
  borderColor: string;
  labels?: string[];
}

// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',];


export const LineChart = ({ data,label,backgroundColor,borderColor,labels=months}:Linechartprops) => {

  const linechartoptions:ChartOptions<'line'> = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
          // position: 'top' as const,
        },
        title: {
          display: false,
          text: 'Chart.js Line Chart',
        },
      },
      scales:{
          y:{
          beginAtZero: true,
          grid:{
             display: false,
          }
       },
       x:{
          // beginAtZero: true,
          grid:{
             display: false,
          }
       }
      }
    };
    
    
    const linechartdata:ChartData<"line", number[],string> = {
      labels,
      datasets: [
        {
          fill: true,
          label,
          data,
          backgroundColor,
          borderColor,
        },
      ],
    };
return (<Line  options={linechartoptions} data={linechartdata} />);

}
