export const options = {
    chart: {
      animations: { enabled: true },
      toolbar: { show: false },
      width: '100px'
    },
    tooltip: {
      enabled: true,
      theme: false,
      style: {
        fontSize: '12px',
        fontFamily: undefined
      },
      x: {
        show: false,
        format: 'dd MMM',
        formatter: undefined,
      },
      y: {
        show: true,
        title: 'price'
      },
      marker: {
        show: false,
      },
      items: {
        display: 'flex',
      },
      fixed: {
        enabled: false,
        position: 'topRight',
        offsetX: 0,
        offsetY: 0,
      },
    },
    grid: {
      show: true,
      borderColor: '#767F92',
      strokeDashArray: 0
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#25CE8F',
          downward: '#F45353'
        }
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        show: true,
        style: {
          colors: '#767F92',
          fontSize: '14px',
          cssClass: 'apexcharts-xaxis-label',
        },
      }
    },
    yaxis: {
      labels: {
        show: true,
        minWidth: 0,
        maxWidth: 160,
        style: {
          color: '#767F92',
          fontSize: '14px',
          cssClass: 'apexcharts-yaxis-label',
        },
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
      }
    }
  }
  
  export const defaultSeries = []
  
  // Code in the series as a temporary placeholder for demonstration
  
  export const series = [
    {
      data: [
        {
          x: new Date(1000, 1, 1),
          // y: [51.98, 56.29, 51.59, 53.85]
        },
      ]
    }
  ]
  