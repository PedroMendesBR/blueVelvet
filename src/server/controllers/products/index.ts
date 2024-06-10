import * as createProduct from './create';
import * as updateProduct from './update';
import * as deleteProduct from './delete';
import * as getByName from './getName';
//import * as getAll from './getAll';

export const ProductsController = {
    ...createProduct,
    ...updateProduct,
    ...deleteProduct,
    ...getByName
    //...getAll
};