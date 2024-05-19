import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/notes');
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`/notes/${id}`, {
        method: 'DELETE',
      });
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div>
      <h1>All Notes</h1>
      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
          <Link to={`/notes/${note.id}/edit`}>Edit</Link>
        </div>
      ))}
      <Link to="/notes/new">Create New Note</Link>
    </div>
  );
}

export default Notes;
