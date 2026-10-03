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

const NAME_PARTICLES = new Set(['da', 'das', 'de', 'do', 'dos', 'e']);
const NON_NAME_KEYWORDS = /\b(curr[ií]culo|curriculum|resume|vitae|candidato|contato|resumo|experi[eê]ncia|forma[cç][aã]o|habilidades|objetivo|perfil|desenvolvedor|desenvolvedora|developer|engenheiro|engenheira|analista|gerente|especialista|consultor|consultora|estagi[aá]rio|estagi[aá]ria|tecnologia|n[ií]vel)\b/i;

function normalizeNameCandidate(line) {
    const candidate = line
        .trim()
        .replace(/^\d+[.)]\s*/u, '')
        .replace(/^[•·▪◦*-]\s*/u, '')
        .split(/\s+\|\s+/u, 1)[0]
        .replace(/^(?:nome(?:\s+completo)?|candidato(?:a)?)\s*[:\-]\s*/iu, '')
        .replace(/^(?:curr[ií]culo(?:\s+vitae)?|curriculum(?:\s+vitae)?|resume|cv)\s+(?:de\s+)?/iu, '')
        .replace(/\s+[–—-]\s+.*$/u, '')
        .trim()
        .replace(/[.,;:]+$/u, '');

    if (!candidate || /[@\d\/:()[\]]/u.test(candidate) || NON_NAME_KEYWORDS.test(candidate)) {
        return '';
    }

    const words = candidate.match(/[\p{L}]+(?:['’-][\p{L}]+)*/gu) || [];
    const isNameLike = words.length >= 2 &&
        words.length <= 6 &&
        words.filter(word => !NAME_PARTICLES.has(word.toLowerCase())).length >= 2 &&
        words.every(word =>
            NAME_PARTICLES.has(word.toLowerCase()) ||
            word === word.toUpperCase() ||
            /^[\p{Lu}][\p{Ll}]/u.test(word)
        ) &&
        /^[\p{L}\s'’-]+$/u.test(candidate);

    return isNameLike ? candidate : '';
}

function findCandidateName(lines) {
    const contactIndex = lines.findIndex(line =>
        /[^\s@]+@[^\s@]+\.[^\s@]+/.test(line) ||
        /(?:\(?\d{2}\)?\s?)?(?:9?\d{4})[-\s]?\d{4}/.test(line)
    );

    const candidates = lines
        .map((line, index) => ({
            name: normalizeNameCandidate(line),
            index
        }))
        .filter(candidate => candidate.name);

    if (candidates.length === 0) {
        return '';
    }

    if (contactIndex === -1) {
        return candidates[0].name;
    }

    candidates.sort((first, second) => {
        const firstDistance = Math.abs(first.index - contactIndex);
        const secondDistance = Math.abs(second.index - contactIndex);

        if (firstDistance !== secondDistance) {
            return firstDistance - secondDistance;
        }

        const firstIsBeforeContact = first.index < contactIndex;
        const secondIsBeforeContact = second.index < contactIndex;

        if (firstIsBeforeContact !== secondIsBeforeContact) {
            return firstIsBeforeContact ? -1 : 1;
        }

        return first.index - second.index;
    });

    return candidates[0].name;
}

export function extractCandidateData(text) {
    const emailMatch = text.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);

    const phoneMatch = text.match(
        /(?:\(?\d{2}\)?\s?)?(?:9?\d{4})[-\s]?\d{4}/
    );

    const lines = text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

    const fullName = findCandidateName(lines);

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
