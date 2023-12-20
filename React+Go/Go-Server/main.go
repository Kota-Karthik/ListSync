package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"github.com/ListSync/React+Go/Go-Server/utils"
	"github.com/gorilla/mux"
)

func main() {
	checkErr:=utils.checkErr
	router := mux.NewRouter()

	router.HandleFunc("/", func(rw http.ResponseWriter, r *http.Request) {

		rw.Header().Set("Content-Type", "application/json")

		json.NewEncoder(rw).Encode(map[string]string{"data": "Hello from Mux & mongoDB"})
	}).Methods("GET")
	
	checkErr(http.ListenAndServe(":6000", router))
	fmt.Println("listening to port 6000!!")
}
