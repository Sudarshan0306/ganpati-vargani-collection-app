// import { ZodError } from "zod";

// const zodValidate = (schema) => (req, res, next) => {
//   try {
//     const parsed = schema.parse({
//       body: req.body,
//       query: req.query,
//       params: req.params,
//     });
//     req.body = parsed.body ?? req.body;
//     req.query = parsed.query ?? req.query;
//     req.params = parsed.params ?? req.params;
//     next();
//   } catch (err) {
//     if (err instanceof ZodError) {
//       return res
//         .status(400)
//         .json({ message: "Validation error", issues: err.issues });
//     }
//     next(err);
//   }
// };

// export { zodValidate };


import { ZodError } from "zod";

const zodValidate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next(); // No need to reassign req.body/query/params
  } catch (err) {
    if (err instanceof ZodError) {
      return res
        .status(400)
        .json({ message: "Validation error", issues: err.issues });
    }
    next(err);
  }
};

export { zodValidate };
