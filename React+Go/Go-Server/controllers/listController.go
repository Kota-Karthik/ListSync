package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/ListSync/React+Go/Go-Server/database"
	"github.com/ListSync/React+Go/Go-Server/models"
	"github.com/ListSync/React+Go/Go-Server/responses"
	"github.com/ListSync/React+Go/Go-Server/utils"
	"github.com/go-playground/validator"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var client *mongo.Client = database.DB
var listColl *mongo.Collection = database.GetCollection(client, "lists")
var validate = validator.New()

func CreateList() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var list models.List

		if err := json.NewDecoder(r.Body).Decode(&list); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "Not valid data", Data: map[string]interface{}{"error": err.Error()}}
			json.NewEncoder(w).Encode(response)
			return
		}

		if err := validate.Struct(&list); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "data dont have valid format", Data: map[string]interface{}{"error": err.Error()}}
			json.NewEncoder(w).Encode(response)
			return

		}
		vars := mux.Vars(r)
		encryptedData := vars["encryptedData"]
		object_Id, _ := utils.Decrypt(encryptedData)
		user_Id, err := primitive.ObjectIDFromHex(object_Id)

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "incorrect object id", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(w).Encode(response)
			return
		}

		newList := models.List{
			Id:          primitive.NewObjectID(),
			UserId:      user_Id,
			Title:       list.Title,
			Description: list.Description,
			TargetDate:  list.TargetDate,
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		}

		result, err := listColl.InsertOne(ctx, newList)

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "List creation failed", Data: map[string]interface{}{"error": err.Error()}}
			json.NewEncoder(w).Encode(response)
			return

		}

		w.WriteHeader(http.StatusCreated)
		response := map[string]interface{}{
			"status": "success",
			"data": map[string]interface{}{
				"list": newList,
			},
		}
		json.NewEncoder(w).Encode(response)
		fmt.Println(result)

	}
}

func DeleteList() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		vars := mux.Vars(r)
		id := vars["listId"]
		objectId, err := primitive.ObjectIDFromHex(id)

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "invalid object id", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(w).Encode(response)
			return
		}

		filter := bson.D{{Key: "_id", Value: objectId}}
		result, err := listColl.DeleteOne(ctx, filter)

		if err == mongo.ErrNoDocuments {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "No list found with given object id", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(w).Encode(response)
			return
		}

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "List deletion failed", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(w).Encode(response)
			return
		}

		w.WriteHeader(http.StatusNoContent)
		response := responses.UserResponse{Status: http.StatusBadRequest, Message: "List successfully deleted!!", Data: map[string]interface{}{"data": result}}
		json.NewEncoder(w).Encode(response)

	}
}

func UpdateList() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var list models.List

		if err := json.NewDecoder(r.Body).Decode(&list); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "invalid data", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(w).Encode(response)
			return
		}

		if err := validate.Struct(&list); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "invalid data format", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(w).Encode(response)
			return
		}

		vars := mux.Vars(r)
		id := vars["listId"]
		objectID, err := primitive.ObjectIDFromHex(id)

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "invalid object id", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(w).Encode(response)
			return
		}

		update := bson.D{{"$set", bson.D{{Key: "title", Value: list.Title}}}}
		_, err = listColl.UpdateByID(ctx, objectID, update)

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "updating the list failed", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(w).Encode(response)
			return
		}

		w.WriteHeader(http.StatusOK)
		response := map[string]interface{}{
			"status": "success",
			"data": map[string]interface{}{
				"list": list,
			},
		}
		json.NewEncoder(w).Encode(response)

	}
}

func GetAllLists() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var list models.List
		var lists []models.List

		vars := mux.Vars(r)
		encryptedData := vars["encryptedData"]
		object_Id, _ := utils.Decrypt(encryptedData)
		user_Id, err := primitive.ObjectIDFromHex(object_Id)

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "incorrect object id", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(w).Encode(response)
			return
		}

		filter := bson.D{{Key: "userId", Value: user_Id}}

		cursor, err := listColl.Find(ctx, filter)

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "Invalid filter", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(w).Encode(response)
			return
		}

		for cursor.Next(ctx) {
			if err := cursor.Decode(&list); err != nil {
				log.Fatal(err)
			}
			lists = append(lists, list)
		}
		w.WriteHeader(http.StatusOK)
		response := map[string]interface{}{
			"status": "success",
			"data": map[string]interface{}{
				"lists": lists,
			},
		}
		json.NewEncoder(w).Encode(response)

	}
}
