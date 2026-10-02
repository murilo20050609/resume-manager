import express from 'express';
import multer from 'multer';
import candidatesRouter from './routes/candidates.js';
import pdfRouter from './routes/pdf.js';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.use('/candidates', candidatesRouter);
app.use('/candidates', pdfRouter);

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