export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        REGION: "us-east-1",
        BUCKET: "fahad-notes-upload"
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://7qngpp2s73.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_URUHFfvWV",
        APP_CLIENT_ID: "2vbqnoqccu4ndqealp2n7t813v",
        IDENTITY_POOL_ID: "us-east-2:1dbcfd86-31f7-4c61-8100-4829f4b99966"
    }
}