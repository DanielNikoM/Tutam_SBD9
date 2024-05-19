import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function EditNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    const response = await fetch(`/notes/${id}`);
    const data = await response.json();
    setTitle(data.title);
    setContent(data.content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    history.push('/');
  };

  return (
    <div>
      <h1>Edit Note</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditNote;
