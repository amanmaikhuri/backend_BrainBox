import Note from "../models/Note.js"

//used '_' because we are not using 'req' parameter
export const getAllNotes = async (_, res) => {
    try {
        const notes = await Note.find({}).sort({ createdAt: -1 });  // Sort by creation date in descending order (newest first)
        res.status(200).json(notes);
    } catch (error) {
        console.log("Error fetching notes:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });
        const savedNote = await note.save();
        res.status(201).json(savedNote);

        if(!title || !content){
            return res.status(400).json({ message: "Title and content are required" });
        }
    } catch (error) {
        console.log("Error creating note:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        console.log("Error updating note:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.log("Error deleting note:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getNoteById = async (req, res) => {
    // const { id } = req.params;
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {    
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.log("Error fetching note:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}