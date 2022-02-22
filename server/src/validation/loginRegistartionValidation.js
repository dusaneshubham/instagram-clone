const validate = require('validator')

const signInValidation = (req, res, next) => {
    const { email, password } = req.body

    // Validate Email
    if (validate.isEmail(email)) {

        // Validate Password
        if (password.length >= 1) {
            next();
        }
        else {
            return res.json({ message: "Password field is required!" });
        }
    }
    else {
        return res.json({ message: "Enter correct Email!" });
    }
}

const signUpValidation = (req, res, next) => {
    const { email, username, password } = req.body

    // Validate username
    if (username.length >= 3) {

        // Validate Email
        if (validate.isEmail(email)) {

            // Validate Password
            if (password.length >= 8) {
                next();
            }
            else {
                return res.json({ message: "Password must be of minimum 8 characters!" });
            }

        }
        else {
            return res.json({ message: "Invalid Email Id!" });
        }
    }
    else {
        return res.json({ message: "Username should contain minimum 3 characters!" });
    }
}

module.exports = { signInValidation, signUpValidation }