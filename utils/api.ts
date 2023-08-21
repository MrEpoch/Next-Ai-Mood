
const createURL = (path: string) => window.location.origin + path;

export async function newEntry() {
    const res = await fetch(new Request(createURL("/api/journal")), {
        method: "POST",
    });
    
    if (res.ok) {
        const data = await res.json();
        return data;
    }
}

export async function updateEntry(id: string, content: string) {
    const res = await fetch(new Request(createURL(`/api/journal/${id}`)), {
        method: "PATCH",
        body: JSON.stringify({ content })
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    }
}
