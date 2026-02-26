const validator = (rules) => (req, res, next) => {
  for (const key in rules) {
    const val = req.body[key];
    if (!val) return res.status(400).json({ message: `${key} is required` });

    if (key === "email" && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(val)) return res.status(400).json({ message: "Incorrect email format" });
    if (key === "password" && val.length < rules[key]) return res.status(400).json({ message: `The password must be longer than ${rules[key]} characters` });
  }

  next();
};

export default validator;