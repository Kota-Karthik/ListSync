package main

import (
	"fmt"
	"net/http"

	"github.com/ListSync/React+Go/Go-Server/database"
	"github.com/ListSync/React+Go/Go-Server/routes"
	"github.com/ListSync/React+Go/Go-Server/utils"
	"github.com/gorilla/mux"
)

func main() {
	checkErr := utils.CheckErr

	router := mux.NewRouter()
	database.ConnectDB()

	routes.UserRouter(router)
	routes.PasswordRouter(router)
	routes.ListRouter(router)

	fmt.Println("listening to port 6000!!")
	checkErr(http.ListenAndServe(":6000", router))

}
