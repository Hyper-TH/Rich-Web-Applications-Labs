export const Note = (props) => {
    return (
        <div className="cell" style={{color: (props.completed) ? "red" : "green"}}>
            <h1>{props.noteName}</h1>
            <button onClick={() => props.deleteNote(props.id)}>Delete Note</button>
            <button onClick={() => 
                props.updateNote(props.id)}
                style={{color: (props.completed) ? "red" : "green"}}>
                    Complete Note
            </button>
        </div>
    );
};