const pptxgen = require('pptxgenjs');
const fs = require('fs');

function getBase64(file) {
    let bitmap = fs.readFileSync(file);
    return "image/png;base64," + Buffer.from(bitmap).toString('base64');
}

async function createPresentation() {
    let pres = new pptxgen();
    pres.layout = 'LAYOUT_16x9';

    // Slide 1: Hero Title
    let slide1 = pres.addSlide();
    slide1.background = { data: getBase64("C:\\Users\\varun\\.gemini\\antigravity\\brain\\707e61b2-d308-4867-96ab-48e173d7b525\\slide_1_1778911282917.png") };

    // Slide 2: What is Bolt.new
    let slide2 = pres.addSlide();
    slide2.background = { data: getBase64("C:\\Users\\varun\\.gemini\\antigravity\\brain\\707e61b2-d308-4867-96ab-48e173d7b525\\slide_2_1778911303008.png") };

    // Slide 3: What is Figma
    let slide3 = pres.addSlide();
    slide3.background = { data: getBase64("C:\\Users\\varun\\.gemini\\antigravity\\brain\\707e61b2-d308-4867-96ab-48e173d7b525\\slide_3_1778911427856.png") };

    // Slide 4: The Workflow (5 Steps)
    let slide4 = pres.addSlide();
    slide4.background = { data: getBase64("C:\\Users\\varun\\.gemini\\antigravity\\brain\\707e61b2-d308-4867-96ab-48e173d7b525\\slide_4_1778911440583.png") };

    // Slide 5: Figma -> Bolt Deep Dive
    let slide5 = pres.addSlide();
    slide5.background = { data: getBase64("C:\\Users\\varun\\.gemini\\antigravity\\brain\\707e61b2-d308-4867-96ab-48e173d7b525\\slide_5_1778911572419.png") };

    // Slide 6: Feature Cards Grid
    let slide6 = pres.addSlide();
    slide6.background = { data: getBase64("C:\\Users\\varun\\.gemini\\antigravity\\brain\\707e61b2-d308-4867-96ab-48e173d7b525\\slide_6_1778911649650.png") };

    // Slide 7: CTA Closing (Since image generation failed, we create it with text/shapes)
    let slide7 = pres.addSlide();
    slide7.background = { color: "09090B" }; // Dark near-black
    
    // Title
    slide7.addText("START BUILDING TODAY", { 
        x: 0, y: 1.5, w: "100%", h: 2, 
        align: "center", fontSize: 48, bold: true, color: "FFFFFF" 
    });

    // Figma Button Placeholder
    slide7.addText("figma.com", { x: 2.5, y: 4, w: 2.5, h: 1, align: "center", fontSize: 24, bold: true, color: "FFFFFF", fill: { color: "1e1e1e" } });

    // Bolt Button Placeholder
    slide7.addText("bolt.new", { x: 5.5, y: 4, w: 2.5, h: 1, align: "center", fontSize: 24, bold: true, color: "FFFFFF", fill: { color: "1e1e1e" } });

    // Floating Labels
    slide7.addText("Design System", { x: 1, y: 1, w: 2, h: 0.5, color: "A1A1AA", fontSize: 14 });
    slide7.addText("AI-Generated Code", { x: 7, y: 6, w: 2.5, h: 0.5, color: "A1A1AA", fontSize: 14 });

    // Save the Presentation
    try {
        await pres.writeFile({ fileName: "Figma_to_Bolt_Presentation.pptx" });
        console.log("Presentation generated successfully!");
    } catch(err) {
        console.error("Error generating presentation:", err);
    }
}

createPresentation();
