import '../styles/NotesPage.css';

export const Note = (props) => {
    console.log(props.color);

    return (
        <>
        <textarea 
            className="note"
            value={props.noteName}
            readOnly
            style={{ backgroundColor: `rgb${props.color}` }}
        />
        <button onClick={() => props.deleteNote(props.id)}>Delete Note</button>
        </>
    );
};