
exports.loginDealer = (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    res.json({message : 'Login successful'})
}