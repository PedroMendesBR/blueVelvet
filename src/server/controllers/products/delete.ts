import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { Validation } from '../../shared/middleware/Validation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteValidation = Validation((getSchema) => ({
    body: getSchema<{ name: string, brand: string, shortDescription: string }>(yup.object().shape({
        name: yup.string().required(),
        brand: yup.string().required(),
        shortDescription: yup.string().required(),
    })),
}));

export async function deleteProduct(req: Request, res: Response) {
    try {
        const { name, brand, shortDescription } = req.body;

        if (!name || !brand || !shortDescription) {
            return res.status(400).json({ error: 'Nome, marca e descrição curta são obrigatórios.' });
        }

        const existingProduct = await prisma.product.findFirst({
            where: {
                name,
                brand,
                shortDescription,
            },
        });

        if (!existingProduct) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        await prisma.product.delete({
            where: {
                id: existingProduct.id,
            },
        });

        return res.status(200).json({ message: 'Produto deletado com sucesso.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao deletar o produto.' });
    }
}
