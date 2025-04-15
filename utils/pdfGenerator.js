const fs = require("fs");
const path = require("path");
const pdf = require("html-pdf");
const handlebars = require("handlebars");

exports.generateInvoice = (sale, customer, res) => {
  const templatePath = path.join(
    __dirname,
    "../templates/invoiceTemplate.html"
  );
  const templateHtml = fs.readFileSync(templatePath, "utf8");

  const compiled = handlebars.compile(templateHtml);

  const items = sale.products.map((p) => ({
    name: p.name,
    quantity: p.quantity,
    unitPrice: p.unitPrice,
    total: p.quantity * p.unitPrice,
  }));

  const html = compiled({
    customerName: customer.name,
    date: new Date().toLocaleDateString(),
    items,
    grandTotal: items.reduce((acc, p) => acc + p.total, 0),
  });

  pdf.create(html).toStream((err, stream) => {
    if (err) return res.status(500).send("PDF creation error");
    res.setHeader("Content-Type", "application/pdf");
    stream.pipe(res);
  });
};
