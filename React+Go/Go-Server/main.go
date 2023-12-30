package main

import (
	"fmt"
	"net/http"

	"github.com/ListSync/React+Go/Go-Server/database"
	"github.com/ListSync/React+Go/Go-Server/routes"
	"github.com/ListSync/React+Go/Go-Server/utils"
	"github.com/gorilla/mux"
)

func CorsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Continue to the next handler
		next.ServeHTTP(w, r)
	})
}

func main() {
	utils.LoadEnv()
	checkErr := utils.CheckErr

	router := mux.NewRouter()
	database.ConnectDB()

	// Define your routes
	routes.ListRouter(router)
	routes.UserRouter(router)

	// Apply CORS middleware to the router
	corsRouter := CorsMiddleware(router)

	fmt.Println("Listening on port 3000!!")
	checkErr(http.ListenAndServe(":3000", corsRouter))
}
