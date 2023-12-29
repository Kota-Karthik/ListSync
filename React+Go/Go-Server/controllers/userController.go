package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/ListSync/React+Go/Go-Server/database"
	"github.com/ListSync/React+Go/Go-Server/models"
	"github.com/ListSync/React+Go/Go-Server/responses"
	"github.com/ListSync/React+Go/Go-Server/utils"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

var userColl *mongo.Collection = database.GetCollection(client, "users")

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}
func CheckPassword(hashedPassword, plainPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(plainPassword))
}

type MyCustomClaims struct {
	UserId primitive.ObjectID `json:"userId"`
	jwt.RegisteredClaims
}

func SignUp() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		MySecretKey := []byte("rdctvygbhsdgqydguic3nge8717")
		checkNilErr := utils.CheckErr
		ctx, cancel := context.WithTimeout(context.Background(), 14*time.Second)
		defer cancel()

		var user models.User

		if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "please check your data", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(w).Encode(response)
		}

		if err := validate.Struct(&user); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "please check your data format", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(w).Encode(response)
		}

		checkEmptyFields := user.Name == "" || user.Email == "" || user.Password == "" || user.PasswordConfirm == ""

		if checkEmptyFields {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "please add all fields to the data", Data: map[string]interface{}{"error": "empty fields found"}}
			json.NewEncoder(w).Encode(response)
		}

		passwordHash, err := hashPassword(user.Password)
		checkNilErr(err)
		passwordConfirmHash, err := hashPassword(user.PasswordConfirm)
		checkNilErr(err)

		newUser := models.User{
			Id:              primitive.NewObjectID(),
			Name:            user.Name,
			Email:           user.Email,
			Password:        passwordHash,
			PasswordConfirm: passwordConfirmHash,
		}
		_, err = userColl.InsertOne(ctx, newUser)

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "user creation failed", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(w).Encode(response)
		}

		claims := MyCustomClaims{
			newUser.Id,
			jwt.RegisteredClaims{
				// A usual scenario is to set the expiration time relative to the current time
				ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
				Issuer:    "test",
			},
		}
		ss := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		token, err := ss.SignedString(MySecretKey)

		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "token hashing failed", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(w).Encode(response)
		}

		encryptedData, _ := utils.Encrypt(newUser.Id.Hex())
		w.WriteHeader(http.StatusOK)
		response := map[string]interface{}{
			"status": "success",
			"token":  token,
			"data": map[string]interface{}{
				"encryptedData": encryptedData,
			},
		}
		json.NewEncoder(w).Encode(response)
	}
}

func LogIn() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		MySecretKey := []byte("rdctvygbhsdgqydguic3nge8717")
		ctx, cancel := context.WithTimeout(context.Background(), 14*time.Second)
		defer cancel()

		var user1 models.User
		var user2 models.User

		if err := json.NewDecoder(r.Body).Decode(&user1); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "please check your data", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(w).Encode(response)
			return
		}

		if user1.Email == "" || user1.Password == "" {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "please add all fields to the data", Data: map[string]interface{}{"error": "empty fields found"}}
			json.NewEncoder(w).Encode(response)
			return
		}

		filter := bson.D{{Key: "email", Value: user1.Email}}
		err := userColl.FindOne(ctx, filter).Decode(&user2)

		if err == mongo.ErrNoDocuments {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "No documents found with given objecct id", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(w).Encode(response)
			return
		}
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "incorrect object id", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(w).Encode(response)
			return
		}

		err = CheckPassword(user2.Password, user1.Password)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			response := responses.UserResponse{Status: http.StatusUnauthorized, Message: "incorrect password", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(w).Encode(response)
			return
		}

		claims := MyCustomClaims{
			user2.Id,
			jwt.RegisteredClaims{
				// A usual scenario is to set the expiration time relative to the current time
				ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
				Issuer:    "test",
			},
		}
		ss := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		token, err := ss.SignedString(MySecretKey)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "token generation failed", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(w).Encode(response)
			return
		}
		encryptedData, _ := utils.Encrypt(user2.Id.Hex())
		w.WriteHeader(http.StatusOK)
		response := map[string]interface{}{
			"status": "success",
			"token":  token,
			"data": map[string]interface{}{
				"encryptedData": encryptedData,
			},
		}
		json.NewEncoder(w).Encode(response)

	}
}
