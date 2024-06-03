import axios from "axios";

//HELPER FUNCTION
export function storeTicket(ticketData){
    axios.post('https://authotp-88578-default-rtdb.asia-southeast1.firebasedatabase.app/newTicketData.json');
    ticketData
}