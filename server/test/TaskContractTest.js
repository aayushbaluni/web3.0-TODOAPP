const {expect}=require('chai');
const  hre= require( "hardhat");

describe("Task Contract", function(){
    let TaskContract ;
    let taskContract;
    let owner;
    
    const NUM_TOTAL_TASK=5;
    let totalTask;
    this.beforeEach(async function(){
    TaskContract=await hre.ethers.getContractFactory("TaskContract");
    taskContract=await TaskContract.deploy();
        [owner]=await ethers.getSigners();
        totalTask=[];


        for(let i=0;i<NUM_TOTAL_TASK;i++){
            let task={
                'taskText':"Task number : "+i,
                "isDeleted":false
            };
            await taskContract.addTask(task.taskText,task.isDeleted);
            totalTask.push(task);
        }
        
    });


    describe("Add Task",function(){
        it("should emit AddTask event",async function(){
            let task={
                'taskText':"New Task",
                'isDeleted':false,
            };
            await expect(await taskContract.addTask(task.taskText,task.isDeleted)).to.emit(taskContract,"AddTask").withArgs(owner.address,NUM_TOTAL_TASK);
        });
    });
    describe("Get All tasks",function(){
        it("Should return the correct number of total tasks",async function(){
            const tasksFromChain=await taskContract.getTask();
            expect(tasksFromChain.length).to.equal(NUM_TOTAL_TASK); 
        });
    });
    describe("Delete Task",function(){
        it("Should emit deleteTask event",async function(){
            const taskid=0;
            const taskD=true;


            await expect(taskContract.deleteTask(taskid,taskD)).to.emit(taskContract,"DeleteTask").withArgs(taskid,taskD);
        })
    })
})