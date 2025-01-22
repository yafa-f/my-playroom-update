import { jsPDF } from "jspdf";
import icLogo from "../../assets/המשחקיה.png";

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

const reverseHebrewText = (text) => text.split("").reverse().join("");

export const stickerPDF = async (data, color) => {
  try {
    const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
    const response = await fetch("/Heebo-ExtraBold.ttf");
    const fontBlob = await response.blob();
    const base64Font = await convertFontToBase64(fontBlob);
    doc.addFileToVFS("Heebo-ExtraBold.ttf", base64Font);
    doc.addFont("Heebo-ExtraBold.ttf", "Heebo", "normal");
    doc.setFont("Heebo");

    // Draw the colored square
    const squareSize = 100; // Size of the square
    const x = 10; // X position of the rectangle
    const y = 10; // Y position of the rectangle

    doc.setFillColor(color);
    doc.setDrawColor(0, 0, 0); // Set border color to black
    doc.rect(x, y, squareSize, squareSize, "FD");

    // Load the logo
    const logo = icLogo;
    const imgProps = doc.getImageProperties(logo);
    const imgWidth = squareSize * 0.8; // Adjust width to fit inside the square
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    // Calculate image position to center it within the rectangle
    const imgX = x + (squareSize - imgWidth) / 2;
    const imgY = y + (squareSize - imgHeight) / 2;

    // Add the image inside the rectangle
    doc.addImage(logo, "PNG", imgX, imgY, imgWidth, imgHeight);

    // Set font and add text
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black text for contrast
    doc.text(reverseHebrewText(`קוד משחק: ${data.code}`), 60, 30, { align: "center" });
    doc.text(reverseHebrewText(`שם משחק: ${data.name}`), 60, 50, { align: "center" });

    doc.save(`${data.name}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

// import { jsPDF } from "jspdf";
// import icLogo from "../../assets/המשחקיה.png";

// function convertFontToBase64(fontBlob) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = function (event) {
//       const arrayBuffer = event.target.result;
//       const base64String = btoa(
//         String.fromCharCode(...new Uint8Array(arrayBuffer))
//       );
//       resolve(base64String);
//     };
//     reader.onerror = reject;
//     reader.readAsArrayBuffer(fontBlob);
//   });
// }
// const reverseHebrewText = (text) => {
//   return text.split("").reverse().join("");
// };

// export const stickerPDF = async (data, color) => {
//   try {
//     const doc = new jsPDF({
//       orientation: "p",
//       unit: "mm",
//       format: "a4",
//     });
//     const response = await fetch("/Heebo-ExtraBold.ttf");
//     const fontBlob = await response.blob();
//     const base64Font = await convertFontToBase64(fontBlob);
//     doc.addFileToVFS("Heebo-ExtraBold.ttf", base64Font);
//     doc.addFont("Heebo-ExtraBold.ttf", "Heebo", "normal");
//     doc.setFont("Heebo");

//     // Draw the colored square
//     // const squareSize = 100; // 10 cm
//     doc.setFillColor(color);
//     doc.setDrawColor(0, 0, 0); // Set border color to black
//     const squareSize = 100; // Size of the square
//     const x = 10; // X position of the rectangle
//     const y = 10; // Y position of the rectangle

//     // Draw the rectangle
//     doc.rect(x, y, squareSize, squareSize, "FD");

//     // Load the logo
//     const logo = icLogo;
//     const imgProps = doc.getImageProperties(logo);
//     const imgWidth = squareSize * 0.8; // Adjust width to fit inside the square
//     const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

//     // Calculate image position to center it within the rectangle
//     const imgX = x + (squareSize - imgWidth) / 2;
//     const imgY = y + (squareSize - imgHeight) / 2;

//     // Add the image inside the rectangle
//     doc.addImage(logo, "PNG", imgX, imgY, imgWidth, imgHeight);
//     // Set font and add text
//     doc.setFontSize(12);
//     doc.setTextColor(0, 0, 0); // White text for contrast
//     doc.text(reverseHebrewText(`קוד משחק: ${data.code}`), 60, 30, {
//       align: "center",
//     }); // Adjust position as needed
//     doc.text(reverseHebrewText(`שם משחק: ${data.name}`), 60, 50, {
//       align: "center",
//     }); // Adjust position as needed

//     doc.save(`${data.name}.pdf`);
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//   }
// };
