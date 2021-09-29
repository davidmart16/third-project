const router = require("express").Router();
const authRouter = require('./auth.routes')
const bookRouter = require('./book.routes')
const audioRouter = require('./audio.routes')
const fragmentRouter = require('./fragment.routes')
const commentRouter = require('./comment.routes')
const userRouter = require('./user.routes')
const uploadRouter = require('./uploads.routes')

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
router.use("/auth", authRouter)
router.use("/book", bookRouter)
router.use("/audio", audioRouter)
router.use("/fragment", fragmentRouter)
router.use("/comment", commentRouter)
router.use("/user", userRouter)
router.use("/upload", uploadRouter)

module.exports = router;
