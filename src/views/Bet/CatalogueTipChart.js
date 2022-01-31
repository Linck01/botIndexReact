import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import useColors from '../../hooks/useColors';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const polarChartOptions = {
    chart: {
        width: 450,
        height: 450,
        type: 'polarArea'
    },
    fill: {
        opacity: 1
    },
    legend: {
        show: true,
        fontSize: '14px',
        fontFamily: `'Roboto', sans-serif`,
        offsetX: 10,
        offsetY: 10,
        labels: {
            useSeriesColors: false
        },
        markers: {
            width: 12,
            height: 12,
            radius: 5
        },
        itemMargin: {
            horizontal: 25,
            vertical: 4
        }
    },
    responsive: [
        {
            breakpoint: 450,
            chart: {
                width: 280,
                height: 280
            },
            options: {
                legend: {
                    show: false,
                    position: 'bottom'
                }
            }
        }
    ]
};

//-----------------------|| POLAR CHART ||-----------------------//

const ApexPolarChart = (props) => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const { answerColors } = useColors();
    const { navType } = customization;
    const { bet } = props;
    const primary = theme.palette.text.primary;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const backColor = theme.palette.background.paper;
    const [series] = useState(bet.catalogue_answers.map((a) => a.inPot.$numberDecimal));
    const [options, setOptions] = useState(polarChartOptions);

    

    React.useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: answerColors,
            xaxis: {
                labels: {
                    style: {
                        colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, ]
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
            legend: {
                show: false,
                labels: {
                    colors: 'grey.500'
                },
                customLegendItems: bet.catalogue_answers.map((a) => a.title),
            },
            labels: bet.catalogue_answers.map((a) => a.title),
            stroke: {
                colors: [backColor]
            },
            plotOptions: {
                polarArea: {
                    rings: {
                        strokeColor: navType === 'dark' ? darkLight + 20 : grey200
                    },
                    spokes: {
                        connectorColors: navType === 'dark' ? darkLight + 20 : grey200
                    }
                }
            }
        }));
    }, [navType]);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="polarArea" />
        </div>
    );
};

export default ApexPolarChart;
