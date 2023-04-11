const taskList = document.querySelector(".task-menu");
const tasks = document.querySelectorAll(".task-wrapper-menu");

tasks.forEach((task) => {
  task.addEventListener("dragstart", handleDragStart);
  task.addEventListener("dragenter", handleDragEnter);
  task.addEventListener("dragover", handleDragOver);
  task.addEventListener("dragleave", handleDragLeave);
  task.addEventListener("drop", handleDrop);
  task.addEventListener("dragend", handleDragEnd);
});

let draggedTask = null;

function handleDragStart(e) {
  draggedTask = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.outerHTML);

  this.classList.add("dragging");
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  e.dataTransfer.dropEffect = "move";

  return false;
}

function handleDragEnter() {
  this.classList.add("drag-over");
}

function handleDragLeave() {
  this.classList.remove("drag-over");
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();

  if (draggedTask !== this) {
    const allTasks = Array.from(
      taskList.querySelectorAll(".task-wrapper-menu")
    );
    const dragIndex = allTasks.indexOf(draggedTask);
    const dropIndex = allTasks.indexOf(this);

    if (dragIndex < dropIndex) {
      this.insertAdjacentElement("afterend", draggedTask);
      allTasks[dragIndex + 1].insertAdjacentElement("beforebegin", this);
    } else {
      this.insertAdjacentElement("beforebegin", draggedTask);
      allTasks[dragIndex - 1].insertAdjacentElement("afterend", this);
    }

    addDragHandlers(draggedTask);
  }

  return false;
}

function handleDragEnd() {
  this.classList.remove("dragging");
  tasks.forEach((task) => task.classList.remove("drag-over"));
}

export function addDragHandlers(task) {
  task.addEventListener("dragstart", handleDragStart);
  task.addEventListener("dragenter", handleDragEnter);
  task.addEventListener("dragover", handleDragOver);
  task.addEventListener("dragleave", handleDragLeave);
  task.addEventListener("drop", handleDrop);
  task.addEventListener("dragend", handleDragEnd);
}
