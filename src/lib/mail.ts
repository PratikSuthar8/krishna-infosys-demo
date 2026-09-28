import { Resend } from "resend";

export type ContactPayload = {
	name: string;
	organisation?: string;
	email: string;
	phone?: string;
	interest?: string;
	message?: string;
};

function escapeHtml(s: string) {
	return String(s)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

export async function sendContactNotification(data: ContactPayload) {
	const key = process.env.RESEND_API_KEY;
	const to = process.env.CONTACT_NOTIFY_TO;
	const from = process.env.CONTACT_NOTIFY_FROM || "Krishna Infosys <noreply@krishnainfosys.com>";

	if (!key || !to) {
		console.warn("Resend skipped: missing RESEND_API_KEY or CONTACT_NOTIFY_TO");
		return { ok: false as const, skipped: true };
	}

	const org = (data.organisation || "").trim();
	const subject = org
		? `New Website Inquiry from ${data.name} (${org})`
		: `New Website Inquiry from ${data.name}`;

	const rows: { label: string; value: string }[] = [
		{ label: "Name", value: data.name },
		{ label: "Organisation", value: org || "—" },
		{ label: "Email", value: data.email },
		{ label: "Phone", value: data.phone || "—" },
		{ label: "Interest", value: data.interest || "—" },
	];

	const rowsHtml = rows
		.map(
			(r) => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #eee;width:140px;color:#666;font-size:13px;font-weight:600;vertical-align:top;">
          ${escapeHtml(r.label)}
        </td>
        <td style="padding:12px 16px;border-bottom:1px solid #eee;color:#171717;font-size:14px;vertical-align:top;">
          ${
			r.label === "Email"
				? `<a href="mailto:${escapeHtml(r.value)}" style="color:#f56616;text-decoration:none;">${escapeHtml(r.value)}</a>`
				: escapeHtml(r.value)
		}
        </td>
      </tr>`,
		)
		.join("");

	const messageHtml = escapeHtml(data.message || "—").replace(/\n/g, "<br/>");

	const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head>
<body style="margin:0;padding:0;background:#f3f1ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f1ec;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e8e6e1;">
          <tr>
            <td style="background:#171717;padding:20px 24px;">
              <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#f56616;font-weight:700;">Krishna Infosys</div>
              <div style="margin-top:8px;font-size:18px;font-weight:600;color:#ffffff;letter-spacing:-0.02em;">New website inquiry</div>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 8px 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                ${rowsHtml}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 24px 8px;">
              <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#999;font-weight:700;">Message</div>
              <div style="margin-top:10px;padding:14px 16px;background:#faf9f7;border-radius:8px;border:1px solid #eee;color:#333;font-size:14px;line-height:1.6;">
                ${messageHtml}
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px 24px;">
              <a href="mailto:${escapeHtml(data.email)}"
                 style="display:inline-block;background:#f56616;color:#fff;text-decoration:none;font-size:13px;font-weight:600;padding:10px 18px;border-radius:999px;">
                Reply to ${escapeHtml(data.name)}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 24px;background:#faf9f7;border-top:1px solid #eee;font-size:11px;color:#999;">
              Sent from the Krishna Infosys website contact form · Lead is also saved in Admin → Leads
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

	const text = [
		`New website inquiry`,
		``,
		`Name: ${data.name}`,
		`Organisation: ${org || "—"}`,
		`Email: ${data.email}`,
		`Phone: ${data.phone || "—"}`,
		`Interest: ${data.interest || "—"}`,
		``,
		`Message:`,
		data.message || "—",
	].join("\n");

	const resend = new Resend(key);
	const result = await resend.emails.send({
		from,
		to: [to],
		replyTo: data.email,
		subject,
		html,
		text,
	});

	if (result.error) {
		console.error("Resend error:", result.error);
		return { ok: false as const, error: result.error };
	}
	return { ok: true as const, id: result.data?.id };
}
