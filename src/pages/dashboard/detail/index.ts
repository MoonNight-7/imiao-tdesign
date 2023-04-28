import dayjs from 'dayjs';
import { getChartListColor } from '@/utils/color';
import { getDateArray, getRandomArray } from '@/utils/charts';

/**
 * 散点图数据
 *
 * @export
 * @returns {any[]}
 */
export function getScatterDataSet({
  dateTime = [],
  placeholderColor,
  borderColor,
}: { dateTime?: Array<string> } & Record<string, string>): any {
  const divideNum = 40;
  const timeArray = [];
  const inArray = [];
  const outArray = [];
  for (let i = 0; i < divideNum; i++) {
    // const [timeArray, inArray, outArray] = dataset;
    if (dateTime.length > 0) {
      const dateAbsTime: number = (new Date(dateTime[1]).getTime() - new Date(dateTime[0]).getTime()) / divideNum;
      const endTime: number = new Date(dateTime[0]).getTime() + dateAbsTime * i;
      timeArray.push(dayjs(endTime).format('MM-DD'));
    } else {
      timeArray.push(
        dayjs()
          .subtract(divideNum - i, 'day')
          .format('MM-DD'),
      );
    }

    inArray.push(getRandomArray().toString());
    outArray.push(getRandomArray().toString());
  }

  return {
    color: getChartListColor(),
    xAxis: {
      data: timeArray,
      axisLabel: {
        color: placeholderColor,
      },
      splitLine: { show: false },
      axisLine: {
        lineStyle: {
          color: borderColor,
          width: 1,
        },
      },
    },
    yAxis: {
      type: 'value',
      // splitLine: { show: false},
      axisLabel: {
        color: placeholderColor,
      },
      nameTextStyle: {
        padding: [0, 0, 0, 60],
      },
      axisTick: {
        show: false,
        axisLine: {
          show: false,
        },
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: borderColor,
        },
      },
    },
    tooltip: {
      trigger: 'item',
    },
    grid: {
      top: '5px',
      left: '25px',
      right: '5px',
      bottom: '60px',
    },
    legend: {
      left: 'center',
      bottom: '0',
      orient: 'horizontal', // legend 横向布局。
      data: ['布偶猫', '英短'],
      itemHeight: 8,
      itemWidth: 8,
      textStyle: {
        fontSize: 12,
        color: placeholderColor,
      },
    },
    series: [
      {
        name: '布偶猫',
        symbolSize: 10,
        data: outArray.reverse(),
        type: 'scatter',
      },
      {
        name: '英短',
        symbolSize: 10,
        data: inArray.concat(inArray.reverse()),
        type: 'scatter',
      },
    ],
  };
}

/** 折线图数据 */
export function getFolderLineDataSet({
  dateTime = [],
  placeholderColor,
  borderColor,
}: { dateTime?: Array<string> } & Record<string, string>) {
  let dateArray: Array<string> = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  if (dateTime.length > 0) {
    const divideNum = 7;
    dateArray = getDateArray(dateTime, divideNum);
  }
  return {
    color: getChartListColor(),
    grid: {
      top: '5%',
      right: '10px',
      left: '30px',
      bottom: '60px',
    },
    legend: {
      left: 'center',
      bottom: '0',
      orient: 'horizontal', // legend 横向布局。
      data: ['暹罗猫', '茶杯猫', '困困猫', '奇怪的猫咪'],
      textStyle: {
        fontSize: 12,
        color: placeholderColor,
      },
    },
    xAxis: {
      type: 'category',
      data: dateArray,
      boundaryGap: false,
      axisLabel: {
        color: placeholderColor,
      },
      axisLine: {
        lineStyle: {
          color: borderColor,
          width: 1,
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: placeholderColor,
      },
      splitLine: {
        lineStyle: {
          color: borderColor,
        },
      },
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        name: '暹罗猫',
        stack: '总量',
        data: [
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
        ],
        type: 'line',
        itemStyle: {
          normal: {
            borderColor,
            borderWidth: 1,
          },
        },
      },
      {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        name: '茶杯猫',
        stack: '总量',
        data: [
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
        ],
        type: 'line',
        itemStyle: {
          normal: {
            borderColor,
            borderWidth: 1,
          },
        },
      },
      {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        name: '困困猫',
        stack: '总量',
        data: [
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
        ],
        type: 'line',
        itemStyle: {
          normal: {
            borderColor,
            borderWidth: 1,
          },
        },
      },
      {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        name: '奇怪的猫咪',
        stack: '总量',
        data: [
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
        ],
        type: 'line',
        itemStyle: {
          normal: {
            borderColor,
            borderWidth: 1,
          },
        },
      },
    ],
  };
}
