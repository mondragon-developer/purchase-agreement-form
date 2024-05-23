document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    let currentStep = 0;

    function showStep(index) {
        steps.forEach((step, idx) => {
            step.style.display = idx === index ? 'block' : 'none';
        });
    }

    function nextStep() {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    }

    function previousStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    }

    showStep(currentStep);

    const nextButtons = document.querySelectorAll('.next-button');
    nextButtons.forEach(button => {
        button.addEventListener('click', nextStep);
    });

    const previousButtons = document.querySelectorAll('.previous-button');
    previousButtons.forEach(button => {
        button.addEventListener('click', previousStep);
    });

    document.getElementById('open-pdf').addEventListener('click', async function() {
        try {
            const form = document.getElementById('purchase-agreement-form');
            const formData = new FormData(form);

            const datePrepared = formData.get('date-prepared');
            const buyerName = formData.get('buyer-name');
            const propertyAddress = formData.get('property-address');
            const city = formData.get('city');
            const county = formData.get('county');
            const zipCode = formData.get('zip-code');
            const parcelNumber = formData.get('parcel-number');
            const purchasePrice = formData.get('purchase-price');
            const closeOfEscrow = formData.get('close-of-escrow');
            const listingAgent = formData.get('listing-agent');
            const listingAgentType = formData.get('listing-agent-type');
            const sellingAgent = formData.get('selling-agent');
            const sellingAgentType = formData.get('selling-agent-type');
            const balanceOfDownPayment = formData.get('balance-of-down-payment');

            const url = 'California-Residential-Purchase-pag1.pdf';
            const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

            const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];

            // Adjust font size and coordinates for better alignment
            const fontSize = 8;

            firstPage.drawText(datePrepared, { x: 100, y: 694, size: fontSize });
            firstPage.drawText(buyerName, { x: 200, y: 675, size: fontSize });
            firstPage.drawText(propertyAddress, { x: 300, y: 664, size: fontSize });
            firstPage.drawText(city, { x: 80, y: 651, size: fontSize });
            firstPage.drawText(county, { x: 205, y: 651, size: fontSize });
            firstPage.drawText(zipCode, { x: 320, y: 651, size: fontSize });
            firstPage.drawText(parcelNumber, { x: 480, y: 651, size: fontSize });
            firstPage.drawText(`$${purchasePrice}`, { x: 460, y: 633, size: fontSize });
            firstPage.drawText(closeOfEscrow, { x: 210, y: 623, size: fontSize });
            firstPage.drawText(listingAgent, { x: 140, y: 563, size: fontSize });
            firstPage.drawText(listingAgentType, { x: 330, y: 563, size: fontSize });
            firstPage.drawText(sellingAgent, { x: 140, y: 543, size: fontSize });
            firstPage.drawText(sellingAgentType, { x: 330, y: 543, size: fontSize });
            firstPage.drawText(`$${balanceOfDownPayment}`, { x: 510, y: 131, size: fontSize });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const urlBlob = URL.createObjectURL(blob);
            window.open(urlBlob, '_blank');
            URL.revokeObjectURL(urlBlob);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("An error occurred while generating the PDF. Please check the console for more details.");
        }
    });
});
