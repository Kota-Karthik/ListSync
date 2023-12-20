package database

import (
	"context"
	"fmt"
	"time"

	"github.com/ListSync/React+Go/Go-Server/utils"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectDB() *mongo.Client {
	utils.LoadEnv()
	get := utils.GetEnvWithKey
	checkErr := utils.CheckErr

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(get("DATABASE")))
	checkErr(err)

	//ping the database
	err = client.Ping(ctx, nil)
	checkErr(err)
	fmt.Println("Connected to MongoDB!!")
	return client
}

// Client instance
// var DB *mongo.Client = ConnectDB()

// getting database collections
func GetCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	get := utils.GetEnvWithKey
	collection := client.Database(get("DBNAME")).Collection(collectionName)
	return collection
}
