const validateTitle = (req, res, next) => {
    const { title,author, year, gender } = req.body;

    if (!title || typeof title !== "string" || title.length < 3) {
        return res.status(400).json({ error: 'Title must be at least 3 characters long' });
    }
    next();
};

module.exports = validateTitle;
