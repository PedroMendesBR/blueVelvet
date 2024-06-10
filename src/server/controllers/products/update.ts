import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { IProduct } from '../../types/product';
import * as yup from 'yup';

const prisma = new PrismaClient();

export const updateValidation = (req: Request, res: Response, next: Function) => {
    const schema = yup.object().shape({
        name: yup.string().min(2),
        shortDescription: yup.string().min(10),
        brand: yup.string(),
        category: yup.string(),
        listPrice: yup.number(),
        cost: yup.number(),
    });

    schema.validate(req.body)
        .then(() => next())
        .catch((error) => {
            res.status(400).json({ error: error.message });
        });
};

export async function updateProduct(req: Request<{ id: string }, {}, Partial<IProduct>>, res: Response) {
    try {
        const { id } = req.params;
        const { name, shortDescription, brand, category, listPrice, cost } = req.body;

        const updatedProduct = await prisma.product.update({
            where: {
                id: parseInt(id, 10),
            },
            data: {
                name,
                shortDescription,
                brand,
                category,
                listPrice,
                cost,
            },
        });

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).send('Erro interno do servidor');
    }
}