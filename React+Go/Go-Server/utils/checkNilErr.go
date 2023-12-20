package utils

import "log"

func CheckNilErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
