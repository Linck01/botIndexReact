import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import ReactApexChart from 'react-apexcharts';

const ApexAreaChart = (props) => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const { bet } = props;
    const { navType } = customization;
    const primary = theme.palette.text.primary;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    
    // chart options
    const areaChartOptions = {
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false
            },
        },
        
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'numeric',
            categories: bet.scale_answers.map(a => parseFloat(a.from.$numberDecimal))
        },
        /*tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            }
        },*/
        legend: {
            show: true,
            fontSize: '14px',
            fontFamily: `'Roboto', sans-serif`,
            position: 'bottom',
            offsetX: 10,
            offsetY: 10,
            labels: {
                useSeriesColors: false
            },
            markers: {
                width: 16,
                height: 16,
                radius: 5
            },
            itemMargin: {
                horizontal: 15,
                vertical: 8
            }
        }
    };

    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState(areaChartOptions);

    React.useEffect(() => {
        setSeries([
            {   
            
                name: 'In Pot',
                data: bet.scale_answers.map(a => parseFloat(a.inPot.$numberDecimal))
            },
            {
                name: 'Participants',
                data: bet.scale_answers.map(a => parseFloat(a.memberCount))
            },
        ]);

        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.warning.main, theme.palette.secondary.main],
            xaxis: {
                labels: {
                    style: {
                        colors: [primary, primary, primary, primary, primary, primary, primary]
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [primary]
                    }
                }
            },
            grid: {
                borderColor: navType === 'dark' ? darkLight + 20 : grey200
            },
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            },
            legend: {
                labels: {
                    colors: 'grey.500'
                }
            }
        }));
    }, [navType, theme, bet]);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="area" height={350} />
        </div>
    );
};

export default ApexAreaChart;
