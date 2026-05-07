const express = require("express");

const router = express.Router();

let tasks = [];

router.get("/test", (req, res) => {

  res.json({
    message: "Task route working"
  });

});

router.post("/create", (req, res) => {

  const task = {
    id: Date.now(),
    ...req.body
  };

  tasks.push(task);

  res.json({
    message: "Task created successfully",
    task
  });

});

router.get("/", (req, res) => {

  res.json(tasks);

});

router.put("/:id", (req, res) => {

  const id = parseInt(req.params.id);

  tasks = tasks.map(task =>
    task.id === id
      ? { ...task, ...req.body }
      : task
  );

  res.json({
    message: "Task updated successfully"
  });

});

router.delete("/:id", (req, res) => {

  const id = parseInt(req.params.id);

  tasks = tasks.filter(task => task.id !== id);

  res.json({
    message: "Task deleted successfully"
  });

});

module.exports = router;