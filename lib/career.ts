// Career application submit. Posts multipart/form-data (with the CV file) to the Laravel API.
// Expected endpoint: POST {NEXT_PUBLIC_API_URL}/api/career
// Fields: name, email, phone, position, experience, portfolio, message, cv (file: pdf/doc/docx, max 5 MB)
export type ApplicationResult = { ok: boolean; status?: number; message?: string };

export async function submitApplication(body: FormData): Promise<ApplicationResult> {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) return { ok: false, message: "Career API not configured yet." };
  const res = await fetch(`${base}/api/career`, { method: "POST", headers: { Accept: "application/json" }, body });
  let message: string | undefined;
  try {
    const json = await res.json();
    if (typeof json?.message === "string") message = json.message;
  } catch { /* non-JSON response */ }
  return { ok: res.ok, status: res.status, message };
}