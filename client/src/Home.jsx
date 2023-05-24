import React, { useEffect, useState } from 'react'
import './Home.css'
import { BigNumber, ethers } from 'ethers';
import {TaskContractAddress} from './config'
import {TaskContactAbi} from   './utils/TaskContract' ;
const Home = () => {
  const [account, setaccount] = useState('');
  const [val,setval]=useState('');
  const [Task,setTask]=useState([])
  const connectWallet=async()=>{
      const {ethereum}=window;
      if(!ethereum){
        console.log("Metamask not detected");
        return alert("metamask not detected");
      }
      else{
        const accounts=await ethereum.request({method:'eth_requestAccounts'});
        setaccount(accounts[0]);
      }
  }
  const getAllTask=async()=>{
    try{
      const {ethereum}=window;
      const provider=new ethers.providers.Web3Provider(ethereum);
      const signer=provider.getSigner();
      const TaskContract=new ethers.Contract(
        TaskContractAddress,
        TaskContactAbi.abi,
        signer
      );
      await TaskContract.getTask().then(res=>setTask(res));
    }
    catch(err){console.log(err);}
  }
  const deleteTask=async(taskId)=>{
    const provider=new ethers.providers.Web3Provider(window.ethereum);
    const signer=provider.getSigner();
    const TaskContract=new ethers.Contract(
      TaskContractAddress,
      TaskContactAbi.abi,
      signer
    );
    await TaskContract.deleteTask(taskId,true).then(res=>{
      setTask([]);
      getAllTask();
    }).catch(err=>console.log(err));
  }
  const AddTask=async()=>{
    let task={
      'taskText':val,
      'isDeleted':false
    }
    try {
      
      const {ethereum}=window;
      if(ethereum){
        const provider=new ethers.providers.Web3Provider(window.ethereum);
        console.log(await provider.getNetwork())
        const signer=provider.getSigner();
        const TaskContract=new ethers.Contract(
          TaskContractAddress,
          TaskContactAbi.abi,
          signer
        )
       await TaskContract.addTask(task.taskText,task.isDeleted).then((res)=>{
       getAllTask();
       }).catch(err=>console.log(err));
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
   connectWallet();
   getAllTask();
  }, [])
   
  return (
    <div >
      <div>
      <h1>Welcome to TODO app</h1>
      </div>
       {account==''?<div>
        <button onClick={connectWallet}>Connect wallet</button>
       </div>:<div>
        <div><h2>Account Connected: {account}</h2></div>
        <div>
          <input type='text' onChange={(e)=>setval(e.target.value)}/>
          <button onClick={AddTask}>Submit</button>
        </div>
       <div>
        {
          Task.map((val,i)=>{
            let a=Number(val.id._hex);

            return (<div key={i}>
              <h2 key={i}>{val.taskText}</h2>
              
              <button onClick={()=>deleteTask(parseInt(a))}>delete</button>
              </div>);
          })
        }
        </div>
        </div>}
        
    </div>
  )
}



export default Home