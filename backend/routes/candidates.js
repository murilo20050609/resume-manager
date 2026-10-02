import express from 'express';
import { poolPromise } from '../config/database.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request().query(
            'SELECT * FROM Candidates ORDER BY CreatedAt DESC'
        );

        res.json(result.recordset);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Erro ao buscar candidatos'
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            desiredPosition,
            professionalSummary,
            origin,
            pdfPath
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
        if (!desiredPosition) {
            return res.status(400).json({
                error: 'o campo desiredPosition é obrigatório'
            });
        }

        if (!professionalSummary) {
            return res.status(400).json({
                error: 'o campo professionalSummary é obrigatório'
            });
        }

        const pool = await poolPromise;

        await pool.request()
            .input('fullName', fullName)
            .input('email', email)
            .input('phone', phone)
            .input('desiredPosition', desiredPosition)
            .input('professionalSummary', professionalSummary)
            .input('origin', origin)
            .input('pdfPath', pdfPath)
            .query(`
    INSERT INTO Candidates
    (FullName, Email, Phone, DesiredPosition, ProfessionalSummary, Origin, PdfPath, CreatedAt)
    VALUES
    (@fullName, @email, @phone, @desiredPosition, @professionalSummary, @origin, @pdfPath, GETDATE())
`)

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

router.get('/:id', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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
        if (!desiredPosition) {
            return res.status(400).json({
                error: 'o campo desiredPosition é obrigatório'
            });
        }

        if (!professionalSummary) {
            return res.status(400).json({
                error: 'o campo professionalSummary é obrigatório'
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

export default router;