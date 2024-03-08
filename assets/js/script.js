// dark mode
const moonSvg=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.2256 2.00253C9.59172 1.94346 6.93894 2.9189 4.92893 4.92891C1.02369 8.83415 1.02369 15.1658 4.92893 19.071C8.83418 22.9763 15.1658 22.9763 19.0711 19.071C21.0811 17.061 22.0565 14.4082 21.9975 11.7743C21.9796 10.9772 21.8669 10.1818 21.6595 9.40643C21.0933 9.9488 20.5078 10.4276 19.9163 10.8425C18.5649 11.7906 17.1826 12.4053 15.9301 12.6837C14.0241 13.1072 12.7156 12.7156 12 12C11.2844 11.2844 10.8928 9.97588 11.3163 8.0699C11.5947 6.81738 12.2094 5.43511 13.1575 4.08368C13.5724 3.49221 14.0512 2.90664 14.5935 2.34046C13.8182 2.13305 13.0228 2.02041 12.2256 2.00253ZM17.6569 17.6568C18.9081 16.4056 19.6582 14.8431 19.9072 13.2186C16.3611 15.2643 12.638 15.4664 10.5858 13.4142C8.53361 11.362 8.73568 7.63895 10.7814 4.09281C9.1569 4.34184 7.59434 5.09193 6.34315 6.34313C3.21895 9.46732 3.21895 14.5326 6.34315 17.6568C9.46734 20.781 14.5327 20.781 17.6569 17.6568Z" fill="currentColor" /></svg>`
const sunSvg=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M11 0H13V4.06189C12.6724 4.02104 12.3387 4 12 4C11.6613 4 11.3276 4.02104 11 4.06189V0ZM7.0943 5.68018L4.22173 2.80761L2.80752 4.22183L5.6801 7.09441C6.09071 6.56618 6.56608 6.0908 7.0943 5.68018ZM4.06189 11H0V13H4.06189C4.02104 12.6724 4 12.3387 4 12C4 11.6613 4.02104 11.3276 4.06189 11ZM5.6801 16.9056L2.80751 19.7782L4.22173 21.1924L7.0943 18.3198C6.56608 17.9092 6.09071 17.4338 5.6801 16.9056ZM11 19.9381V24H13V19.9381C12.6724 19.979 12.3387 20 12 20C11.6613 20 11.3276 19.979 11 19.9381ZM16.9056 18.3199L19.7781 21.1924L21.1923 19.7782L18.3198 16.9057C17.9092 17.4339 17.4338 17.9093 16.9056 18.3199ZM19.9381 13H24V11H19.9381C19.979 11.3276 20 11.6613 20 12C20 12.3387 19.979 12.6724 19.9381 13ZM18.3198 7.0943L21.1923 4.22183L19.7781 2.80762L16.9056 5.6801C17.4338 6.09071 17.9092 6.56608 18.3198 7.0943Z" fill="currentColor" /></svg>`
const themeBtn=document.querySelector("#themeBtn");

const userTheme=localStorage.getItem("theme");
const systemTheme=window.matchMedia("(prefers-color-scheme:dark)").matches;

const themeCheck=()=>{
    if(userTheme=='dark' || (!userTheme && systemTheme)){
        document.documentElement.classList.add("dark");
        themeBtn.innerHTML=sunSvg;
        return
    }
    themeBtn.innerHTML=moonSvg
}
const themeSwitch=()=>{
    if(document.documentElement.classList.contains("dark")){
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme",'light') 
        themeBtn.innerHTML=moonSvg 
        return 
    }
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme",'dark') 
    themeBtn.innerHTML=sunSvg
}
themeBtn.addEventListener('click',()=>{
    themeSwitch();
})

themeCheck()

const saveTaskBtn=document.querySelector("#saveTask");
const task=document.querySelector("#task");
const taskPriority=document.querySelector("#priority");
const taskContainer=document.querySelector("#taskContainer");
const notFound=document.querySelector("#notFound");
const notFoundText=document.querySelector("#notFoundText");

let editTaskId=null;
let taskArr=[]

// get data into local storage
let localStorageData=localStorage.getItem("userTask");
if(localStorageData !=null){
    if(localStorageData.length > 2 ){
        taskArr=JSON.parse(localStorageData)
    }else{
        taskContainer.classList.remove("grid");
        taskContainer.classList.add("hidden")
        notFound.classList.add("flex");
        notFound.classList.remove("hidden");
        notFoundText.innerHTML="No records has been added yet"
    }
}else{
    taskContainer.classList.remove("grid");
    taskContainer.classList.add("hidden")
    notFound.classList.add("flex");
    notFound.classList.remove("hidden");
    notFoundText.innerHTML="No records has been added yet"
}

