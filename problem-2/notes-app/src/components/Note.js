import '../styles/NotesPage.css';

export const Note = (props) => {

    return (
        <>
        <textarea 
            className="note"
            value={props.noteName}
            style={{ backgroundColor: `rgb${props.color}` }}
            onDoubleClick={() => props.deleteNote(props.id)}
        />
        </>
    );
};