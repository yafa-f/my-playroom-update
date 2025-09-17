import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import icLogo from "../../assets/המשחקיה.png";
import moment from "moment";

const formatDate = (date) => moment(date).format("DD.MM.YYYY");

function convertFontToBase64(fontBlob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(event.target.result))
      );
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(fontBlob);
  });
}

const isRTL = (text) => /[\u0590-\u05FF]/.test(text);

const reverseHebrewText = (text) => text.split("").reverse().join("");

const drawText = (doc, text, x, y, options) => {
  const formattedText = isRTL(text) ? reverseHebrewText(text) : text;
  doc.text(formattedText, x, y, options);
};

export const generatePDF = async (columns, data, title) => {
  try {
    const doc = new jsPDF({ orientation: "l", unit: "mm", format: "a4" });
    const response = await fetch("/Heebo-Regular.ttf");
    const fontBlob = await response.blob();
    const base64Font = await convertFontToBase64(fontBlob);
    doc.addFileToVFS("Heebo-Regular.ttf", base64Font);
    doc.addFont("Heebo-Regular.ttf", "Heebo", "normal");
    doc.setFont("Heebo");

    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;

    const addFirstPageHeader = () => {
      const imgProps = doc.getImageProperties(icLogo);
      const imgWidth = 40;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      doc.addImage(icLogo, "PNG", pageWidth - imgWidth - 10, 10, imgWidth, imgHeight);

      doc.setFontSize(10);
      drawText(doc, 'בס"ד', 10, 10, { align: "left" });
      drawText(doc, formatDate(new Date()), 10, 20, { align: "left" });

      doc.setFontSize(18);
      drawText(doc, title, pageWidth / 2, 50, { align: "center" });
    };

    const addSubsequentPageHeader = (pageNum) => {
      doc.setFontSize(8);
      drawText(doc, `עמוד ${pageNum}`, pageWidth / 2, pageHeight - 10, { align: "center" });
    };

    const reversedTableData = data.map((row) =>
      Object.values(row).reverse().map((col) => (isRTL(col) ? reverseHebrewText(col) : col))
    );

    const tableColumnHeaders = columns.reverse().map((col) => (isRTL(col) ? reverseHebrewText(col) : col));

    let pageNum = 1;

    const addTable = (startY) => {
      const columnStyles = columns.reduce((acc, _, index) => {
        acc[index] = { cellWidth: "auto" };
        return acc;
      }, {});

      autoTable(doc, {
        head: [tableColumnHeaders],
        body: reversedTableData,
        startY: startY,
        theme: "grid",
        styles: {
          font: "Heebo",
          fontSize: 8,
          cellPadding: 1,
          overflow: "linebreak",
          cellWidth: "wrap",
          halign: "right",
          valign: "middle",
          lineColor: [0, 0, 0],
          lineWidth: 0.1,
        },
        headStyles: {
          fillColor: [235, 238, 249],
          textColor: [0, 0, 0],
          lineColor: [0, 0, 0],
          lineWidth: 0.1,
          halign: "right",
        },
        columnStyles,
        didDrawPage: () => {
          addSubsequentPageHeader(pageNum);
          pageNum++;
        },
      });
    };

    addFirstPageHeader();
    addTable(60);

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      drawText(doc, `מתוך ${totalPages}`, pageWidth / 2 - 10, pageHeight - 10, { align: "center" });
    }

    doc.save(`${title}.pdf`);
  } catch (error) {
    console.error("שגיאה ביצירת PDF:", error);
  }
};
