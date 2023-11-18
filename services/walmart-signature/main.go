package main

import (
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/x509"
	"encoding/base64"
	"encoding/pem"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"sort"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var consumerId string
var privateKeyVersion string
var privateKeyPem string

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("missing .env file")
	}

	consumerId = os.Getenv("CONSUMER_ID")
	privateKeyVersion = "1"
	privateKeyFilePath := os.Getenv("PRIVATE_KEY_FILE_PATH")
	privateKeyPemContents, err := ioutil.ReadFile(privateKeyFilePath)
	privateKeyPem = string(privateKeyPemContents)

	r := gin.Default()
	r.GET("/", generateSignatureHandler)
	r.Run() // By default, it runs on http://localhost:8080
}

func generateSignatureHandler(c *gin.Context) {
	intimestamp := time.Now().UnixNano() / int64(time.Millisecond)

	headersToSign := map[string]string{
		"WM_CONSUMER.ID":          consumerId,
		"WM_CONSUMER.INTIMESTAMP": fmt.Sprintf("%d", intimestamp),
		"WM_SEC.KEY_VERSION":      privateKeyVersion,
	}

	_, canonicalString := canonicalize(headersToSign)
	signature, err := generateSignature(privateKeyPem, canonicalString)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"signature": signature, "timestamp": intimestamp, "consumerID": consumerId, "privateKeyVersion": privateKeyVersion})
}

func generateSignature(privateKeyPem string, dataToSign string) (string, error) {
	block, _ := pem.Decode([]byte(privateKeyPem))
	if block == nil {
		return "", fmt.Errorf("failed to parse PEM block containing the key")
	}

	privateKey, err := x509.ParsePKCS8PrivateKey(block.Bytes)
	if err != nil {
		return "", err
	}

	hashed := sha256.Sum256([]byte(dataToSign))

	signature, err := rsa.SignPKCS1v15(rand.Reader, privateKey.(*rsa.PrivateKey), crypto.SHA256, hashed[:])
	if err != nil {
		return "", err
	}

	return base64.StdEncoding.EncodeToString(signature), nil
}

func canonicalize(headers map[string]string) ([]string, string) {
	var keys []string
	for k := range headers {
		keys = append(keys, k)
	}
	sort.Strings(keys)

	var headerNames []string
	var canonicalStrBuilder strings.Builder
	for _, key := range keys {
		headerNames = append(headerNames, key)
		canonicalStrBuilder.WriteString(headers[key])
		canonicalStrBuilder.WriteString("\n")
	}
	return headerNames, canonicalStrBuilder.String()
}
