const express = require('express');
const mongoose = require('mongoose');
const Note = require('../models/NotesModel');

const noteRoutes = express.Router();

function validateContent(req, res) {
  if (!req.body.content) {
    res.status(400).json({ message: 'Note content can not be empty' });
    return false;
  }
  return true;
}

function validObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

noteRoutes.post('/notes', async (req, res) => {
  if (!validateContent(req, res)) return;

  try {
    const note = new Note(req.body.content);
    const savedNote = await note.save();
    return res.status(201).json(savedNote);
  } catch (error) {
    return res.status(400).json({
      message: 'Unable to create note',
      error: error.message
    });
  }
});

noteRoutes.get('/notes', async (_req, res) => {
  try {
    const notes = await Note.find().sort({ _id: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to retrieve notes',
      error: error.message
    });
  }
});

noteRoutes.get('/notes/:noteId', async (req, res) => {
  if (!validObjectId(req.params.noteId)) {
    return res.status(400).json({ message: 'Invalid note id' });
  }

  try {
    const note = await Note.findById(req.params.noteId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to retrieve note',
      error: error.message
    });
  }
});

noteRoutes.put('/notes/:noteId', async (req, res) => {
  if (!validateContent(req, res)) return;

  if (!validObjectId(req.params.noteId)) {
    return res.status(400).json({ message: 'Invalid note id' });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.noteId,
      req.body.content,
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    return res.status(200).json(updatedNote);
  } catch (error) {
    return res.status(400).json({
      message: 'Unable to update note',
      error: error.message
    });
  }
});

noteRoutes.delete('/notes/:noteId', async (req, res) => {
  if (!validObjectId(req.params.noteId)) {
    return res.status(400).json({ message: 'Invalid note id' });
  }

  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.noteId);
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    return res.status(200).json({
      message: 'Note deleted successfully',
      note: deletedNote
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to delete note',
      error: error.message
    });
  }
});

module.exports = noteRoutes;
