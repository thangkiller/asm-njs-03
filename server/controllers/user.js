require("dotenv").config();
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const Cart = require("../models/Cart");
const Checkout = require("../models/Checkout");
const Product = require("../models/Product");

exports.getUser = async (req, res, next) => {
   const userId = req.params.userId;
   const user = await User.findById(userId);
   if (!user) {
      next(new Error("user is not exist"));
   }
   console.log("co user!");
   return res.status(200).send({ ...user._doc, passwordHash: undefined });
};
exports.getUsers = async (req, res, next) => {
   const users = await User.find({});
   if (users.length === 0) {
      next(new Error("user is not exist"));
   }
   const usersRes = users.map((user) => {
      return {
         ...user._doc,
         passwordHash: undefined,
      };
   });
   console.log("co users!");
   return res.status(200).send(usersRes);
};
exports.getCart = async (req, res, next) => {
   console.log("da vao CART");
   const userId = req.session.user._id;
   const cart = await Cart.findOne({ userId });
   if (!cart) {
      next(new Error("cart not found"));
   }
   const cartResponse = await Promise.all(
      cart._doc.product.map(async (prod, i) => {
         const product = await Product.findById(prod.productId);
         return {
            idProduct: prod.productId,
            nameProduct: product.name,
            priceProduct: product.price,
            img: product.img1,
            idUser: userId,
            count: prod.count,
         };
      })
   );
   return res.status(200).send(cartResponse);
};
exports.postAddToCart = async (req, res, next) => {
   console.log("vao add to cart");
   const { count, idProduct } = req.query;
   const userId = req.session.user._id;
   const cart = await Cart.findOne({ userId });
   if (!cart) {
      const newCart = {
         userId,
         product: [
            {
               productId: idProduct,
               count: Number(count),
            },
         ],
      };
      await Cart.create(newCart);
      return res.status(200).send({ message: "update cart successful" });
   }
   const newProductsInCart = cart._doc.product.reduce((accu, { productId, count: productCount }, i, arr) => {
      let el = {};
      if (String(productId) === idProduct) {
         el = {
            productId: String(productId),
            count: productCount + Number(count),
         };
      } else if (i === arr.length - 1) {
         el = [
            {
               productId: String(productId),
               count: productCount,
            },
            {
               productId: idProduct,
               count: Number(count),
            },
         ];
      } else {
         el = {
            productId: String(productId),
            count: productCount,
         };
      }
      console.log("el la ", el);
      return accu.concat(el);
   }, []);
   const result = await Cart.updateOne({ userId }, { product: newProductsInCart });
   if (result.matchedCount === 0) {
      next(new Error("error database"));
   }
   return res.status(200).send({ message: "update cart successfull" });
};
exports.deleteToCart = async (req, res, next) => {
   console.log("vao deleteToCart");
   const prodId = req.query.idProduct;
   const userId = req.session.user._id;
   const cart = await Cart.findOne({ userId });
   if (!cart) {
      next(new Error("cart not found"));
   }
   const newProductsInCart = cart._doc.product
      .filter(({ productId }) => {
         return String(productId) === prodId ? false : true;
      })
      .map(({ productId, count }) => ({
         productId,
         count,
      }));
   if (newProductsInCart.length === 0) {
      await Cart.deleteOne({ userId });
      return res.status(200).send({
         message: "delete product in cart successfull",
      });
   }
   const newCart = {
      userId,
      product: newProductsInCart,
   };
   const result = await Cart.updateOne({ userId }, newCart);
   if (result.matchedCount === 0) {
      next(new Error("error database"));
   }
   return res.status(200).send({
      message: "delete product in cart successfull",
   });
};
exports.putToCart = async (req, res, next) => {
   const { idProduct, count } = req.query;
   const userId = req.session.user._id;

   const cart = await Cart.findOne({ userId });
   if (!cart) {
      await Cart.create({
         userId,
         product: [
            {
               productId: idProduct,
               count: Number(count),
            },
         ],
      });
      return res.status(200).send({ message: "put product to cart successful" });
   }
   const putedProducts = cart.product.reduce((acc, value, i, arr) => {
      let el = {};
      if (String(value.productId) === idProduct) {
         el = {
            productId: idProduct,
            count,
         };
      } else if (i === arr.length - 1) {
         el = [
            {
               productId: value.productId,
               count: value.count,
            },
            {
               productId: idProduct,
               count,
            },
         ];
      } else {
         el = {
            productId: value.productId,
            count: value.count,
         };
      }
      return acc.concat(el);
   }, []);
   const result = await Cart.updateOne({ userId }, { product: putedProducts });
   if (result.matchedCount === 0) {
      next(new Error("cart not found"));
   }
   return res.status(200).send({ message: "put to cart success" });
};
exports.postCheckout = async (req, res, next) => {
   console.log("vao checkout!");
   const result = validationResult(req);
   if (!result.isEmpty()) {
      return next(new Error(result.array()[0]));
   }
   const { to: email, fullname, phone, address } = req.body;
   const userId = req.session.user._id;
   const user = await User.findOne({ email });
   if (!user) {
      return next(new Error("Not found user by email"));
   }
   const cart = await Cart.findOne({ userId: user._id }).populate("product.productId").exec();
   console.log("🚀 ~ exports.postCheckout= ~ cart:", cart);
   if (!cart) {
      return next(new Error("Not found"));
   }

   await Checkout.create({
      userId,
      fullname,
      email,
      phone,
      address,
      products: cart.product.map((prod) => ({ product: prod.productId, count: prod.count })),
   });

   const transport = nodemailer.createTransport({
      service: "gmail",
      secure: false, // upgrade later with STARTTLS
      auth: {
         user: process.env.EMAIL_USERNAME,
         pass: process.env.EMAIL_PASSWORD,
      },
   });

   const dataTable = cart.product.reduce(
      (acc, prod) => {
         const name = prod.productId.name;
         const image = prod.productId.img1;
         const price = prod.productId.price;
         const count = prod.count;
         const total = Number(count) * Number(price);
         acc.content += `
      <tr>
      <td>${name}</td>
      <td><div style="width: 80px;"><img src=${image} style="object-fit: contain;width: 100%;" alt="shop-img"'/></div></td>
      <td>${price}</td>
      <td>${count}</td>
      <td>${total}</td>
      </tr>
      `;
         acc.total += total;
         return acc;
      },
      { content: "", total: 0 }
   );

   const htmlMail = `
   <h1>Xin Chào ${fullname}</h1>
   <p>Phone: ${phone}</p>
   <p>Address:${address}</p>
   <table>
   <tr>
   <th>Tên Sản Phẩm</th>
   <th>Hình Ảnh</th>
   <th>Giá</th>
   <th>Số lượng</th>
   <th>Thành Tiền</th>
   </tr>
   ${dataTable.content}
   </table>
   <h1>Tổng Thanh Toán:</h1>
   <h1>${dataTable.total} total VND</h1>
   <h1>Cảm ơn bạn!</h1>
   `;

   const message = {
      from: "nguyenvanthanghy111999@gmail.com",
      to: "ngenvan000@gmail.com",
      subject: "send email automatic",
      text: "shop send your checkout!",
      html: htmlMail,
   };

   transport.sendMail(message, (error) => {
      if (error) {
         return next(error);
      }
      console.log("da gui email");
      Cart.deleteOne({ userId });
      return res.status(200).send("thanh cong");
   });
};
exports.getHistories = async (req, res, next) => {
   console.log("VAO MAIN HISTORY");
   const userId = req.session.user._id;
   const histories = await Checkout.find({ userId }).limit(10).exec();
   if (histories.length === 0) {
      return next(new Error("has not checkout of user"));
   }
   const historiesRes = histories.map(({ _doc: { __v, ...restEl } }) => restEl);
   return res.status(200).send(historiesRes);
};
exports.getDetailHistory = async (req, res, next) => {
   console.log("VAO DETAIL HISTORY");
   const checkoutId = req.params.id;
   const checkout = await Checkout.findById(checkoutId).populate("products.product").exec();
   if (!checkout) {
      return next(new Error("not found information order"));
   }
   const { _doc: order } = checkout;
   return res.status(200).send(order);
};
