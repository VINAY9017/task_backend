const taskModel = require("../Model/taskModel");

exports.getTasks = async (request, response) => {
  try {
    const dbRes = await taskModel.find().sort({ dueDate: 1 });
    if (dbRes) {
      return response.status(200).json({
        status: "success",
        message: "get succcessfully",
        data: dbRes,
      });
    }
  } catch {
    response.status(500).json({
      status: "failed",
      message: "failed to get",
    });
  }
};

exports.getTaskById = async (request, response) => {
  try {
    const dbRes = await taskModel.findById(request.params.id);
    if (!dbRes) {
      return response.status(404).json({
        status: "failed",
        message: "Task not found",
      });
    } else {
      return response.status(200).json({
        status: "success",
        message: "get successfully",
        data: dbRes,
      });
    }
  } catch {
    return response.status(500).json({
      status: "failed",
      message: "failed to get",
    });
  }
};

exports.createTask = async (request, response) => {
  try {
    const body = request.body;
    const taskData = {
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
      priority: body.priority,
      status: body.status,
    };
    const dbRes = await taskModel.create(taskData);
    if (dbRes) {
      return response.status(201).json({
        status: "success",
        message: "add successfully",
        data: dbRes,
      });
    }
  } catch(error) {
    console.log(error);
    
    return response.status(500).json({
      status: "failed",
      message: "failed to add",
    });
  }
};

exports.updateTask = async (request, response) => {
  try {
    const body = request.body;
    const taskData = {
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
      priority: body.priority,
      status: body.status,
    };
    const dbRes = await taskModel.findByIdAndUpdate(
      request.params.id,
      taskData
    );
    if (!dbRes) {
      return response.status(404).json({
        status: "failed",
        message: "Task not found",
      });
    } else {
      return response.status(200).json({
        status: "success",
        message: "update successfully",
      });
    }
  } catch {
    return response.status(500).json({
      status: "failed",
      message: "failed to update",
    });
  }
};

exports.deleteTask = async (request, response) => {
  try {
    const dbRes = await taskModel.findByIdAndDelete(request.params.id);
    if (!dbRes) {
      return response.status(404).json({
        status: "failed",
        message: "Task not found",
      });
    } else {
      return response.status(200).json({
        status: "success",
        message: "delete successfully",
        data: dbRes,
      });
    }
  } catch {
    return response.status(500).json({
      status: "failed",
      message: "failed to delete",
    });
  }
};
