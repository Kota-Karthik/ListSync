package utils

import (
	"crypto/aes"
	"crypto/cipher"
	"encoding/hex"
	"log"
)

func Encrypt(text string) (string, error) {
	LoadEnv()
	hexString := GetEnvWithKey("KEY")
	key, err := hex.DecodeString(hexString)
	if err != nil {
		log.Fatal(err)
	}
	hexIv := GetEnvWithKey("IV")
	iv, err := hex.DecodeString(hexIv)
	if err != nil {
		log.Fatal(err)
	}
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	ciphertext := make([]byte, aes.BlockSize+len(text))
	stream := cipher.NewCFBEncrypter(block, iv)
	stream.XORKeyStream(ciphertext[aes.BlockSize:], []byte(text))

	return hex.EncodeToString(ciphertext), nil
}

func Decrypt(ciphertext string) (string, error) {
	LoadEnv()
	hexString := GetEnvWithKey("KEY")
	key, err := hex.DecodeString(hexString)
	if err != nil {
		log.Fatal(err)
	}
	hexIv := GetEnvWithKey("IV")
	iv, err := hex.DecodeString(hexIv)
	if err != nil {
		log.Fatal(err)
	}
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	decodedCiphertext, err := hex.DecodeString(ciphertext)
	if err != nil {
		return "", err
	}

	stream := cipher.NewCFBDecrypter(block, iv)
	stream.XORKeyStream(decodedCiphertext[aes.BlockSize:], decodedCiphertext[aes.BlockSize:])

	return string(decodedCiphertext[aes.BlockSize:]), nil
}
