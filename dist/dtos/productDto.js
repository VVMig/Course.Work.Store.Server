"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductDto {
    constructor({ id, title, description, price, briefInformation, images, amount, commonId, category }) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.id = id;
        this.briefInformation = briefInformation;
        this.images = images;
        this.amount = amount;
        this.commonId = commonId;
        this.category = category;
    }
}
exports.default = ProductDto;
//# sourceMappingURL=productDto.js.map