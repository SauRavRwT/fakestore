import jsPDF from "jspdf";

const generateBill = (cartItems, totalPrice) => {
  const doc = new jsPDF();

  // Set document properties
  doc.setProperties({
    title: "FakeStore Bill",
    subject: "Invoice",
    author: "FakeStore",
  });

  // Header
  doc.setFontSize(20);
  doc.text("FakeStore BILL", 105, 15, { align: "center"});
  doc.setFont("Lexend", "Bold");

  // Date and Bill Info
  doc.setFontSize(10);
  const currentDate = new Date();
  doc.text(`Bill Date: ${currentDate.toLocaleDateString()}`, 20, 30);
  doc.text(`Bill ID: #${Math.floor(Math.random() * 1000000)}`, 20, 37);

  // Table Header
  doc.setFontSize(11);
  doc.setFont("Lexend", "bold");
  doc.text("Item", 20, 50);
  doc.text("Price", 120, 50);
  doc.text("Qty", 150, 50);
  doc.text("Total", 170, 50);

  // Draw line
  doc.setDrawColor(0);
  doc.line(20, 53, 200, 53);

  // Table Body
  doc.setFont("Lexend", "normal");
  doc.setFontSize(10);
  let yPosition = 60;

  cartItems.forEach((item) => {
    // Truncate title if too long
    const title =
      item.title.length > 40 ? item.title.substring(0, 37) + "..." : item.title;

    const itemTotal = (item.price * item.quantity).toFixed(2);

    doc.text(title, 20, yPosition);
    doc.text(`$${item.price.toFixed(2)}`, 120, yPosition);
    doc.text(item.quantity.toString(), 150, yPosition);
    doc.text(`$${itemTotal}`, 170, yPosition);

    yPosition += 8;
  });

  // Draw bottom line
  doc.setDrawColor(0);
  doc.line(20, yPosition, 200, yPosition);

  // Total Section
  yPosition += 8;
  doc.setFont(undefined, "bold");
  doc.setFontSize(12);
  doc.text("TOTAL:", 150, yPosition);
  doc.text(`$${totalPrice.toFixed(2)}`, 170, yPosition);

  // Footer
  doc.setFontSize(9);
  doc.setFont(undefined, "normal");
  doc.text("Thank you for your purchase!", 105, 280, { align: "center" });

  // Save the PDF
  doc.save(`fakestore-bill_${Date.now()}.pdf`);
};

export default generateBill;
