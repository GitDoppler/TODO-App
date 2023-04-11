const taskMenu = document.querySelector(".task-menu");

//---Filter text color---
function resetActive(element1,element2,element3){
    for(let i=0;i<element1.length;i++){
        element1[i].classList.add("active");
        element2[i].classList.remove("active");
        element3[i].classList.remove("active");
    }
}


//---Filter active---
const filtersActive = document.querySelectorAll(".filter-active");
for(let i=0;i<filtersActive.length;i++){
    filtersActive[i].addEventListener("click",()=>{
        resetActive(filtersActive,filtersAll,filtersComplete);
        renderActive();
    });
}

function renderActive(){
    // Query the page for tasks (in case of update to task state, it updates the lists)
    const unfinishedTasks = document.querySelectorAll(".uncut");
    const finishedTasks = document.querySelectorAll(".cut");
    
    // Add animation to the task list
    taskMenu.style.transition = 'opacity 0.2s';
    taskMenu.style.opacity = "0";

    // Hide finished tasks after animation complete
    setTimeout(()=>{
        for(let j=0;j<unfinishedTasks.length;j++){
            unfinishedTasks[j].closest(".task-wrapper-menu").style.display="block";
        }
        for(let j=0;j<finishedTasks.length;j++){
            finishedTasks[j].closest(".task-wrapper-menu").style.display="none";
        }
        taskMenu.style.opacity = "1";
    },200);
}


//---Filter all---
const filtersAll = document.querySelectorAll(".filter-all");
for(let i=0;i<filtersAll.length;i++){
    filtersAll[i].addEventListener("click",()=>{
        resetActive(filtersAll,filtersActive,filtersComplete);
        renderAll();
    });
}

function renderAll(){
    const tasks = document.querySelectorAll(".task-wrapper-menu");

    // Add animation to the task list
    taskMenu.style.transition = 'opacity 0.2s';
    taskMenu.style.opacity = "0";

    // Show all tasks after animation complete
    setTimeout(()=>{
        for(let j = 0;j<tasks.length;j++){
            if(tasks[j].style.display === "none"){
                tasks[j].style.display="block";
            }
        }
        taskMenu.style.opacity = "1";
    },200);
    
}


//---Filter completed---
const filtersComplete = document.querySelectorAll(".filter-completed");

for(let i=0;i<filtersComplete.length;i++){
    filtersComplete[i].addEventListener("click",()=>{
        resetActive(filtersComplete,filtersAll,filtersActive);
        renderCompleted();
    });
}

function renderCompleted(){
    // Query the page for tasks (in case of update to task state, it updates the lists)
    const unfinishedTasks = document.querySelectorAll(".uncut");
    const finishedTasks = document.querySelectorAll(".cut");

    // Add animation to the task list
    taskMenu.style.transition = 'opacity 0.2s';
    taskMenu.style.opacity = "0";

    // Hide unfinished tasks after animation complete
    setTimeout(()=>{
        for(let j=0;j<finishedTasks.length;j++){
            finishedTasks[j].closest(".task-wrapper-menu").style.display="block";
        }
        for(let j=0;j<unfinishedTasks.length;j++){
            unfinishedTasks[j].closest(".task-wrapper-menu").style.display="none";
        }
        taskMenu.style.opacity = "1";
    },200);
}