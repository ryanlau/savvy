# Walmart Signature Microservice

Walmart IO APIs require a signature to be sent with every request. This requires some setup on their platform's end as well as on each request's end. 

## walmart.io setup

1. Create an account on [walmart.io](https://walmart.io).
2. Navigate to Dashboard > Applications > Create Application.
3. Fill out required fields and then upload a public key for the app.
- Follow the [steps](https://walmart.io/key-tutorial) provided by Walmart to generate a public/private key pair.
- You should have 3 new files.
4. Copy your Consumer ID from the Applications page.

## microservice setup

1. In this directory, create a `.env` file with the following contents
```
# .env

CONSUMER_ID=<YOUR_CONSUMER_ID>
PRIVATE_KEY_FILE_PATH=<FILE_PATH_TO_PRIVATE_KEY_FILE>
```
2. Run with `go run main.go`
