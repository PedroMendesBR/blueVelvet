import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { Validation } from '../../shared/middleware/Validation';
import { IProduct } from '../../types/product';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteValidation = Validation((getSchema) => ({
    params: getSchema<{ id: number }>(yup.object().shape({
        id: yup.number().required(),
    })),
}));

export async function deleteProduct(req: Request<{ id: string }>, res: Response) {
    try {
        const { id } = req.params;

        const existingProduct = await prisma.product.findUnique({
            where: {
                id: parseInt(id, 10),
            },
        });

        if (!existingProduct) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        await prisma.product.delete({
            where: {
                id: parseInt(id, 10),
            },
        });

        return res.status(200).json({ message: 'Produto deletado com sucesso.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao deletar o produto.' });
    }
}