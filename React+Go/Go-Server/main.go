package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/ListSync/React+Go/Go-Server/database"
	"github.com/ListSync/React+Go/Go-Server/utils"
	"github.com/gorilla/mux"
)

func main() {
	
	checkErr := utils.CheckErr
	router := mux.NewRouter()
	database.ConnectDB()
	router.HandleFunc("/", func(rw http.ResponseWriter, r *http.Request) {

		rw.Header().Set("Content-Type", "application/json")
		fmt.Println("I love you 3000!!")
		json.NewEncoder(rw).Encode(map[string]string{"data": "Hello from Mux & mongoDB"})
	}).Methods("GET")
	fmt.Println("listening to port 6000!!")
	checkErr(http.ListenAndServe(":6000", router))

}
