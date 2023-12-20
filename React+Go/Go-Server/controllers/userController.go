package controllers

import "net/http"

func SignUp() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		//create a user code goes here
	}
}

func LogIn() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		//login a user code goes here
	}
}

func GetAllUsers() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		//get all user code goes here
	}
}

func DeleteUser() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		//delete a user code goes here
	}
}

func GetUniqueUser() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		//get  a unique user code goes here
	}
}
