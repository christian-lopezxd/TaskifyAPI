BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Usuario] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [creadoEn] DATETIME2 NOT NULL CONSTRAINT [Usuario_creadoEn_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizadoEn] DATETIME2 NOT NULL,
    CONSTRAINT [Usuario_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Usuario_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Tarea] (
    [id] INT NOT NULL IDENTITY(1,1),
    [titulo] NVARCHAR(1000) NOT NULL,
    [descripcion] NVARCHAR(1000),
    [completada] BIT NOT NULL CONSTRAINT [Tarea_completada_df] DEFAULT 0,
    [usuarioId] INT NOT NULL,
    [creadoEn] DATETIME2 NOT NULL CONSTRAINT [Tarea_creadoEn_df] DEFAULT CURRENT_TIMESTAMP,
    [actualizadoEn] DATETIME2 NOT NULL,
    CONSTRAINT [Tarea_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Tarea] ADD CONSTRAINT [Tarea_usuarioId_fkey] FOREIGN KEY ([usuarioId]) REFERENCES [dbo].[Usuario]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
