exports.isLogin = (req, res, next) => {
   if (req.session.isLogin) {
      console.log("da login");
      return next();
   }
   console.log("chua login");

   return res.status(401).send({ message: "unauthorized" });
};
exports.isCounselorsOrAdmin = (req, res, next) => {
   if (req.session.user.role === "conselors" || req.session.user.role === "admin") {
      console.log("is company!");
      return next();
   }
   return res.status(401).send({ message: "unauthorized" });
};
exports.isAdmin = (req, res, next) => {
   if (req.session.user.role === "admin") {
      console.log("is admin");
      return next();
   }
   return res.status(401).send({ message: "unauthorized" });
};
