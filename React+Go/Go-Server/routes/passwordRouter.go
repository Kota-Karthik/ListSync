package routes

import (
	passwordController "github.com/ListSync/React+Go/Go-Server/controllers"
	"github.com/gorilla/mux"
)

func PasswordRouter(router *mux.Router) {

	router.HandleFunc("/forgotPassword", passwordController.ForgotPassword()).Methods("POST")
	router.HandleFunc("/updatePassword/{encryptedData}", passwordController.UpdatePassword()).Methods("PATCH")

}
