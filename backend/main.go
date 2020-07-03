package main

import (
	"fmt"
	"log"
	"net/http"
	db "webeditor/backend/database"
	"webeditor/backend/env"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func main() {
	// Start env package with global configurations
	env.New()

	// Start db package to start migration bases
	db.New()

	http.HandleFunc("/", SayHello)

	fmt.Println("The server is running on port 4000")
	log.Fatal(http.ListenAndServe(":4000", nil))
}

//SayHello First func created only for test
func SayHello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello WEBEditor2.0")
}
