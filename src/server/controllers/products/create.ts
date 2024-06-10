import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { Validation } from '../../shared/middleware/Validation';
import { createProduct } from '../../shared/services/products/createProduct';
import { IProduct } from '../../types/product';

export const createValidation = Validation((getSchema) => ({
    body: getSchema<IProduct>(yup.object().shape({
        name: yup.string().required().min(2),
        shortDescription: yup.string().required().min(10),
        brand: yup.string().required(),
        category: yup.string().required(),
        listPrice: yup.number().required(),
        cost: yup.number().required(),
    })),
}));

export const create: RequestHandler = async (req: Request<{}, {}, IProduct>, res: Response) => {
    try {
        const product = await createProduct(req.body);
        return res.status(StatusCodes.CREATED).json(product);
    } catch (error: any) {
        if (error.status && error.errors) {
            return res.status(error.status).json({ errors: { default: error.errors } });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: 'Erro ao criar produto' } });
        }
    }
};