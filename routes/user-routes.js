import express from 'express';
import { getAllUser, getUserById, signup, login, userEdit} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.get("/:id", getUserById);
userRouter.post("/signup", signup);
userRouter.post("/login", login)
userRouter.put("/update/:id", userEdit)

export default userRouter;