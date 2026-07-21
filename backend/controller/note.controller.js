import Note from "../model/Note.model.js";

export const getNotes = async (res, req) => {
  try {
    //// GET all notes belonging to the logged-in user
    const notes = await Note.findById({ user: req.userId }).sort({
      pinned: -1,
      createdAt: -1,
    });
    return res.json(notes);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
