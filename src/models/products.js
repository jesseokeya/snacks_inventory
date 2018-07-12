import mongoose from 'mongoose'

const Product = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    handle: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    },
    vendor: {
        type: String,
        required: true
    },
    productType: {
        type: String
    },
    tags: {
        type: Array, "default": []
    },
    variants: [{
        title: String,
        option: String,
        requiresShipping: Boolean,
        taxable: Boolean,
        featuredImage: String,
        available: Boolean,
        price: String,
        grams: Number,
    }],
    images: [{
        dateCreated: Date,
        dateUpdated: Date,
        src: String
    }]
})

const ProductSchema = mongoose.model('Product', Product)

export { ProductSchema }