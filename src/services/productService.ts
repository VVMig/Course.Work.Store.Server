import {
  CommonErrorMessages,
  ProductErrorMessages,
} from "../constants/ErrorMessages";
import ApiError from "../exceptions/api-error";
import { Category } from "../constants/Category";
import { IAddProduct } from "../interfaces/productController";
import { ProductModel } from "../models/Product";
import { generateProductResponse } from "../helpers/productServiceHelper";
import { getAllCategories } from "../helpers/common";
import ImageKit from "imagekit";
import { v4 as uuid_v4 } from "uuid";
import { IProductImage } from "interfaces/productModel";

class ProductService {
  async addProduct({
    amount,
    briefInformation,
    description,
    images,
    price,
    title,
    commonId,
    category,
  }: IAddProduct) {
    if (!amount || !price || !title || !category) {
      throw ApiError.BadRequest(ProductErrorMessages.REQUIRED_FIELDS);
    }

    if (!Object.values(Category).includes(category)) {
      throw ApiError.BadRequest(ProductErrorMessages.INVALID_CATEGORY);
    }

    const imagekit = new ImageKit({
      privateKey: process.env.IMAGERKIT_PRIVATE_KEY,
      publicKey: "public_f1Hak6ATynuqOpVdiDzKNI6a1pU=",
      urlEndpoint: "https://ik.imagekit.io/9wyroybev",
    });

    const imagesStore: IProductImage[] = [];

    if (images) {
      for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
        const res = await imagekit.upload({
          file: images[imageIndex],
          fileName: uuid_v4(),
        });

        imagesStore.push({
          isMain: imageIndex === 0,
          url: res.thumbnailUrl,
        });
      }
    }

    const product = await ProductModel.create({
      price,
      amount,
      briefInformation,
      description,
      title,
      images: imagesStore,
      commonId,
      category,
    });

    return generateProductResponse(product);
  }

  async editProduct(
    id: string,
    {
      amount,
      briefInformation,
      description,
      images,
      price,
      title,
      commonId,
      category,
    }: IAddProduct
  ) {
    const product = await ProductModel.findById(id);

    if (!product) {
      throw ApiError.BadRequest(CommonErrorMessages.INVALID_ID);
    }

    if (!amount || !price || !title || !category) {
      throw ApiError.BadRequest(ProductErrorMessages.REQUIRED_FIELDS);
    }

    if (!Object.values(Category).includes(category)) {
      throw ApiError.BadRequest(ProductErrorMessages.INVALID_CATEGORY);
    }

    const imagekit = new ImageKit({
      privateKey: process.env.IMAGERKIT_PRIVATE_KEY,
      publicKey: "public_f1Hak6ATynuqOpVdiDzKNI6a1pU=",
      urlEndpoint: "https://ik.imagekit.io/9wyroybev",
    });

    const imagesStore: IProductImage[] = [];

    if (images) {
      for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
        const res = await imagekit.upload({
          file: images[imageIndex],
          fileName: uuid_v4(),
        });

        imagesStore.push({
          isMain: imageIndex === 0,
          url: res.thumbnailUrl,
        });
      }
    }

    product.amount = amount || product.amount;
    product.briefInformation = briefInformation || product.briefInformation;
    product.description = description || product.description;
    product.title = title || product.title;
    product.amount = amount || product.amount;
    product.price = price || product.price;
    product.category = category || product.category;
    product.images = imagesStore;

    await product.save();

    return generateProductResponse(product);
  }

  async getProduct(id: string) {
    const product = await ProductModel.findById(id);

    if (!product) {
      throw ApiError.BadRequest(CommonErrorMessages.INVALID_ID);
    }

    return generateProductResponse(product);
  }

  async getProductsByCategory(category: string) {
    const categories = getAllCategories();

    if (!categories.includes(category as Category)) {
      throw ApiError.BadRequest(ProductErrorMessages.INVALID_CATEGORY);
    }

    const products = await ProductModel.find({ category });

    if (!ProductErrorMessages) {
      throw ApiError.BadRequest(CommonErrorMessages.INVALID_ID);
    }

    return products
      .map(generateProductResponse)
      .map((product) => ({ ...product.product }))
      .filter((product) => product.amount > 0);
  }

  async removeProduct(id: string) {
    if (!id) {
      throw ApiError.BadRequest(ProductErrorMessages.REQUIRED_FIELDS);
    }

    const product = await ProductModel.findById(id);

    if (!product) {
      throw ApiError.BadRequest(CommonErrorMessages.INVALID_ID);
    }

    await product.delete();
  }

  async searchProducts(text: string) {
    if (!text) {
      return [];
    }

    const searchRegex = new RegExp(text, "i");

    const products = await ProductModel.find({
      title: {
        $regex: searchRegex,
      },
    });

    return products
      .map(generateProductResponse)
      .map((product) => ({ ...product.product }))
      .filter((product) => product.amount > 0);
  }

  async getAllProducts(page: number) {
    const productsPerPage = 10;

    const allProductsAmount = await ProductModel.count();

    const products = await ProductModel.find()
      .sort({ _id: 1 })
      .skip(page > 0 ? (page - 1) * productsPerPage : 0)
      .limit(productsPerPage);

    const mappedProducts = (
      await Promise.all(products.map((user) => generateProductResponse(user)))
    ).map((product) => product.product);

    return {
      products: mappedProducts,
      totalCounts: allProductsAmount,
    };
  }

  async newProducts(limit: number) {
    const products = await ProductModel.find()
      .sort({ $natural: -1 })
      .limit(limit);

    return products
      .map(generateProductResponse)
      .map((product) => ({ ...product.product }))
      .filter((product) => product.amount > 0);
  }

  async getSortedProduct(field: string, limit: number) {
    const products = await ProductModel.find().sort({ [field]: -1 }).limit(limit);

    return products
        .map(generateProductResponse)
        .map((product) => ({ ...product.product }))
        .filter((product) => product.amount > 0);
  }
}

export default new ProductService();
