export default function TodoCard({todoEntry, onDone}) {
    return <div className="todoCard">
        <h2>{todoEntry.title}</h2>
        <p>{todoEntry.description}</p>
        <button onClick={onDone}>Mark as done</button>
    </div>
}