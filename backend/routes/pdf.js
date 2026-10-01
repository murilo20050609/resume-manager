import express from 'express';
import { PDFParse } from 'pdf-parse';
import multer from 'multer';

const router = express.Router();

const upload = multer({
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

    return {
        fullName,
        email: emailMatch ? emailMatch[0] : '',
        phone: phoneMatch ? phoneMatch[0] : '',
        desiredPosition: '',
        professionalSummary: ''
    };
}

router.post('/parse-pdf', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: 'Nenhum arquivo PDF foi enviado'
            });
        }

        const parser = new PDFParse({
            data: req.file.buffer
        });

        const data = await parser.getText();

        await parser.destroy();

        const candidateData = extractCandidateData(data.text);

        res.json({
            message: 'PDF lido com sucesso',
            fileName: req.file.originalname,
            candidate: candidateData
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Erro ao ler o PDF'
        });
    }
});

export default router;