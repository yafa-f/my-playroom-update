import React from 'react'
import { fatchGetUsers } from '../utils/server'
import { useState ,useEffect} from 'react';
export const  User = () =>{
debugger
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            debugger
            const response = await fatchGetUsers();
            setUsers(response);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);
      console.log(users.data);
  return (
    <div>
     {users?.data?.map(i=><div>{i.userName}</div>)}

    </div>
  )
}



// export const Day = ({dayIndex}) =>{

//     const events = useSelector(getEventList);

//       const next  = (index) => 
//       {
//         var d = new Date;
//         console.log(d);
//         d.setDate(d.getDate() + index)
//         const day =String(d.getDate()).padStart(2, "0");
//         const month=String(d.getMonth()+1).padStart(2, '0');
//         const year=d.getFullYear();
//         const dayOfWeek=d.toLocaleString('default',{weekday:'long'});        
//         d=year+'-'+month+'-'+day;
//         return d;
//     }
//     const e=events.filter(element =>(element.startDate===next(dayIndex)));

//     const myDay  = (index) =>
//     {         
//       var d = new Date;         
//       console.log(d);
//       d.setDate(d.getDate() + index)          
//       const dayOfWeek=d.toLocaleString('default',{weekday:'long'});
//       d=dayOfWeek;
//       return d;
//     }
    
  
//   return <div className='divStyleThree'>
//        <div className='NameDay'>{myDay(dayIndex)}</div>
//        <div className='StyleDay'>{next(dayIndex)}</div>
//        {e.map((currentEvent) => {
//          return <div >
//            {/* <text>{currentEvent.startDate}</text> */}
//            <label className='lab'>Evants:</label><br></br>
//            <text>{currentEvent.title}</text>
//            {/* <br></br>
//            <text>{currentEvent.name}</text>
//            <br></br>
//            <text>{currentEvent.datails}</text>   */}
//          </div>
//        })}
//        </div>
// }      
