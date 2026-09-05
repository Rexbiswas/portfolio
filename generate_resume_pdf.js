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
      let line3 = '';
      for (const w of words) {
        if ((line1 + ' ' + w).length <= maxChars) {
          line1 += (line1 ? ' ' : '') + w;
        } else if ((line2 + ' ' + w).length <= maxChars) {
          line2 += (line2 ? ' ' : '') + w;
        } else {
          line3 += (line3 ? ' ' : '') + w;
        }
      }
      page.drawText(line1, { x: margin + 20, y, size: 9, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
      y -= 12;
      if (line2) {
        page.drawText(line2, { x: margin + 20, y, size: 9, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
        y -= 12;
      }
      if (line3) {
        page.drawText(line3, { x: margin + 20, y, size: 9, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
        y -= 12;
      }
    } else {
      page.drawText(text, { x: margin + 20, y, size: 9, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
      y -= 12;
    }
  }

  // Header
  addTitle('RISHI BISWAS');
  addSubtitle('Full Stack Developer');
  addText('Phone: +91 - 9625065557  |  Email: rexbiswas1@gmail.com  |  Location: Karol Bagh, Delhi, India', 9, false, rgb(0.3, 0.3, 0.3));
  addText('LinkedIn: linkedin.com/Rishi Biswas  |  Portfolio: portfolio/Rishi Biswas', 9, false, rgb(0.3, 0.3, 0.3));

  // About Me
  addSectionHeader('About Me');
  addText('Skilled Full-Stack Developer experienced in building responsive, high-performance web', 9.5);
  addText('applications using React, JavaScript, Node.js, Express.js, PHP, and modern UI technologies.', 9.5);
  addText('Proficient in MongoDB, MySQL, and SQLite, with a strong focus on scalable architecture,', 9.5);
  addText('optimized performance, clean design, and seamless user experiences.', 9.5);

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
  y -= 4;

  addText('E-Books Library', 10, true);
  addText('Github: https://github.com/Rexbiswas/lumora-books-library  |  Live: https://github.com/Rexbiswas/lumora-books-library', 8.5, false, rgb(0, 0.4, 0.8));
  addText('Developed an immersive animated eBook library using Next.js, React, Tailwind CSS, GSAP, Framer Motion,', 9);
  addText('and Three.js with interactive 3D experiences and smooth scrolling. Integrated MongoDB/Mongoose with', 9);
  addText('Google Books and Open Library APIs for dynamic book discovery and data management.', 9);

  // Technical Skills
  addSectionHeader('Technical Skills');
  addText('• Programming Languages: JavaScript, Python, R Programming, Core C++, HTML5, CSS3, C Programming', 9);
  addText('• Frontend Styling & UI Development: CSS, Responsive Design, Tailwind CSS, Bootstrap, Daisy UI', 9);
  addText('• JavaScript Libraries & Frameworks: React.js, GSAP, Lenis, Locomotive, Next.js, Howler.js, Lynx.js', 9);
  addText('• Backend, Server Technologies & API: Node.js, PHP, Express.js, Angular.js', 9);
  addText('• Development Tools / IDEs: Visual Studio Code, Sublime Text, Atom, PyCharm, Cursor AI', 9);
  addText('• Database Technologies: Relational databases (MySQL), NoSQL databases (MongoDB, SQLite)', 9);

  // Education
  addSectionHeader('Education');
  addText('Indira Gandhi National Open University (IGNOU) | 2023-2025', 10, true);
  addText('Economics Honours', 9, true, rgb(0.3, 0.3, 0.3));
  addText('Graduate in Economics (Hons) with a strong foundation in economic principles, data analysis, and research,', 8.5);
  addText('capable of applying analytical thinking to real-world financial and market challenges.', 8.5);
  y -= 4;

  addText('CBSE | 2021-2022', 10, true);
  addText('Higher Secondary (12th)', 9, true, rgb(0.3, 0.3, 0.3));
  addText('Completed Higher Secondary (12th) under the CBSE board with a strong academic', 8.5);
  addText('foundation and developed analytical, communication, and problem-solving skills.', 8.5);
  y -= 4;

  addText('CBSE | 2018-2021', 10, true);
  addText('Secondary (10th)', 9, true, rgb(0.3, 0.3, 0.3));
  addText('Completed Secondary (10th) under the CBSE board, building a solid foundation in', 8.5);
  addText('core subjects and essential academic skills.', 8.5);

  // Personal Info
  addSectionHeader('Personal Information');
  addText('Date of Birth: 22-11-2003   |   Nationality: Indian   |   Marital Status: Bachelor', 9);
  addText('Hobbies: Cricket and Listening to music', 9);

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('./public/resume.pdf', pdfBytes);
  console.log('Successfully generated ./public/resume.pdf');
}

generatePDF().catch(console.error);
