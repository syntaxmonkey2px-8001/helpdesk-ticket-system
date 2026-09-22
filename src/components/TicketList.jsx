import '@/styles/ticket-list.scss'
import tickets from '@/data/mockData.js'

import { useState } from 'react'

function Table() {
    const [activeFilter, setActiveFilter] = useState('All');

    const status = ['All', 'Open', 'In Progress', 'Waiting', 'Resolved', 'Closed'];

    const statusFilters = {
        all: 'All',
        Open: 'Open',
        'In Progress': 'In Progress',
        'Waiting for User': 'Waiting',
        Resolved: 'Resolved',
        Closed: 'Closed'
    };

    const statusClass = {
        all: 'all',
        Open: 'open',
        'In Progress': 'inProgress',
        'Waiting for User': 'waiting',
        Resolved: 'resolved',
        Closed: 'closed'
    };

    const priorityClass = {
        High: 'high',
        Medium: 'medium',
        Low: 'low'
    };

    function changeFilter(value) {
        setActiveFilter(value);
    }

    console.log(activeFilter)

    const filteredTickets = activeFilter === 'All'
        ? tickets
        : tickets.filter((ticket) => statusFilters[ticket.status] === activeFilter);


    const testRowCount = tickets.filter((ticket) => ticket.status === 'Open').length

    console.log('show test count row:  ' + testRowCount);

    //sort tix
    
    //

    return (
        <>
            <div className="filters">
                {status.map((label) => {
                    const isActive = activeFilter === label;
                    const count = label === 'All'
                        ? tickets.length
                        : tickets.filter((ticket) => statusFilters[ticket.status] === label).length;

                    return (
                        <div key={label}>
                            <div
                                className={isActive ? 'filter-pill active' : 'filter-pill'}
                                onClick={() => changeFilter(label)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault();
                                        changeFilter(label);
                                    }
                                }}
                            >
                                <span>{label}</span>
                                <span className="filter-count">{count}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className='ticket-table'>
                <table>
                    <tbody>
                        {filteredTickets.map((ticket) =>
                            <tr key={ticket.id}>
                                <td>{ticket.id}</td>
                                <td>{ticket.title}</td>
                                <td><p className={'status-' + statusClass[ticket.status]}>{ticket.status}</p></td>
                                <td><p className={'priority-' + priorityClass[ticket.priority]}>{ticket.priority}</p></td>
                                <td>{ticket.category}</td>
                                <td>{ticket.assignee}</td>
                                <td>...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
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
    );
}