// get data from html form
displayTask()
saveTaskBtn.addEventListener("click",()=>{
    const taskValue=task.value;
    const taskPriorityValue=taskPriority.value;
    const timeStamp=new Date();
    const status='uncompleted';
    if(editTaskId!=null){
        taskArr.splice(editTaskId,1,{Task:[taskValue,taskPriorityValue,timeStamp,status]})
    }else{
       
        if(taskValue==""){
            task.style.borderColor="red"
            return
        }
        taskArr.push({Task:[taskValue,taskPriorityValue,timeStamp,status]});
    }

    saveTask(taskArr)
    task.value=''
    taskPriority.value=3
    location.reload();
});

// save data into local storage
const saveTask=(taskArr)=>{
    const strTaskArr=JSON.stringify(taskArr);
    localStorage.setItem('userTask',strTaskArr)
}
// display local storage data 
function displayTask(){
    let taskBody=""
    let count=0
    let cat=""
    let lineThrough=""
    let btnTxt=''
    let btnColor=""
    let svgIcon=``
    taskArr.forEach((taskElem)=>{
        if(taskElem.Task[1]==1){
            cat='high'
        }else if(taskElem.Task[1]==2){
            cat='mid'
        }else{
            cat='low'
        }
        if(taskElem.Task[3]=='completedTask'){
            lineThrough='line-through'
            btnTxt='Remove'
            btnColor="bg-yellow-600 hover:bg-yellow-500"
            svgIcon=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.3394 9.32245C16.7434 8.94589 16.7657 8.31312 16.3891 7.90911C16.0126 7.50509 15.3798 7.48283 14.9758 7.85938L12.0497 10.5866L9.32245 7.66048C8.94589 7.25647 8.31312 7.23421 7.90911 7.61076C7.50509 7.98731 7.48283 8.62008 7.85938 9.0241L10.5866 11.9502L7.66048 14.6775C7.25647 15.054 7.23421 15.6868 7.61076 16.0908C7.98731 16.4948 8.62008 16.5171 9.0241 16.1405L11.9502 13.4133L14.6775 16.3394C15.054 16.7434 15.6868 16.7657 16.0908 16.3891C16.4948 16.0126 16.5171 15.3798 16.1405 14.9758L13.4133 12.0497L16.3394 9.32245Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" fill="currentColor" /></svg>`
        }else{
            lineThrough=''
            btnTxt='Done'
            btnColor="bg-emerald-600 hover:bg-emerald-500"
            svgIcon=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" fill="currentColor" /></svg>`
        }
        let newTimeStamp=new Date(taskElem.Task[2])
        taskBody+=`<div class="shadow rounded pt-3 pb-2 px-3 relative overflow-hidden bg-neutral-50 dark:bg-neutral-900 ${taskElem.Task[3]} ${cat}" id="taskCard">
        <p class="break-words text-neutral-800 mb-2 dark:text-neutral-100 ${lineThrough} " id="textContent">${taskElem.Task[0]}</p>
        <span class="text-sm font-light italic leading-5">${newTimeStamp.toLocaleString('en-IN')}</span>
        <div class="flex items-center justify-end gap-3 mt-2">
            <button class="flex items-center justify-center gap-2 h-10 w-10 rounded text-white ${btnColor}" onclick="statusTask(${count})">
                ${svgIcon}
            </button>
            <button class="flex items-center justify-center gap-2 h-10 w-10 rounded text-white bg-blue-600 hover:bg-blue-500" onclick="editTask(${count})">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.2635 2.29289C20.873 1.90237 20.2398 1.90237 19.8493 2.29289L18.9769 3.16525C17.8618 2.63254 16.4857 2.82801 15.5621 3.75165L4.95549 14.3582L10.6123 20.0151L21.2189 9.4085C22.1426 8.48486 22.338 7.1088 21.8053 5.99367L22.6777 5.12132C23.0682 4.7308 23.0682 4.09763 22.6777 3.70711L21.2635 2.29289ZM16.9955 10.8035L10.6123 17.1867L7.78392 14.3582L14.1671 7.9751L16.9955 10.8035ZM18.8138 8.98525L19.8047 7.99429C20.1953 7.60376 20.1953 6.9706 19.8047 6.58007L18.3905 5.16586C18 4.77534 17.3668 4.77534 16.9763 5.16586L15.9853 6.15683L18.8138 8.98525Z" fill="currentColor" /><path d="M2 22.9502L4.12171 15.1717L9.77817 20.8289L2 22.9502Z" fill="currentColor" /></svg>
            </button>
            <button class="flex items-center justify-center gap-2 h-10 w-10 rounded text-white bg-red-600 hover:bg-red-500"  onclick="deleteTask(${count})">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 6V5C17 3.89543 16.1046 3 15 3H9C7.89543 3 7 3.89543 7 5V6H4C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8H5V19C5 20.6569 6.34315 22 8 22H16C17.6569 22 19 20.6569 19 19V8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H17ZM15 5H9V6H15V5ZM17 8H7V19C7 19.5523 7.44772 20 8 20H16C16.5523 20 17 19.5523 17 19V8Z" fill="currentColor" /></svg>
            </button>
            </div>
        </div>`
    count+=1
    })
    taskContainer.innerHTML=taskBody
}

