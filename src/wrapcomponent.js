import React, { Component } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"

import { connect } from "dva"

import "@fullcalendar/core/main.css"
import "@fullcalendar/daygrid/main.css"
import "@fullcalendar/timegrid/main.css"
import "./wrapcomponent.css"



const repeatMap = [
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "星期日",
]

let matchList = [
    {
        id: "1",
        name: "第一个任务",
        startTime: "2019-12-02 13:22:05",
        endTime: "2019-12-02 15:38:05",
        repeatExecute: false,
    },
    {
        id: "2",
        name: "第二个任务",
        startTime: "2019-12-05 09:45:23",
        endTime: "2019-12-05 15:10:23",
        repeatExecute: false,
    },
    {
        id: "3",
        name: "第三个任务",
        startTime: "2019-12-07 15:37:18",
        endTime: "2019-12-07 19:43:18",
        repeatExecute: false,
    },
    {
        id: "4",
        name: "第四个任务",
        startTime: "2019-12-07 14:49:05",
        endTime: "2019-12-08 03:15:05",
        repeatExecute: false,
    },
]

let repeatMatchList = [
    {
        id: "5",
        name: "每周一，周三重复任务",
        startDate: "2019-12-10", // 任务创建于12月10日
        startTime: "09:10:00", // 每次任务的开始时间
        endTime: "17:30:23", // 每次任务的结束时间
        repeatDates: ["星期一", "星期三"],
        repeatExecute: true,
    },
    {
        id: "6",
        name: "每周二重复任务",
        startDate: "2019-12-02", // 任务创建于12月2日
        startTime: "15:10:00", // 每次任务的开始时间
        endTime: "17:30:23", // 每次任务的结束时间
        repeatDates: ["星期二"],
        repeatExecute: true,
    },
]
class CalendarDemo extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    includes = (arr1, arr2) => {
        return arr2.every((val) => arr1.includes(val))
    }

    formartRepeat = (value) => {
        switch (value) {
            case "星期一":
                value = 1
                break
            case "星期二":
                value = 2
                break
            case "星期三":
                value = 3
                break
            case "星期四":
                value = 4
                break
            case "星期五":
                value = 5
                break
            case "星期六":
                value = 6
                break
            case "星期日":
                value = 0
                break
            default:
                break
        }
        return value
    }

    eventClick = (eventInfo) => {
        console.log(eventInfo)
        console.log(eventInfo.event._def)
    }

    render() {
        matchList &&
            matchList
                .filter((match) => !match.repeatExecute)
                .forEach((item) => {
                    item.title = item.name
                    item.start = item.startTime
                    item.end = item.endTime
                    item.borderColor = "red"
                })
        repeatMatchList &&
            repeatMatchList
                .filter((match) => match.repeatExecute)
                .forEach((item) => {
                    if (this.includes(repeatMap, item.repeatDates)) {
                        item.title = item.name
                        item.borderColor = "black"
                        item.daysOfWeek = []
                        item.startRecur = item.startDate
                        item.repeatDates.forEach((date) => {
                            item.daysOfWeek.push(this.formartRepeat(date))
                        })
                    }
                })
        return (
            <div>
                <FullCalendar
                    defaultView="dayGridMonth"
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    header={{
                        left: "prevYear,prev,next,nextYear today", // 上一年，上一月，下一月，下一年 今天
                        center: "title", // 当前年月
                        right: "dayGridMonth,timeGridWeek,timeGridDay", // 月 周 天
                    }}
                    locale="zh-cn"
                    buttonText={{
                        today: "今天",
                        month: "月",
                        week: "周",
                        day: "天",
                    }}
                    allDayText="全天"
                    firstDay={1}
                    slotLabelFormat={{
                        hour: "2-digit",
                        minute: "2-digit",
                        meridiem: false,
                        hour12: false,
                    }}
                    eventSources={[matchList, repeatMatchList]}
                    displayEventEnd
                    eventTimeFormat={{
                        hour: "2-digit",
                        minute: "2-digit",
                        meridiem: false,
                        hour12: false,
                    }}
                    eventClick={this.eventClick}
                />
            </div>
        )
    }
}

export default connect()(CalendarDemo)