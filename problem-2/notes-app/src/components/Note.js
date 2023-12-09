export const Note = (props) => {

    return (
        <div className="cell" style={{color: (props.color)}}>
            <h1>{props.noteName}</h1>
            <button onClick={() => props.deleteNote(props.id)}>Delete Note</button>
        </div>
    );
};