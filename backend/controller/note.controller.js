import Note from "../model/Note.model.js";

export const getNotes = async (req, res) => {
  try {
    console.log("Logged-in user ID:", req.userId);

    //// GET all notes belonging to the logged-in user
    const notes = await Note.find({ user: req.userId }).sort({
      pinned: -1,
      createdAt: -1,
    });
    return res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getSingleNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.userId });
    if (!note) return res.status(404).json({ message: "Note not found" });
    return res.status(201).json({
      success: true,
      note,
      message: "Note found successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content, pinned } = req.body;
    if (!title || !content || !pinned) {
      return res.status(400).json({
        success: false,
        message: "Fields are required ! can't be left empty",
      });
    }
    const note = new Note({
      title,
      content,
      pinned,
      user: req.userId,
    });
    const saved = await note.save();
    return res
      .status(201)
      .json({ success: true, message: "Note created successfully", saved });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content, pinned } = req.body;
    if (!title || !content || !pinned)
      return res
        .status(400)
        .json({ success: false, message: "Required fields can't be empty" });

    const updatedNotes = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId,
      },
      { title, content, pinned },
      { new: true, runValidators: true },
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deleted = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!deleted) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};
