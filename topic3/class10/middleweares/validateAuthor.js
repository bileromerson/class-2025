const validateAuthor = (req, res, next) => {
    const { title, author, year, genre } = req.body;

    if (!author || typeof title !== "string" || tytle.length < 3) {
        return res.status(400).json({ error: 'Author must be at least 3 characters long' });
    }
    return res.status(400).json({ error: 'Author must be 3 characters long' });
    next();
};

module.exports = validateAuthor;
