import '@/styles/ticket-list.scss'
import tickets from '@/data/mockData.js'

import { useState } from 'react'

function Table() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [sortColumn, setSortColumn] = useState('')
    const [sortDirection, setSortDirection] = useState('');


    const tableHeadings = [
        "id",
        "description",
        "status",
        "priority",
        "category",
        "assignee",
    ]

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

    const priorityValues = [
        { priority: 'High', class: 'high', lookup: 3 },
        { priority: 'Medium', class: 'medium', lookup: 2 },
        { priority: 'Low', class: 'low', lookup: 1 }
    ];

    // FILTERS

    function changeFilter(value) {
        setActiveFilter(value);
    }

    console.log(activeFilter)

    const filteredTickets = activeFilter === 'All'
        ? tickets
        : tickets.filter((ticket) => statusFilters[ticket.status] === activeFilter);

    const testRowCount = tickets.filter((ticket) => ticket.status === 'Open').length

    console.log('show test count row:  ' + testRowCount);
    console.log(priorityValues.priority)

    //sort tix

    //get filtered tix
    // use .sort()

    // const statusLookup = {


    function sortTicket(heading) {

        //check previous clicks
        if (sortColumn === heading) {
            setSortDirection((direction) => direction === 'ascending' ? 'descending' : 'ascending')
        } else {
            //if this is the first click
            setSortColumn(heading)
            setSortDirection('ascending')
        }
    }

        //check if there is sortcolumn at all

        const displayedTickets =
            sortColumn ? [...filteredTickets].sort((a, b) => {

                let comparison;

                if (sortColumn === 'category' || sortColumn === 'assignee') {
                    comparison = a[sortColumn].localeCompare(b[sortColumn])
                } else if (sortColumn === 'priority') {
                    const aPriority = priorityValues.find((priority) => priority.priority === a.priority);
                    const bPriority = priorityValues.find((priority) => priority.priority === b.priority)

                    comparison = aPriority.lookup - bPriority.lookup
                }

                return sortDirection === 'ascending' ? comparison : -comparison
            }
            ) : filteredTickets

    
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
                    <thead>

                        <tr className='property-column'
                        >
                            {tableHeadings.map((heading) =>
                                <th key={heading}
                                    value={heading}
                                    onClick={() => sortTicket(heading)}>
                                    <span>{heading}</span>
                                </th>
                            )}
                        </tr>

                    </thead>
                    <tbody>
                        {displayedTickets.map((ticket) =>
                            <tr key={ticket.id}>
                                <td>{ticket.id}</td>
                                <td>{ticket.title}</td>
                                <td><p className={'status-' + statusClass[ticket.status]}>{ticket.status}</p></td>
                                {priorityValues.map((priority) =>
                                    priority.priority === ticket.priority ? (
                                        <td key={priority.priority}>
                                            <p className={'priority-' + priority.class} >

                                                {ticket.priority}</p>
                                        </td>) : null
                                )}
                                <td>{ticket.category}</td>
                                <td>{ticket.assignee}</td>
                                <td>...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div >
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