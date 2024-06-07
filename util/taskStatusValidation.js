const zod = require("zod");

const taskStatusValidation = zod.object({
  body: zod.object({
    taskStatusName: zod
      .string()
      .min(1, "Task status name is required")
      .max(100, "Task status name should not exceed 100 characters")
      .trim(),
    taskStatusDesc: zod
      .string()
      .min(1, "Task status description is required")
      .max(500, "Task status description should not exceed 500 characters")
      .trim(),
  }),
});

module.exports = taskStatusValidation;
