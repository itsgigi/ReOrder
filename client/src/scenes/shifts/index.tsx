import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Waiter } from "@/state/types";
import { Typography } from '@mui/material';
import { useGetWaitersQuery } from '@/state/api';
import WaitersTable from './WaitersTable';

const ShiftsTable = () => {
    let dateNum = 1;
    let firstDay = new Date(),
      firstWeekDay;
    let i;
    let lastDate;
    let month = [];
    let week = [];
    firstDay.setDate(1);
    lastDate = new Date(firstDay.getTime());
    lastDate.setMonth(lastDate.getMonth() + 1); // the first day of the next month
    lastDate = new Date(lastDate.getTime() - 86400000); //the first day of the next month minus 1 day
    firstWeekDay = firstDay.getDay();
  
    for (i = 0; i < firstWeekDay; i++) {
      week.push('');
    }
    for (i = firstWeekDay; i < 7; i++) {
      week.push(dateNum++);
    }
    month.push(week);
    
    while (dateNum <= lastDate.getDate()){
      week=[];
      for (i=0; i <7 ;i++){
        if (dateNum <= lastDate.getDate()) {
          week.push(dateNum++);
        } else {
          week.push("");
        }
      }
      month.push(week);
    }

    const daysArray = ['Domenica', 'Lunedi', 'Martedi', 'Mercoledi', 'Giovedi', 'Venerdi', 'Sabato'];
    const { data: waiters, isLoading: isWaitersLoading } = useGetWaitersQuery();

    function getWaiterForDate(day: string | number) {
        const month = firstDay.getMonth();
        let todayWaiters = [''];

        !isWaitersLoading && waiters?.map((waiter: Waiter) => {
            waiter?.workingDates?.map((date: Date) => {
                let formatDate = new Date(date);
                if(formatDate.getDate() === day && formatDate.getMonth() === month) {
                    todayWaiters.push(waiter.name);
                }
            })
        })

        return todayWaiters;
    }

    return (
      <div style={{overflowX: 'scroll', maxWidth: '100%'}}>
        <Typography style={{fontSize: 16, color: 'black', marginBottom: 8}}>Turni mese</Typography>
        <Table style={{border: 1, borderRadius: 4, backgroundColor: 'lightgrey', maxWidth: '50%', overflow: 'hidden'}}>
          <TableHead style={{backgroundColor: '#4e8098'}}>
              <TableRow>
                  { daysArray.map((day) => {
                      return <TableCell key={day} style={{fontWeight: 600, fontSize: 14}}>{day}</TableCell>
                  })
                  }
              </TableRow>
          </TableHead>
          <TableBody>
              {month.map((week, index) => (
              <TableRow key={index}>
                  {week.map((day, index) => {
                      let today = getWaiterForDate(day);
                      
                      return  <TableCell key={index} /* className="font-medium border border-solid align-top w-[100px]" */>
                                  <h4 style={{ display: 'flex', justifyContent: 'center' , fontWeight: 700, border: 'solid #4e8098', borderRadius: 8, width: 20, color: '#4e8098'}}>{day}</h4>
                                  {today.map((todayWaiter: string, index) => {
                                      return <h4 key={index} style={{display: 'flex', flexDirection: 'row-reverse', top: index}}>{todayWaiter}</h4>
                                  })}
                              </TableCell>
                  })}
              </TableRow>
              ))}
          </TableBody>
        </Table>

        <WaitersTable />
      </div>
    );
}

export default ShiftsTable