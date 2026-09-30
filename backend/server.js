import express from 'express';
import { PDFParse } from 'pdf-parse';
import multer from 'multer';
import { poolPromise } from './config/database.js';

const app = express();

app.use(express.json());

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

app.get('/', (req, res) => {
    res.send('Hello World!');
});



const PORT = process.env.PORT || 3000;

app.get('/candidates', async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request().query(
            'SELECT * FROM Candidates'
        );

        res.json(result.recordset);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Erro ao buscar candidatos'
        });
    }
});

app.post('/candidates', async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            desiredPosition,
            professionalSummary
        } = req.body;

        if (!fullName) {
            return res.status(400).json({
                error: 'o campo fullName é obrigatório'
            });
        }

        if (!email) {
            return res.status(400).json({
                error: 'o campo email é obrigatório'
            });
        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!emailValido) {
            return res.status(400).json({
                error: 'o e-mail informado é inválido'
            });
        }

        const pool = await poolPromise;

        await pool.request()
            .input('fullName', fullName)
            .input('email', email)
            .input('phone', phone)
            .input('desiredPosition', desiredPosition)
            .input('professionalSummary', professionalSummary)
            .query(`
                INSERT INTO Candidates
                (FullName, Email, Phone, DesiredPosition, ProfessionalSummary, CreatedAt)
                VALUES
                (@fullName, @email, @phone, @desiredPosition, @professionalSummary, GETDATE())
            `);

        res.status(201).json({
            message: 'Candidato cadastrado com sucesso'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Erro ao cadastrar candidato'
        });
    }
});

app.get('/candidates/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await poolPromise;

        const result = await pool.request()
            .input('id', id)
            .query(`
                SELECT *
                FROM Candidates
                WHERE Id = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                error: 'Candidato não encontrado'
            });
        }

        res.json(result.recordset[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Erro ao buscar candidato'
        });
    }
});

app.put('/candidates/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const {
            fullName,
            email,
            phone,
            desiredPosition,
            professionalSummary
        } = req.body;

        if (!fullName) {
            return res.status(400).json({
                error: 'o campo fullName é obrigatório'
            });
        }

        if (!email) {
            return res.status(400).json({
                error: 'o campo email é obrigatório'
            });
        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!emailValido) {
            return res.status(400).json({
                error: 'o e-mail informado é inválido'
            });
        }

        const pool = await poolPromise;

        const result = await pool.request()
            .input('id', id)
            .input('fullName', fullName)
            .input('email', email)
            .input('phone', phone)
            .input('desiredPosition', desiredPosition)
            .input('professionalSummary', professionalSummary)
            .query(`
                UPDATE Candidates
                SET
                    FullName = @fullName,
                    Email = @email,
                    Phone = @phone,
                    DesiredPosition = @desiredPosition,
                    ProfessionalSummary = @professionalSummary
                WHERE Id = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({
                error: 'Candidato não encontrado'
            });
        }

        res.json({
            message: 'Candidato atualizado com sucesso'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Erro ao atualizar candidato'
        });
    }
});
app.post('/candidates/parse-pdf', upload.single('pdf'), async (req, res) => {
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

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                error: 'O arquivo PDF deve ter no máximo 5 MB'
            });
        }

        return res.status(400).json({
            error: 'Erro no envio do arquivo'
        });
    }

    if (error.message === 'Apenas arquivos PDF são permitidos') {
        return res.status(400).json({
            error: error.message
        });
    }

    console.error(error);

    res.status(500).json({
        error: 'Erro ao processar o arquivo'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});