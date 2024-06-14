import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { IProduct } from '../../types/product';
import * as yup from 'yup';

const prisma = new PrismaClient();

export const updateValidation = (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
        name: yup.string().min(2).required(),
        shortDescription: yup.string().min(10).required(),
        brand: yup.string().required(),
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

export async function updateProduct(req: Request<{}, {}, Partial<IProduct>>, res: Response) {
    try {
        const { name, shortDescription, brand, category, listPrice, cost } = req.body;

        if (!name || !shortDescription || !brand) {
            return res.status(400).json({ error: 'Nome, marca e descrição curta são obrigatórios.' });
        }

        const existingProduct = await prisma.product.findFirst({
            where: {
                name,
                shortDescription,
                brand,
            },
        });

        if (!existingProduct) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        const updatedProduct = await prisma.product.update({
            where: {
                id: existingProduct.id,
            },
            data: {
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
    