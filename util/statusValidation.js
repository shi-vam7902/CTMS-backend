const zod = require("zod");

const statusValidation = zod.object({
  body: zod.object({
    statusName: zod
      .string()
      .min(2, "The minimum length of status should be 2")
      .max(50, "The maximum length of status should be 50"),
  }),
});

module.exports = statusValidation;
