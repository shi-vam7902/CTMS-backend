const zod = require("zod");

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const userValidation = zod.object({
  body: zod.object({
    firstName: zod
      .string()
      .min(2, "The minimum length of firstName should be 2")
      .max(50, "The maximum length of firstName should be 50"),
    lastName: zod
      .string()
      .min(2, "The minimum length of lastName should be 2")
      .max(50, "The maximum length of lastName should be 50"),
    email: zod.string().email("Invalid email address"),
    password: zod
      .string()
      .min(8, "The minimum length of password should be 8")
      .max(100, "The maximum length of password should be 100"),
    role: zod.array(zod.string().regex(objectIdRegex, "Invalid roleId format")),
    // projectId: zod.array(
    //   zod.string().regex(objectIdRegex, "Invalid projectId format").optional()
    // ),
    // taskId: zod.array(
    //   zod.string().regex(objectIdRegex, "Invalid taskId format").optional()
    // ),
  }),
});

module.exports = userValidation;
