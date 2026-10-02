IF DB_ID('CadastroCurriculos') IS NULL
BEGIN
    EXEC('CREATE DATABASE CadastroCurriculos');
END
GO

USE CadastroCurriculos;
GO

IF OBJECT_ID('dbo.Candidates', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Candidates (
        Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        FullName NVARCHAR(150) NOT NULL,
        Email NVARCHAR(255) NOT NULL,
        Phone NVARCHAR(30) NULL,
        DesiredPosition NVARCHAR(150) NULL,
        ProfessionalSummary NVARCHAR(MAX) NULL,
        Origin NVARCHAR(20) NOT NULL DEFAULT 'Manual',
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME()
    );
END
GO