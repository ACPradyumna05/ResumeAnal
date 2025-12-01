const API_BASE = "http://127.0.0.1:8000";

function getToken() {
  return localStorage.getItem("mmr_token");
}

function authHeaders() {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

async function handleError(response) {
  let msg = `Server error ${response.status}`;
  try {
    const err = await response.json();
    msg = err.detail || err.message || JSON.stringify(err);
  } catch (e) {}
  throw new Error(msg);
}


export async function login({ email, password }) {
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);

  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) return handleError(res);
  const data = await res.json();

  localStorage.setItem("mmr_token", data.access_token);
  return data;
}

export async function signup({ email, password, full_name }) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, full_name }),
  });

  if (!res.ok) return handleError(res);
  return res.json(); 
}

export async function verifyEmail(token) {
  const res = await fetch(
    `${API_BASE}/auth/verify?token=${encodeURIComponent(token)}`
  );
  if (!res.ok) return handleError(res);
  return res.json();
}

export function logout() {
  localStorage.removeItem("mmr_token");
}


export async function analyzeCandidate({ resumeFile, jobDescriptionText }) {
  const form = new FormData();
  form.append("file", resumeFile);
  form.append("jd_name", "");
  form.append("jd_text", jobDescriptionText);
  form.append("jd_keywords", "");
  form.append("jd_skills", "");

  const res = await fetch(`${API_BASE}/predict_file`, {
    method: "POST",
    body: form,
    headers: authHeaders(),
  });

  if (!res.ok) return handleError(res);
  return res.json();
}


export async function analyzeEmployer({ resumeFiles, jobDescriptionText }) {
  const form = new FormData();
  resumeFiles.forEach((f) => form.append("files", f));
  form.append("jd_text", jobDescriptionText);
  form.append("jd_name", "");
  form.append("jd_keywords", "");
  form.append("jd_skills", "");

  const res = await fetch(`${API_BASE}/rank_candidates`, {
    method: "POST",
    body: form,
    headers: authHeaders(),
  });

  if (!res.ok) return handleError(res);
  return res.json();
}

export { getToken };
