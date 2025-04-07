import { body, validationResult } from "express-validator";

class UserValidations {
  signUp = [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required"),

    body("email")
      .trim()
      .isEmail()
      .withMessage("Invalid email"),

    body("password")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Password must be at least 10 characters"),

    this.handleValidationErrors,
  ];

  signIn = [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Invalid email"),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required"),

    this.handleValidationErrors,
  ];

  handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }
    next();
  }
}

export { UserValidations };
