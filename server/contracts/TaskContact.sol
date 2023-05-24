// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;


contract TaskContract {
    event  AddTask(address recipient, uint taskId );
    event  DeleteTask(uint TaskId,bool isDeleted);
    struct Task{
        uint id;
        string taskText;
        bool isDeleted;
    }
    Task[] private tasks;
    mapping (uint256 => address) taskToOwner;
    

    function addTask(string memory taskText,bool isDeleted) external{
        uint taskId=tasks.length;
        tasks.push(Task(taskId,taskText,isDeleted));
        taskToOwner[taskId]=msg.sender;
        emit AddTask(msg.sender,taskId);
    }
    function getTask() external view returns  (Task[] memory){
        Task[] memory temp=new Task[](tasks.length);
        uint c=0;
         for(uint i=0;i<tasks.length; i++){
            if(taskToOwner[i]==msg.sender && tasks[i].isDeleted==false){
                temp[c]=tasks[i];
                c++;
            }
            
         }
         Task[] memory ans=new Task[](c);
            for(uint i=0;i<c;i++){
                ans[i]=temp[i];
            }
            return ans;
        
    }
     function deleteTask (uint taskId,bool isDeleted) external{
            if(taskToOwner[taskId]==msg.sender){
                tasks[taskId].isDeleted=isDeleted;
                emit DeleteTask(taskId,isDeleted);  
            }

         } 
}
