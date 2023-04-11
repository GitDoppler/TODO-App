// Updates the check-state based on current state
async function updateState(element) {
    const elementID = element.id;

    const response = await fetch("/home", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: elementID }),
    })

    const data = await response.json();

    // Obtain the div which contains the objective of the task
    const textTask = element.parentElement.parentElement.children[1];

    if (data.status === "success") {

        // Update the counter for unfinished tasks
        const countTasks = document.querySelector(".items");
        countTasks.innerHTML = `${data.count} tasks left`;

        if (data.state === "finished") {
            element.style.opacity = "1";
            textTask.classList.add("cut");
            textTask.classList.remove("uncut");
        }
        else if (data.state === "unfinished") {
            element.style.opacity = "0";
            textTask.classList.remove("cut");
            textTask.classList.add("uncut");
        }
    } else {
        // Handle error on the client side
        console.error('Error changing state of task:', data.message);
    }
}

// Adds event listeners to all of the check circles
function checkTask() {
    const checkers = document.querySelectorAll(".checked");
    checkers.forEach((checker) => {
        checker.addEventListener("click", () => {
            updateState(checker);
        });
    });
}

// Updates the count based on the amount of tasks currently in HTML page
function updateCount() {
    const taskCount = document.querySelector(".items");
    const tasks = document.querySelectorAll(".task-wrapper-menu");

    taskCount.innerHTML = `${tasks.length} items left`;
}




async function clearFinished() {
    const response = await fetch("/home/clear", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    });

    const data = await response.json();

    if (data.status === "success") {
        console.log("hei");
        const listFinished = document.querySelectorAll(".cut");
        for (let i = 0; i < listFinished.length; i++) {

            const toRemove = listFinished[i].closest(".task-wrapper-menu");

            toRemove.style.transition = 'opacity 0.2s';
            toRemove.style.opacity = "0";
            setTimeout(() => {
                toRemove.remove();
            }, 200);
        }
    } else {
        // Handle the error on the client side
        console.error('Error deleting finished tasks:', data.message)
    }

}


document.querySelector(".clear").addEventListener("click", () => {
    clearFinished();

});


// Event listeners reset when page reset so reapply them when re-rendered
// updateCount();
checkTask();

// Exported so that changes/updates can be done when user adds new task and doesn't reload
export { updateCount, updateState };