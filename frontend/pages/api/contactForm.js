import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  const body = req.body;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL_CONTACT_US,
        private_key: process.env.GOOGLE_PRIVATE_KEY_CONTACT_US?.replace(
          /\\n/g,
          "\n"
        ),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    // Convert the selectedCheckboxes array to a comma-separated strin
    const checkboxesString = body.selectedCheckboxes.join(", ");

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID_CONTACT_US,
      range: "A1:D1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            body.date,
            body.time,
            body.name,
            body.email,
            body.phone,
            body.location,
            body.message,
            checkboxesString,
          ],
        ],
      },
    });

    return res.status(201).json({
      data: response.data,
    });
  } catch (e) {
    return res.status(e.code).send({ message: e.message });
  }
}
