import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const { title } = req.body;

    const category = await Category.findOne({ title });
    if (category) return res.status(400).json({ message: "Category exists" });

    const newCategory = new Category({ title });
    await newCategory.save();

    res.status(201).json({ newCategory });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const readCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}