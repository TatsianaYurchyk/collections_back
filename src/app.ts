import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import usersRoutes from "./routes/users";
import topicsRoutes from "./routes/topics";
import itemsRoutes from "./routes/items";
import collectionsRoutes from "./routes/collections";
import morgan from "morgan";
import createHttpError, {isHttpError} from "http-errors";
import session from "express-session";
import MongoStore from "connect-mongo";
import env from "./util/validateEnv";
import cors from 'cors';
import { requiresAuth } from "./middleware/auth";

const app = express();

app.use(morgan("dev"));

// app.use(cors());
app.use(cors({credentials: true,  exposedHeaders: ["set-cookie"], origin: ['http://localhost:3000', 'https://collections-mern.onrender.com', 'http://localhost:8000'], methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))

app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
        httpOnly: false, 

        // sameSite: 'none',  //?
    },
   

    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}));


app.use("/api/users", usersRoutes)
app.use("/api/topics", topicsRoutes)
app.use("/api/collections", requiresAuth, collectionsRoutes)
app.use("/api/collections/items",requiresAuth, itemsRoutes)

app.use((req, res, next)=>{
    next(createHttpError(404,"Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// app.use((error:unknown, req:Request, res: Response, next: NextFunction)=>{
//     console.error(error);
//     let errorMessage = "An unknown error occuredjj";
//     let statusCode =500;
//     if (isHttpError(error)){
//         statusCode= error.status;
//         errorMessage = error.message;
//     }
//     res.status(statusCode).json({error:errorMessage});
// });    



export default app;