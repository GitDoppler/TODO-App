import { updateCount } from "./taskInfo.js";

const listDelete = document.querySelectorAll(".cross");

async function removeTask(deleteButton) {
    const elementID = deleteButton.id;

    const response = await fetch("/home", {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: elementID }),
    })

    const data = await response.json();

    if (data.status === "success") {
        const toRemove = deleteButton.closest(".task-wrapper-menu");

        // Animate the removal of the task
        toRemove.style.transition = 'opacity 0.2s';
        toRemove.style.opacity = "0";
        setTimeout(() => {
            toRemove.remove();

            // Update the counter for unfinished tasks
            const countTasks = document.querySelector(".items");
            countTasks.innerHTML = `${data.count} tasks left`;

        }, 200)
    } else {
        // Handle error on the client side
        console.error('Error deleting task:', data.message);
    }
}

// Check for clicks on the delete icon
for (let i = 0; i < listDelete.length; i++) {
    listDelete[i].addEventListener("click", (e) => {
        removeTask(listDelete[i]);
    });
}


// Export to addEventListener when new task is created
export { removeTask };
