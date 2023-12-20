package routes

import (
	userController "github.com/ListSync/React+Go/Go-Server/controllers"
	"github.com/gorilla/mux"
)

func UserRouter(router *mux.Router) {

	router.HandleFunc("/signup", userController.SignUp()).Methods("POST")
	router.HandleFunc("/login", userController.LogIn()).Methods("POST")
	router.HandleFunc("/getUser/:id", userController.GetAllUsers()).Methods("GET")

}
