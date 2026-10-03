const API_URL = "http://localhost:3000/candidates"

export async function parseCandidatePdf(formData) {
    return fetch(`${API_URL}/parse-pdf`, {
        method: "POST",
        body: formData
    })
}

export async function createCandidate(candidate) {
    return fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(candidate)
    })
}
export async function updateCandidate(id, candidate) {
    return fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(candidate)
    })
}

export async function deleteCandidate(id) {
    return fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
}

export async function getCandidate(id) {
    return fetch(`${API_URL}/${id}`)
}

export async function getCandidates() {
    return fetch(API_URL)
}