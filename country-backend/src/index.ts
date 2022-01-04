import express, {Application, Request, Response} from 'express';
import countries from './data/countries.json'

const app: Application = express();
const port = 8081;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get(
    "/api/all",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send(countries);
    }
);

try {
    app.listen(port, (): void => {
        console.log(`server running on port ${port}`);
    });
} catch (e) {
    console.error(e);
}
