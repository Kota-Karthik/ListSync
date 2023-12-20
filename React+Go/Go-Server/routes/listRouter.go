package routes

import (
	listController "github.com/ListSync/React+Go/Go-Server/controllers"
	"github.com/gorilla/mux"
)

func ListRouter(router *mux.Router) {

	router.HandleFunc("/todo/newList/{encryptedData}", listController.CreateList()).Methods("POST")
	router.HandleFunc("/todo/getAllLists/{encryptedData}", listController.GetAllLists()).Methods("GET")
	router.HandleFunc("/todo/deleteList/{listId}", listController.DeleteList()).Methods("DELETE")
	router.HandleFunc("/todo/updateList/{listId}", listController.UpdateList()).Methods("PATCH")

}
