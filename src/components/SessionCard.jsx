import { useState } from "react"

export function SessionCard({sessionId, module, patientName, date, ailment}){
    return (
        <>
        <div>
            <div> {patientName} </div>
            <div> {ailment} </div>
            <div> {module} </div>
            <div> {date} </div>
        </div>
        </>
    )
}