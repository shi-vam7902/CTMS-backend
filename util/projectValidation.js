const zod = require("zod");

const projectValidation = zod.object({
  body: zod.object({
    projectName: zod
      .string()
      .min(1, "Project name is required")
      .max(100, "Project name should not exceed 100 characters")
      .trim(),
    projectDesc: zod
      .string()
      .min(1, "Project description is required")
      .max(500, "Project description should not exceed 500 characters")
      .trim(),
    // projectStartDate: zod.string().refine((dateStr) => {
    //   const datePattern = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2} (AM|PM)$/;
    //   return datePattern.test(dateStr);
    // }, "Project start date must be in the format DD-MM-YYYY HH:MM AM/PM"),
    // projectEndDate: zod.string().refine((dateStr) => {
    //   const datePattern = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2} (AM|PM)$/;
    //   return datePattern.test(dateStr);
    // }, "Project end date must be in the format DD-MM-YYYY HH:MM AM/PM"),
    // projectDueDate: zod.string().refine((dateStr) => {
    //   const datePattern = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2} (AM|PM)$/;
    //   return datePattern.test(dateStr);
    // }, "Project due date must be in the format DD-MM-YYYY HH:MM AM/PM"),
    user: zod.array(zod.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID")),
    // tasks: zod.array(
    //   zod.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid task ID")
    // ),
    status: zod.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid status ID"),
  }),
});

module.exports = projectValidation;
