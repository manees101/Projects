const products = require("../models/product");
const getAllProductsStatic = async (req, res) => {
    res.status(200).json({ msg: "Product Api Testing" });
}

const getAllProducts = async (req, res) => {
    try {
        const { featured, name, company, sort, fields, numericFilters } = req.query;
        const queryObject = {};
        if (featured) {
            queryObject.featured = featured === 'true' ? true : false;
        }
        if (name) {
            queryObject.name = { $regex: name, $options: "i" };
        }
        if (company) {
            queryObject.company = company;
        }
        if (numericFilters) {
            const operatorMap = {
                '>': '$gt',
                '<': '$lt',
                '>=': '$gte',
                '<=': '$lte',
                '=': '$eq'
            }
            const regEx = /\b(>|<|>=|<=|=)\b/g;
            let filter = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
            const options = ['name', 'price'];
            filter = filter.split(',').forEach((item) => {
                const [field, operator, value] = item.split('-');
                if (options.includes(field)) {
                    queryObject[field] = { [operator]: Number(value) };
                }
            })
        }
        let result = products.find(queryObject);
        if (sort) {
            const sortList = sort.split(",").join(" ");
            result = result.sort(sortList);
        }
        else {
            result = result.sort("createdAt");
        }
        if (fields) {
            const fieldsList = fields.split(",").join(" ");
            result = result.select(fieldsList);
        }

        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        let skip = (page - 1) * limit;

        result = result.skip(skip).limit(limit);
        const productsList = await result;
        res.status(200).json(productsList);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}