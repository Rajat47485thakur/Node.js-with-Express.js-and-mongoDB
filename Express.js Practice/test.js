var a = [2,3,4,5,6,7];
console.log(a);
var b = {2:0,3:1,4:2}
console.log(b);

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists in the database
        const existingUser = await data.findOne({ username });
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // If username and password are correct, generate a JWT token
        jwt.sign({ username }, "secretKey", (error, token) => {
            if (error) {
                return res.status(500).json({ error: 'Failed to generate token' });
            }
            res.json({ token });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


// app.post('/login', (req, res) => {

//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).json({ error: 'Username and Password is required' });
//     }


//     jwt.sign({ username, password }, "secretKey", (error, token) => {
//         if (error) {
//             return res.status(500).json({ error: 'Failed to generate token' });
//         }
//         res.json({ token });
//     });
// });
