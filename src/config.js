const dev = {
    s3: {
        REGION: "us-east-1",
        BUCKET: "notes-app-2-api-dev-attachmentsbucket-1t5bcz1103lue"
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://h6x94xm9a3.execute-api.us-east-1.amazonaws.com/dev"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_7DKxZ0WBk",
        APP_CLIENT_ID: "3hlt90togs24tk87e8c05b174a",
        IDENTITY_POOL_ID: "us-east-1:8a012ab4-6f00-460c-be09-8950de034574"
    }
};

const prod = {
    s3: {
        REGION: "us-east-1",
        BUCKET: "notes-app-2-api-prod-attachmentsbucket-1wf6ilpdid8dj"
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://fyrydznmwk.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_3iMvKiFGE",
        APP_CLIENT_ID: "1eq2kihihr2j7e2oqet5fd6ll9",
        IDENTITY_POOL_ID: "us-east-1:47f2bab1-35e3-4b1c-bd2f-a67c1afe3113"
    }
};

const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
};