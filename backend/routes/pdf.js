import express from 'express';
import { PDFParse } from 'pdf-parse';
import multer from 'multer';
import { readFile } from 'fs/promises';

const router = express.Router();

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            return cb(new Error('Apenas arquivos PDF são permitidos'));
        }

        cb(null, true);
    }
});

function extractCandidateData(text) {
    const emailMatch = text.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);

    const phoneMatch = text.match(
        /(?:\(?\d{2}\)?\s?)?(?:9?\d{4})[-\s]?\d{4}/
    );

    const lines = text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

    const fullName = lines[0] || '';

    const experienceMatch = text.match(
        /EXPERIÊNCIA PROFISSIONAL\s+([\s\S]*?)(?=CURSOS E APRIMORAMENTOS|HABILIDADES|$)/i
    )

    const experienceText = experienceMatch
        ? experienceMatch[1].trim()
        : ''

    const firstPositionMatch = experienceText.match(
        /^(.+?)\s+\|\s+/m
    )

    const desiredPosition = firstPositionMatch
        ? firstPositionMatch[1].trim()
        : ''

    const skillsMatch = text.match(
        /HABILIDADES\s+([\s\S]*)$/i
    )

    const skills = skillsMatch
        ? skillsMatch[1].trim()
        : ''

    const professionalSummary = experienceText
        ? `${experienceText.split('\n').slice(0, 4).join(' ')}${skills ? ` Habilidades: ${skills}` : ''}`
        : ''

    return {
        fullName,
        email: emailMatch ? emailMatch[0] : '',
        phone: phoneMatch ? phoneMatch[0] : '',
        desiredPosition,
        professionalSummary
    };
}

router.post('/parse-pdf', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: 'Nenhum arquivo PDF foi enviado'
            });
        }

        const pdfBuffer = await readFile(req.file.path);

        const parser = new PDFParse({
            data: pdfBuffer
        });

        const data = await parser.getText();

        await parser.destroy();

        const candidateData = extractCandidateData(data.text);

        res.json({
            message: 'PDF lido com sucesso',
            fileName: req.file.originalname,
            candidate: candidateData,
            pdfPath: `/uploads/${req.file.filename}`,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Erro ao ler o PDF'
        });
    }
});

export default router;