import multer from "multer";

// Usar o  memoryStorage para armazenar os arquivos em memória e em seguida enviar para o cloudinary

export default {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 4 * 1024 * 1024, // 4MB
  },
  fileFilter: (_req: any, file: Express.Multer.File, cb: any) => {
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Formato de arquivo inválido, use: jpeg, jpg, png ou webp"));
    }
  },
};
