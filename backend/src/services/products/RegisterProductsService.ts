import prismaClient from "../../prisma/index";
import cloudinary from "../../config/cloudinary";
import { Readable } from "node:stream";

interface RegisterProductsProps {
  name: string;
  description: string;
  price: string;
  category_id: string;
  bunnerBuffer: Buffer;
  bunnerName: string;
}

class RegisterProductsService {
  async execute({
    name,
    description,
    price,
    category_id,
    bunnerBuffer,
    bunnerName,
  }: RegisterProductsProps) {
    const categoryExists = await prismaClient.category.findFirst({
      where: {
        id: category_id,
      },
    });

    if (!categoryExists) {
      throw new Error("Categoria não encontrada");
    }

    const productExists = await prismaClient.product.findFirst({
      where: {
        name,
      },
    });

    if (productExists) {
      throw new Error("Produto já cadastrado");
    }

    // Enviar para o Cloudinary e pegar o link da imagem
    let bunnerUrl: string;

    try {
      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
            resource_type: "image",
            public_id: `${Date.now()}-${bunnerName.split(".")[0]}`,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        // criar o stream do buffer e fazer pipe(envio) para o cloudinary
        const bufferStream = Readable.from(bunnerBuffer);
        bufferStream.pipe(uploadStream);
      });

      bunnerUrl = result.secure_url;
    } catch (err) {
      console.error(err);
      throw new Error("Erro ao fazer upload da imagem");
    }

    const product = await prismaClient.product.create({
      data: {
        name,
        description,
        price: parseInt(price),
        category_id,
        bunner: bunnerUrl,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        category_id: true,
        bunner: true,
        createdAt: true,
      },
    })

    return product;
  }
}

export { RegisterProductsService };
