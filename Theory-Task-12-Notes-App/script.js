const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesList = document.getElementById("notesList");
const emptyMessage = document.getElementById("emptyMessage");
const noteCount = document.getElementById("noteCount");

// Get notes from localStorage
function getNotes() {
    const raw = localStorage.getItem("notes");
    return raw ? JSON.parse(raw) : [];
}

// Save notes to localStorage
function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Add a new note
function addNote() {
    const text = noteInput.value.trim();

    if (text === "") {
        alert("Please enter a note.");
        return;
    }

    const notes = getNotes();

    const note = {
        id: Date.now(),
        text: text,
        createdAt: new Date().toISOString(),
        updatedAt: null
    };

    notes.push(note);
    saveNotes(notes);

    noteInput.value = "";

    renderNotes();
}

// Delete a note
function deleteNote(id) {
    const notes = getNotes().filter(note => note.id !== id);

    saveNotes(notes);
    renderNotes();
}

// Edit a note
function editNote(id) {
    const notes = getNotes();
    const note = notes.find(note => note.id === id);

    if (!note) {
        return;
    }

    const newText = prompt("Edit your note:", note.text);

    if (newText === null) {
        return;
    }

    const updatedText = newText.trim();

    if (updatedText === "") {
        alert("Note cannot be empty.");
        return;
    }

    note.text = updatedText;
    note.updatedAt = new Date().toISOString();

    saveNotes(notes);
    renderNotes();
}

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleString();
}

// Display all notes
function renderNotes() {
    const notes = getNotes();

    notesList.innerHTML = "";

    noteCount.textContent =
        `${notes.length} ${notes.length === 1 ? "note" : "notes"}`;

    if (notes.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    notes.forEach(note => {
        const card = document.createElement("div");
        card.className = "note-card";

        const text = document.createElement("p");
        text.textContent = note.text;

        const info = document.createElement("div");
        info.className = "note-info";

        info.textContent =
            `Created: ${formatDate(note.createdAt)}` +
            (note.updatedAt
                ? ` | Updated: ${formatDate(note.updatedAt)}`
                : "");

        const editButton = document.createElement("button");
        editButton.className = "edit-btn";
        editButton.textContent = "Edit";
        editButton.onclick = () => editNote(note.id);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteNote(note.id);

        card.appendChild(text);
        card.appendChild(info);
        card.appendChild(editButton);
        card.appendChild(deleteButton);

        notesList.appendChild(card);
    });
}

// Add button event
addBtn.addEventListener("click", addNote);

// Allow Ctrl + Enter to add note
noteInput.addEventListener("keydown", event => {
    if (event.ctrlKey && event.key === "Enter") {
        addNote();
    }
});

// Load saved notes when page opens
window.addEventListener("load", renderNotes);