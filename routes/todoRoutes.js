const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/home", taskController.task_index);
router.post("/home", taskController.task_create);
router.delete("/home", taskController.task_delete);
router.put("/home", taskController.task_updateState);

router.delete("/home/clear", taskController.clearFinished);

module.exports = router;