const title=document.querySelector("#title");
// edit task
function editTask(id){
    editTaskId=id;
    task.value=taskArr[id].Task[0]
    taskPriority.value=taskArr[id].Task[1]
    title.innerHTML="EDIT TASK"
    saveTaskBtn.innerHTML="SAVE TASK"
}

// delete task

function deleteTask(id){
    taskArr.splice(id,1)
    saveTask(taskArr)
    displayTask()
    location.reload();
}

function statusTask(id){
    const timeStamp=new Date();
    const status='uncompleted';
    const status2='completedTask'
    if(taskArr[id].Task[3]=='uncompleted'){
        taskArr.splice(id,1,{Task:[taskArr[id].Task[0],taskArr[id].Task[1],timeStamp,status2]})
    }else{
        taskArr.splice(id,1,{Task:[taskArr[id].Task[0],taskArr[id].Task[1],timeStamp,status]})

    }
    saveTask(taskArr)
    location.reload()
}
// input search
const taskCard=document.querySelectorAll("#taskContainer #taskCard");
const search=document.querySelector("#search");
search.addEventListener("input",(e)=>{
    taskContainer.innerHTML=""
    const searchText=e.target.value.toLowerCase();
    taskCard.forEach(el=>{
        const taskName=el.querySelectorAll("#textContent");
        if(taskName[0].innerHTML.toLowerCase().indexOf(searchText) > -1){
            taskContainer.appendChild(el)
        }
    })
    if(taskContainer.innerHTML==""){
        notFound.classList.add("flex");
        notFound.classList.remove("hidden");
        notFoundText.innerHTML=`We couldn't find any match for "${e.target.value}"`

    }else{
        notFound.classList.remove("flex");
        notFound.classList.add("hidden");
    }
})

// priority filter

const priorityFilter=document.querySelector("#priorityFilter");
priorityFilter.addEventListener("change",(val)=>{
    taskContainer.innerHTML=""
    if(val.target.value=='all'){
        location.reload()
    }else{
        taskCard.forEach(el=>{
            const classArr=new Array(el.classList);
            classArr.forEach(n=>{
                if(n[n.length-1].indexOf(val.target.value) > -1){
                    taskContainer.appendChild(el)
                }
            })
            if(taskContainer.innerHTML==""){
                notFound.classList.add("flex");
                notFound.classList.remove("hidden");
                notFoundText.innerHTML="Not Found"
        
            }else{
                notFound.classList.remove("flex");
                notFound.classList.add("hidden");
            }
        })
    }
})

const statusFilter=document.querySelector("#statusFilter");
statusFilter.addEventListener("change",(val)=>{
    taskContainer.innerHTML=""
    if(val.target.value=='all'){
        location.reload()
    }else{
        if(val.target.value=='all'){
            location.reload()
        }else{
            taskCard.forEach(el=>{
                const classArr=new Array(el.classList);
                classArr.forEach(n=>{
                    if(n[n.length-2].indexOf(val.target.value) > -1){
                        taskContainer.appendChild(el)
                    }
                })
                if(taskContainer.innerHTML==""){
                    notFound.classList.add("flex");
                    notFound.classList.remove("hidden");
                    notFoundText.innerHTML="Not Found"
            
                }else{
                    notFound.classList.remove("flex");
                    notFound.classList.add("hidden");
                }
            })
        }
    }
    
})