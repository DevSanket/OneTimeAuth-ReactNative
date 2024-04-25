const routes = require("./routes");

const router = require("express").Router();

router.use("/auth", routes.AuthRoutes);

module.exports = router;
