const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../modals/user');

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {

        const exisitingUser = await User.findOne({ email });
        if (!exisitingUser) return res.status(404).json({ message: "User dose not exists" });

        const isPasswordCorrect = await bcrypt.compare(password, exisitingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credencials" });

        const token = jwt.sign({ email: exisitingUser.email, id: exisitingUser._id }, "test", { expiresIn: "1h" });

        res.status(200).json({ result: exisitingUser, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Some thing went wronge." });
    }
}

const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    try {
        const exisitingUser = await User.findOne({ email });

        if (exisitingUser) return res.status(400).json({ message: 'User already exists.' });

        if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match." });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ name: `${firstName} ${lastName}`, email, password: hashedPassword });
        const token = jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: "1h" });

        res.status(200).json({ result, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error. Some thing went wronge" });
    }
}

module.exports = { signin, signup };