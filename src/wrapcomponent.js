import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";


import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import './wrapcomponent.css';


export default class Home extends React.Component {
    render() {
        return (
            <div>
                <a href='#/'> 回到todo </a>
                {/* <div>行有不得，反求诸己</div>
                <div>测试使用ssh提交</div> */}
                <FullCalendar
                    height={550}
                    defaultView="dayGridMonth"
                    plugins={[dayGridPlugin,timeGridPlugin]}
                    // weekends={false}
                    events={[
                        { title: 'event 1', date: '2019-04-01' },
                        { title: 'event 2', date: '2019-04-02' }
                    ]}
                    header={{
                        left: "prevYear,prev,next,nextYear today", // 上一年，上一月，下一月，下一年 今天
                        center: "title", // 当前年月
                        right: "dayGridMonth,timeGridWeek,timeGridDay" // 月 周 天
                      }}
                    locale='zh-cn'
                    buttonText={{
                        today: '今天',
                        month: '月',
                        week: '周',
                        day: '天'
                      }}
                    allDayText='全天'
                    firstDay={1}
                    slotLabelFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        meridiem: false,
                        hour12: false
                    }}
                />
            </div>
        )
    }
}