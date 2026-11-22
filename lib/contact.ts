// Modular contact integration. Point NEXT_PUBLIC_API_URL at the Laravel API later.
export type ContactPayload = { name: string; email: string; phone?: string; message: string };

export async function submitContact(payload: ContactPayload): Promise<{ ok: boolean; message?: string }> {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) return { ok: false, message: "Contact API not configured yet." };
  const res = await fetch(`${base}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  return { ok: res.ok };
}
