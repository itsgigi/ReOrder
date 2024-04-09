import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
//import { isUserAdmin } from "@/lib/utils";
import { Waiter } from "@/state/types";
import { useGetWaitersQuery } from '@/state/api';
import { Typography } from '@mui/material';

const WaitersTable = () => {
  const { data: waiters, isLoading: isWaitersLoading } = useGetWaitersQuery();
  //let isAdimn = isUserAdmin();

  function calcuteWaiterTot(waiter: Waiter) {
    let tot = 0;

    waiter.workingDates.map((date: Date) => {
        let formatDate = new Date(date);
        let today = new Date()
        if(formatDate.getMonth() === today.getMonth() && formatDate.getFullYear() === today.getFullYear()){
          if(formatDate.getDay() === 0 || formatDate.getDay() === 6) {
              tot = tot + 50;
          } else {
              tot = tot + 40;
          }
        }
    })

    return tot;
  }

  return (
    <div style={{paddingBottom: 14}}>
      {
      //isAdimn && 
      <>
        <Typography style={{fontSize: 16, color: 'black', marginBottom: 8, marginTop: 8}}>Camerieri</Typography>
        <Table style={{border: 1, borderRadius: 4, backgroundColor: 'lightgrey'}}>
          <TableHead style={{backgroundColor: '#4e8098'}}>
            <TableRow>
              <TableCell style={{fontWeight: 600, fontSize: 14}}>Nome</TableCell>
              <TableCell style={{fontWeight: 600, fontSize: 14}}>Tot</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isWaitersLoading && waiters?.map((waiter: Waiter, index) => {
                return  <TableRow key={index}>
                            <TableCell className="font-medium">{waiter.name}</TableCell>
                            <TableCell className="font-medium">{calcuteWaiterTot(waiter)},00 €</TableCell>
                        </TableRow>
            }
            )}
          </TableBody>
        </Table>
      </>
      }
    </div>
  )
}

export default WaitersTable