import { Resend } from "resend";

export type ContactPayload = {
	name: string;
	organisation?: string;
	email: string;
	phone?: string;
	interest?: string;
	message?: string;
};

export async function sendContactNotification(data: ContactPayload) {
	const key = process.env.RESEND_API_KEY;
	const to = process.env.CONTACT_NOTIFY_TO;
	const from = process.env.CONTACT_NOTIFY_FROM || "Krishna Infosys <noreply@krishnainfosys.com>";

	if (!key || !to) {
		console.warn("Resend skipped: missing RESEND_API_KEY or CONTACT_NOTIFY_TO");
		return { ok: false as const, skipped: true };
	}

	const resend = new Resend(key);
	const subject = `New enquiry — ${data.name}${data.organisation ? ` (${data.organisation})` : ""}`;

	const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Organisation:</strong> ${escapeHtml(data.organisation || "—")}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone || "—")}</p>
    <p><strong>Interest:</strong> ${escapeHtml(data.interest || "—")}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message || "—").replace(/\n/g, "<br/>")}</p>
  `;

	const result = await resend.emails.send({
		from,
		to: [to],
		replyTo: data.email,
		subject,
		html,
	});

	if (result.error) {
		console.error("Resend error:", result.error);
		return { ok: false as const, error: result.error };
	}
	return { ok: true as const, id: result.data?.id };
}

function escapeHtml(s: string) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
