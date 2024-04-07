import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createNote, getNotes, updateNote } from './requests';

const App = () => {
  const queryClient = useQueryClient();
  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData(['notes']);
      queryClient.setQueryData(['notes'], notes.concat(newNote));
      // queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    newNoteMutation.mutate({ content, important: false });
  };

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important });
  };

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  const notes = result.data;

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id}>
          {note.content}
          <button onClick={() => toggleImportance(note)}>
            {note.important ? 'important' : 'not important'}
          </button>
        </li>
      ))}
    </div>
  );
};

export default App;
