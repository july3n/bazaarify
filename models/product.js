const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Referance to users model
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
// const mongodb = require('mongodb');

// const getDb = require('../util/database').getDb;

// const ObjectId = mongodb.ObjectId;

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       //Update
//       dbOp = db
//         .collection('products')
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         return products;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find({ _id: new ObjectId(prodId) })
//       .next()
//       .then(product => {
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
//   static deleteById(prodId, userId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new ObjectId(prodId) })
//       .then(result => {
//         return db.collection('users').updateOne(
//           { _id: new ObjectId(userId) },
//           {
//             $pull: {
//               'cart.items': { productId: new ObjectId(prodId) },
//             },
//           }
//         );
//       })
//       .then(result => {
//         console.log('Cart Item Deleted');
//       })
//       .then(() => {
//         console.log('Product Deleted');
//       });
//   }
// }

// module.exports = Product;
