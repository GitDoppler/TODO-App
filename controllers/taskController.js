const Task = require("../models/task");
let count = 0;

const task_index = (req, res) => {
  Promise.all([
    //Run both queries/promises in parallel
    Task.countDocuments({ state: "unfinished" }),
    Task.find(),
  ])
    .then(([number, tasks]) => {
      count = number;
      res.render("index", { title: "My List", tasks: tasks, count: count });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: "error",
        message: "There was an error retrieving the tasks.",
      });
    });
};

const task_create = (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then((result) => {
      count++;
      console.log(count);
      res.json({ status: "success", task: result, count: count });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: "error",
        message: "There was an error creating the task.",
      });
    });
};

const task_delete = (req, res) => {
  const id = req.body.id;
  Task.findByIdAndDelete(id)
    .then((result) => {
      if (result.state === "unfinished") {
        count--;
      }
      res.json({ status: "success", count: count });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "There was an error deleting the task.",
      });
    });
};

const task_updateState = (req, res) => {
  const id = req.body.id;

  Task.findOneAndUpdate(
    { _id: id },
    [
      {
        $set: {
          state: {
            $cond: [{ $eq: ["$state", "finished"] }, "unfinished", "finished"],
          },
        },
      },
    ],
    { new: true } // Returns the updated document
  )
    .then((updatedDoc) => {
      if (updatedDoc) {
        if (updatedDoc.state === "finished") {
          count--;
        } else {
          count++;
        }
        res.json({ status: "success", state: updatedDoc.state, count: count });
      } else {
        res.status(404).json({ status: "error", message: "Task not found." });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "There was an error updating the state of the task.",
      });
    });
};

const clearFinished = (req, res) => {
  Task.deleteMany({ state: "finished" })
    .then((result) => {
      console.log(count - result.deletedCount);
      res.json({ status: "success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: "error",
        message: "There was an error deleting the finished tasks.",
      });
    });
};

module.exports = {
  task_index,
  task_create,
  task_delete,
  task_updateState,
  clearFinished,
};
