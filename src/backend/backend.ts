import express from 'express';
import { Server, ic, query } from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
} from 'azle/canisters/management';


export default Server(
    // Server section
    () => {
        const app = express();
        app.use(express.json());

        let databases = [
            {
                "name" : "Wildan G. Budhi",
                "national_id" : "432123",
                "pcr_test_date" : new Date,
                "pcr_test_result" : "POSITIVE"
            }
        ]

        app.get('/test/results', (_req, res) => {
            res.json(databases);
        });

        app.get('/test/results/:national_id', (req, res) => {

            let testData = databases.find(
                item => item.national_id === req.params.national_id
            )

            res.json(testData);
        });

        app.post('/test/add', (req, res) => {

            let newTest = {
                "name" : req.body.name,
                "national_id" : req.body.national_id,
                "pcr_test_date" : new Date,
                "pcr_test_result" : req.body.pcr_test_result
            }

            databases.push( newTest );

            res.json({ status: 'Ok' });
        });

        // app.get('/greet', (req, res) => {
        //     res.json({ greeting: `Hello, ${req.query.name}` });
        // });

        // app.post('/price-oracle', async (req, res) => {
        //     ic.setOutgoingHttpOptions({
        //         maxResponseBytes: 20_000n,
        //         cycles: 500_000_000_000n, // HTTP outcalls cost cycles. Unused cycles are returned.
        //         transformMethodName: 'transform'
        //     });

        //     const date = '2024-04-01';
        //     const response = await (await fetch(`https://api.coinbase.com/v2/prices/${req.body.pair}/spot?date=${date}`)).json();
        //     res.json(response);
        // });

        app.use(express.static('/dist'));
        return app.listen();
    },
    // Candid section
    {
        // The transformation function for the HTTP outcall responses.
        // Required to reach consensus among different results the nodes might get.
        // Only if they all get the same response, the result is returned, so make sure
        // your HTTP requests are idempotent and don't depend e.g. on the time.
        // transform: query([HttpTransformArgs], HttpResponse, (args) => {
        //     return {
        //         ...args.response,
        //         headers: []
        //     };
        // })
    }
);
