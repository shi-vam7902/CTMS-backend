const zod = require("zod");

const taskValidation = zod.object({
  body: zod.object({
    taskName: zod
      .string()
      .min(1, "Task name is required")
      .max(100, "Task name should not exceed 100 characters")
      .trim(),
    taskDesc: zod
      .string()
      .min(1, "Task description is required")
      .max(500, "Task description should not exceed 500 characters"),
    //   .trim(),
    // taskStartDate: zod.string().refine((dateStr) => {
    //   const datePattern = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2} (AM|PM)$/;
    //   return datePattern.test(dateStr);
    // }, "Task start date must be in the format DD-MM-YYYY HH:MM AM/PM"),
    assignedTo: zod.array(
      zod.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID")
    ),
    project: zod.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid project ID"),
    taskStatus: zod
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid task status ID"),
  }),
});

module.exports = taskValidation;
