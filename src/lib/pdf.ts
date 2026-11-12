/**
 * Draws a print-ready A5 invitation card and downloads it.
 * Note: jsPDF's built-in fonts cannot shape Telugu script, so the PDF is in English
 * (the opening blessing is transliterated).
 */
export async function downloadInvitationPdf() {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a5" });
  const W = 148;
  const H = 210;
  const gold: [number, number, number] = [176, 141, 87];
  const ink: [number, number, number] = [45, 38, 32];
  const soft: [number, number, number] = [94, 84, 74];

  // background + double gold border
  doc.setFillColor(251, 247, 240);
  doc.rect(0, 0, W, H, "F");
  doc.setDrawColor(...ink);
  doc.setLineWidth(1.2);
  doc.rect(6, 6, W - 12, H - 12);
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.4);
  doc.rect(9, 9, W - 18, H - 18);
  doc.setLineWidth(0.2);
  doc.rect(11, 11, W - 22, H - 22);
  for (const [x, y] of [[11, 11], [W - 11, 11], [11, H - 11], [W - 11, H - 11]]) {
    doc.setFillColor(...gold);
    doc.lines([[2.2, 2.2], [-2.2, 2.2], [-2.2, -2.2], [2.2, -2.2]], x, y - 2.2, [1, 1], "F", true);
  }

  const ornament = (y: number) => {
    doc.setDrawColor(...gold);
    doc.setLineWidth(0.25);
    doc.line(W / 2 - 30, y, W / 2 - 5, y);
    doc.line(W / 2 + 5, y, W / 2 + 30, y);
    doc.setFillColor(...gold);
    doc.lines([[2.5, 2.5], [-2.5, 2.5], [-2.5, -2.5], [2.5, -2.5]], W / 2, y - 2.5, [1, 1], "F", true);
  };

  const center = (
    text: string | string[],
    y: number,
    size: number,
    style: "normal" | "italic" | "bold" = "normal",
    color = ink,
    spacing = 0
  ) => {
    doc.setFont("times", style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
    doc.setCharSpace(spacing);
    doc.text(text, W / 2, y, { align: "center" });
    doc.setCharSpace(0);
  };

  center("Srirasthu!  Subhamasthu!!  Avighnamasthu!!!", 22, 9, "italic", ink);
  center("WEDDING INVITATION", 31, 9, "normal", gold, 1.4);
  ornament(36);
  center("With the blessings of our elders and families.", 44, 9.5, "italic", soft);
  center(
    doc.splitTextToSize(
      "We solicit your gracious presence with family and friends on the auspicious occasion of the marriage of our only son.",
      108
    ),
    51,
    9.5,
    "normal",
    ink
  );

  center("Chi.", 68, 10, "italic", gold);
  center("Venkateswarlu", 78, 24, "normal", ink);
  center("WITH", 87, 8, "normal", gold, 1.4);
  center("Chi. La. Sow.", 95, 10, "italic", gold);
  center("Sneha", 105, 24, "normal", ink);
  center("Second Daughter of Sri Marapangu Nagarjuna and Chilakamma", 112, 8.5, "italic", soft);
  center("Kudali Village, Mothey Mandal, Suryapet District.", 117, 8.5, "italic", soft);

  ornament(123);
  center("SUMUHURTHAM", 131, 8, "normal", gold, 1.4);
  center("Sunday, 22 November 2026  ·  11:22 AM", 138, 12, "normal", ink);
  center("Aswini Nakshatram  ·  Dhanassu Lagnam", 144, 9.5, "italic", soft);
  center("Lunch: 12:00 PM", 150, 9.5, "normal", ink);

  center("VENUE", 160, 8, "normal", gold, 1.4);
  center("P.V. Function Hall", 167, 13, "normal", ink);
  center("Beside Flyover, Kodad Road, Nayakangudem.", 173, 9, "italic", soft);

  ornament(179);
  center("INVITATION BY", 186, 7.5, "normal", gold, 1.2);
  center("Nukapangu Thirapaiah - Thirapamma", 192, 11, "normal", ink);
  center("Vallapuram Village, Nadigudem Mandal, Suryapet District.", 197, 8.5, "italic", soft);
  center("With Best Compliments from: Near & Dear...", 202.5, 8, "italic", gold);

  doc.save("Venkateswarlu-Sneha-Wedding-Invitation.pdf");
}
