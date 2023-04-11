import { removeTask } from "./removeTask.js";
import { updateCount, updateState } from "./taskInfo.js";
import { addDragHandlers } from "./dragTask.js";

async function addTask() {
  const taskInput = document.querySelector(".textbox"); // Select your task input element
  const taskDescription = taskInput.value.trim();

  if (taskDescription) {
    try {
      const response = await fetch("/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: taskDescription, state: "unfinished" }),
      });

      const data = await response.json();

      if (data.status === "success") {
        const taskList = document.querySelector(".task-menu"); // Select your task list element

        // Create task elements
        const taskWrapperMenu = document.createElement("div");
        const task = document.createElement("div");
        const circle = document.createElement("div");
        const checker = document.createElement("div");
        const checkerImg = document.createElement("img");
        const fontTask = document.createElement("div");
        const cross = document.createElement("button");
        const crossImg = document.createElement("img");
        const endDiv = document.querySelector(".task-wrapper-info");

        // Set element attributes and content
        taskWrapperMenu.className = "task-wrapper-menu";
        taskWrapperMenu.draggable = "true";
        taskWrapperMenu.style.opacity = 0;
        task.className = "task";
        circle.className = "circle";
        checker.className = "checked";
        checker.id = `${data.task._id}`;
        checkerImg.src = "/images/icon-check.svg";
        checkerImg.alt = "";
        fontTask.className = "font-task uncut";
        fontTask.textContent = data.task.task;
        cross.className = "cross";
        cross.id = `${data.task._id}`;
        crossImg.src = "/images/icon-cross.svg";
        crossImg.alt = "delete task";

        // Build task structure
        checker.appendChild(checkerImg);
        circle.appendChild(checker);
        task.appendChild(circle);
        task.appendChild(fontTask);
        task.appendChild(cross);
        cross.appendChild(crossImg);
        taskWrapperMenu.appendChild(task);
        taskList.insertBefore(taskWrapperMenu, endDiv);

        // Add dragability to the new task
        addDragHandlers(taskWrapperMenu);

        // Update the counter for unfinished tasks
        const countTasks = document.querySelector(".items");
        countTasks.innerHTML = `${data.count} tasks left`;

        // Add removability to the task
        cross.addEventListener("click", () => {
          removeTask(cross);
        });

        // Add the ability to change state
        checker.addEventListener("click", () => {
          updateState(checker);
        });

        // Animate the opacity of the new task
        setTimeout(() => {
          taskWrapperMenu.style.transition = "opacity 0.2s";
          taskWrapperMenu.style.opacity = 1;
        }, 100);
      } else {
        // Handle error on the client side
        console.error("Error creating task:", data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Clear the input
  taskInput.value = "";
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
});
