import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';

async function generatePDF() {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let page = pdfDoc.addPage([595.28, 841.89]); // A4 page size
  const { width, height } = page.getSize();
  const margin = 40;
  let y = height - margin;

  function addTitle(text) {
    page.drawText(text, { x: margin, y, size: 22, font: fontBold, color: rgb(0.1, 0.1, 0.1) });
    y -= 24;
  }

  function addSubtitle(text) {
    page.drawText(text, { x: margin, y, size: 12, font: fontBold, color: rgb(0.1, 0.35, 0.65) });
    y -= 16;
  }

  function addSectionHeader(text) {
    y -= 8;
    if (y < 60) {
      page = pdfDoc.addPage([595.28, 841.89]);
      y = height - margin;
    }
    page.drawText(text.toUpperCase(), { x: margin, y, size: 11, font: fontBold, color: rgb(0.1, 0.1, 0.1) });
    y -= 4;
    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 1,
      color: rgb(0.7, 0.7, 0.7),
    });
    y -= 14;
  }

  function addText(text, size = 9.5, isBold = false, color = rgb(0.2, 0.2, 0.2)) {
    if (y < 50) {
      page = pdfDoc.addPage([595.28, 841.89]);
      y = height - margin;
    }
    const font = isBold ? fontBold : fontRegular;
    page.drawText(text, { x: margin, y, size, font, color });
    y -= size + 4;
  }

  function addBullet(text) {
    if (y < 50) {
      page = pdfDoc.addPage([595.28, 841.89]);
      y = height - margin;
    }
    page.drawText('•', { x: margin + 8, y, size: 9.5, font: fontBold, color: rgb(0.2, 0.2, 0.2) });
    const maxChars = 85;
    if (text.length > maxChars) {
      const words = text.split(' ');
      let line1 = '';
      let line2 = '';
      for (const w of words) {
        if ((line1 + ' ' + w).length <= maxChars) {
          line1 += (line1 ? ' ' : '') + w;
        } else {
          line2 += (line2 ? ' ' : '') + w;
        }
      }
      page.drawText(line1, { x: margin + 20, y, size: 9, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
      y -= 12;
      if (line2) {
        page.drawText(line2, { x: margin + 20, y, size: 9, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
        y -= 12;
      }
    } else {
      page.drawText(text, { x: margin + 20, y, size: 9, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
      y -= 12;
    }
  }

  // Header
  addTitle('RISHI BISWAS');
  addSubtitle('Web Developer');
  addText('Phone: +91 - 9625065557  |  Email: rexbiswas1@gmail.com  |  Location: Karol Bagh, Delhi, India', 9, false, rgb(0.3, 0.3, 0.3));
  addText('LinkedIn: linkedin.com/in/RishiBiswas  |  Portfolio: portfolio/Rishi Biswas', 9, false, rgb(0.3, 0.3, 0.3));

  // About Me
  addSectionHeader('About Me');
  addText('I am a frontend developer experienced in building responsive, visually engaging, and efficient', 9.5);
  addText('web interfaces using HTML, CSS, JavaScript, and modern frameworks, focused on delivering', 9.5);
  addText('smooth user experiences and clean, optimized designs.', 9.5);

  // Experience
  addSectionHeader('Professional Experience');
  addText('Freelance Web Developer & Designer | Self-Employed | INSD', 10, true);
  addText('Key Project: Responsive Web Architecture & Branding | Feb 2026 – Present', 8.5, false, rgb(0.4, 0.4, 0.4));
  addText('Live Preview: https://insd-project.vercel.app/  |  onsite Live: https://insd.edu.in/', 8.5, false, rgb(0, 0.4, 0.8));
  y -= 2;
  addBullet('Engineered and deployed high-performance web applications using modern JavaScript libraries including GSAP, Lenis Scroll, and Three.js to create immersive, interactive user experiences.');
  addBullet('Architected robust front-end interfaces, managing hosting and seamless continuous integration via Vercel.');
  addBullet('Collaborated closely with corporate stakeholders to draft Memorandums of Understanding (MoUs), gather technical requirements, and translate brand identities into polished digital solutions.');
  addBullet('Optimised website performance and asset loading, achieving faster render times and superior cross-device responsiveness.');

  // Projects
  addSectionHeader('Projects');
  addText('Sneaker Website', 10, true);
  addText('Github: https://github.com/Rexbiswas/sneakerhead  |  Live: https://sneakerhead-khaki.vercel.app/', 8.5, false, rgb(0, 0.4, 0.8));
  addText('Built a modern e-commerce platform using React, APIs, Framer Motion, Lenis, and GSAP for smooth animations', 9);
  addText('and fluid scrolling. Applied basic WebGL and Three.js concepts to create interactive 3D elements,', 9);
  addText('enhancing visual engagement and overall user experience.', 9);
  y -= 4;

  addText('Cookies Website', 10, true);
  addText('Github: https://github.com/Rexbiswas/coralcookies  |  Live: https://coralcookies.vercel.app/', 8.5, false, rgb(0, 0.4, 0.8));
  addText('Engineered a high-performance React webapp integrating Matter.js for 2D rigid-body physics, utilizing GSAP', 9);
  addText('for complex visual timelines and Lenis for smooth-scroll synchronization to deliver a seamless, interactive user experience.', 9);

  // Technical Skills
  addSectionHeader('Technical Skills');
  addText('• Programming Languages: JavaScript, Python, R Programming, Core C++', 9);
  addText('• Frontend Styling & UI Development: CSS, Responsive Design, Tailwind CSS, Bootstrap', 9);
  addText('• JavaScript Libraries & Frameworks: React.js, GSAP, Lenis.js, Locomotive.js', 9);
  addText('• Backend & Server Technologies: Node.js, PHP', 9);
  addText('• Development Tools / IDEs: Visual Studio Code, Sublime Text, Atom, PyCharm, Cursor AI', 9);
  addText('• Database Technologies: Relational databases (MySQL), NoSQL databases (MongoDB)', 9);

  // Education
  addSectionHeader('Education');
  addText('Indira Gandhi National Open University (IGNOU) | 2023-2025', 10, true);
  addText('Economics Honours (Graduate)', 9, true, rgb(0.3, 0.3, 0.3));
  addText('Graduate in Economics (Hons) with a strong foundation in economic principles, data analysis, and research,', 8.5);
  addText('capable of applying analytical thinking to real-world financial and market challenges.', 8.5);
  y -= 4;

  addText('CBSE | 2021-2022', 10, true);
  addText('Higher Secondary (12th) - Completed under CBSE board with strong academic foundation.', 8.5);
  y -= 4;

  addText('CBSE | 2018-2021', 10, true);
  addText('Secondary (10th) - Completed under CBSE board building solid foundation in core subjects.', 8.5);

  // Personal Info
  addSectionHeader('Personal Information');
  addText('Date of Birth: 22-11-2003   |   Nationality: Indian   |   Marital Status: Bachelor', 9);
  addText('Hobbies: Cricket and Listening to music', 9);

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('./public/resume.pdf', pdfBytes);
  console.log('Successfully generated ./public/resume.pdf');
}

generatePDF().catch(console.error);
