import express from 'express';
import { poolPromise } from './config/database.js';
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 


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
