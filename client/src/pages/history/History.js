import {Fragment} from 'react'
import './History.css'
export default function History() {
    return (
        <Fragment>
        <div className="container" style={{alignItems: 'center'}}>
        <div className="container d-flex justify-content-center farm-minning__first p-4 my-4">
         <div className="container">
             <h1 className="m-3" >
                 Winner
             </h1>
             <div className="container  d-flex flex-row">
             <img className="mx-2 p-2 border border-primary" src="https://www.mobox.io/momo/img/MBOX.870623db.png" alt="create" height="50" style={{borderRadius:"14px",borderWidth:"4px"}}/>
                 <p className="text-left mx-3 my-auto">User<br/>Address</p>
                 <p className="text-right mx-3 my-auto">0 Box<br/>Daily Distribution</p>
             </div>
         </div>
 
         <hr style={{ border:"none",borderLeft:"1px solid hsla(200, 10%, 50%,100)",height:"100px",width:"1px"}}/>
         <div className="container">
             <h1 className="m-3" >
                 Loser
             </h1>
             <div className="container  d-flex flex-row">
             <img className="mx-2 p-2 border border-primary" src="https://www.mobox.io/momo/img/MBOX.870623db.png" alt="create" height="50" style={{borderRadius:"14px",borderWidth:"4px"}}/>
                 <p className="text-left mx-3 my-auto">User<br/>Address</p>
                 <p className="text-right mx-3 my-auto">0 Box<br/>Daily Distribution</p>
             </div>
         </div>
 
         </div>

 
 
 
 
         <div className="container d-flex justify-content-center farm-minning__first p-4 my-4">
         <div className="container">
             <p className="m-3" >
                 Total Hash Power
             </p>
             <div class="input-group input-group-sm mb-3">
   <input type="text" class="form-control mx-3 mb-4" placeholder="0" aria-label="Username" aria-describedby="basic-addon1" style={{maxWidth:"450px"}}/>
 </div>
 
 <p className="m-3" >
                 My Hash Power
             </p>
             <div class="input-group input-group-sm mb-3">
   <input type="text" class="form-control mx-3 mb-4" placeholder="0" aria-label="Username" aria-describedby="basic-addon1" style={{maxWidth:"450px"}}/>
 </div>
 
         </div>
         
                <div className="container">
         
             <p className="m-3" >
                 Mining Rate
             </p>
             <div className=" container d-flex flex-row">
                 <div className="container farm-minning__third p-3">
                     <small>100 Hash Power≈0 MBOX/DAY</small><br/>
                     <div className="container  d-flex flex-row">
             <img className="mx-2 p-2" src="https://www.mobox.io/momo/img/MBOX.870623db.png" alt="create" height="50"/>
                 <p className="text-left mx-3 my-auto">MBOX</p>
 
             </div>
 
             
                 </div>
 
                 <div className=" farm-minning__third container mx-2 p-3">
                     <small >100 Hash Power≈0 MBOX/DAY</small><br/>
                     <div className="container  d-flex flex-row ">
             <img className="mx-2 p-2" src="https://www.mobox.io/momo/img/BANANA.b3d26a33.png" alt="create" height="50"/>
                 <p className="text-left mx-3 my-auto">MBOX</p>
 
             </div>
 
             
                 </div>
                 
             </div>
 
             <div className="container my-4 farm-minning__third__button">
             <button className="btn btn-primary m-2 px-4 py-3 text-center">Claim</button>
             </div>
         </div>
 
 
         </div>
        </div>
     </Fragment>
    )
}
