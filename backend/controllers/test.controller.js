import Test from "../models/Test.js";

export const createTest = async (req, res) => {
  try {
    const { title, description, questions, createdBy } = req.body;

    const newTest = new Test({ title, description, questions, createdBy });
    await newTest.save();

    res.status(201).json(newTest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTests = async (req, res) => {
  try {
    const tests = await Test.find().sort({ createdAt: -1 }).populate("createdBy", "name");
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTest = async (req, res) => {
  try {
    const testId = req.body;

    const deleteTest = await Test.findByIdAndDelete(testId);
    if (!deleteTest) return res.status(404).json({ message: "Test not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}