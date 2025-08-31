const validateYear = (req, res, next) => {
    const { year } = req.body;

    if (!year || year < 1000 || year > new Date().getFullYear()) {
        return res.status(400).json({ error: `The year of publication is required, must be 1000 to ${currentYear}.` });
    }
    next();
};

module.exports = validateYear;
