const NoteForm = ({ handleChange, handleSubmit, value }) => {
  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' value={value} onChange={handleChange} />

        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default NoteForm;
