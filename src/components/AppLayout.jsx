import TicketDetailView from "@/components/TicketDetailView.jsx";
import TicketList from "@/components/TicketList";
import TopNav from "@/components/TopNav";


export default function AppLayout (){
    return(
        <>
        <TopNav/>
        <TicketList/>
        <TicketDetailView/>
        </>
    )
}