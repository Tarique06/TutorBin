const Model = require("../model/index");

module.exports = {
  async createTask(req, res) {
    try {
      const { title, description, category } = req.body;
      if (!title || !description || !category)
        return res
          .status(400)
          .json({ success: false, error: "Please fill all fields" });
      const task = new Model.Task({
        title,
        author: req.user._id,
        description,
        category,
      });
      const saveTask = await task.save();
      res
        .status(200)
        .json({ success: true, message: "Task create successfully", saveTask });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  },
  async readTask(req, res) {
    try {
      const task = await Model.Task.find()
        .sort("-createdAt")
        .populate("author", "firstName");
      if (!task || task.length === 0)
        return res
          .status(200)
          .json({ success: true, message: "No task found" });
      res.status(200).json({ success: true, message: "All Tasks", task });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  },
  async searchByCategory(req, res) {
    try {
      const task = await Model.Task.find({ category: req.params.category });
      if (!task || task.length === 0)
        return res
          .status(200)
          .json({ success: false, message: "No task found" });
      res.status(200).json({ success: true, message: "All task", task });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  },
  async editTasks(req, res) {
    try {
      const editTask = await Model.Task.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
      );
      if (!editTask)
        return res
          .status(404)
          .json({ success: false, error: "Task not found" });
      res
        .status(200)
        .json({ success: true, message: "Task update successfully", editTask });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  },
  async deleteTask(req, res) {
    try {
      let taskDelete = await Model.Task.deleteOne({ _id: req.params._id });
      res.status(202).json({
        taskDelete,
        message: "Task Deleted",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  },
};
