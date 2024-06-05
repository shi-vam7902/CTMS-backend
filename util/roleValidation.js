const zod = require("zod");
const rolevalidation = zod.object({
  body: zod.object({
    roleName: zod
      .string()
      .min(2, "The mininum Length of role Should be 15")
      .max(50, "maximium Should be 50"),
  }),
  // createdAt: zod
  //   .string()
  //   .regex(
  //     /^\d{2}-\d{2}-\d{4} \d{2}:\d{2} (AM|PM)$/,
  //     "createdAt must be in DD-MM-YYYY HH:MM AM/PM format"
  //   )
  //   .optional(),
});
module.exports = rolevalidation;
