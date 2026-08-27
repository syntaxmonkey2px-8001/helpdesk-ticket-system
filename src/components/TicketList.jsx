import '@/styles/ticket-list.scss'
import tickets from '@/data/mockData.js'

import { useState } from 'react'

function Table() {
    const [activeFilter, setActiveFilter] = useState('all');

    const status = ['All', 'Open', 'In Progress', 'Waiting', 'Resolved', 'Closed'
    ]

    const statusFilters = {
        all: 'All',
        Open: 'Open',
        'In Progress': 'In Progress',
        'Waiting for User': 'Waiting',
        Resolved: 'Resolved',
        Closed: 'Closed'
    }

    // const statusClass = {
    //     all: 'all',
    //     Open: 'open',
    //     'In Progress': 'inProgress',
    //     'Waiting for User': 'waiting',
    //     Resolved: 'resolved',
    //     Closed: 'closed'
    // }

    function changeFilter(status) {
        setActiveFilter(status)
    }

    console.log(activeFilter)

    const filteredTickets = activeFilter !== 'All'
        ? tickets.filter((ticket) => statusFilters[ticket.status] === activeFilter)
        : tickets;


    return (
        <>
            <div className="filters">
                {status.map((status) =>
                    <div key={status} >
                        <div onClick={() => changeFilter(status)} >{status}</div>
                    </div>
                )}
            </div>
            <div className='ticket-table'>
                <table>
                    <tbody >
                        {filteredTickets.map((ticket) =>
                            <tr
                                key={ticket.id}
                            // className={statusClass[ticket.status] == activeFilter ? 'active' : ''


                            >
                                <td>{ticket.id}</td>
                                <td>{ticket.title}</td>
                                <td>{ticket.status}</td>
                                <td>{ticket.category}</td>
                                <td>{ticket.assignee}</td>
                                <td>...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div >
        </>
    )
}

export default function TicketList() {

    return (
        <>
            <div className="ticket-list-view">
                <div className="tabs">
                    <div>All Tickets</div>
                    <div>My Queue</div>
                    <div>Unassigned</div>
                    <div>Reports</div>
                </div>
                <Table />
            </div>
        </>
    )
}