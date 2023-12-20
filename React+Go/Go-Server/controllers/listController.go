package controllers

import "net/http"

func CreateList() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		//create a list code goes here
	}
}

func GetAllLists() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		//get all lists  code goes here
	}
}

func UpdateList() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		//update a list code goes here
	}
}

func DeleteList() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		//delete a list code goes here
	}
}
