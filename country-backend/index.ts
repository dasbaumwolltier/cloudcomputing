import express, {Application, Request, Response} from "express";

const app: Application = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get(
    "/",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "...",
        });
    }
);

try {
    app.listen(port, (): void => {
        console.log(`server running on port ${port}`);
    });
} catch (e) {
    console.error(e);
}
