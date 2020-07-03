package database

import (
	"fmt"
	"os"

	"github.com/jinzhu/gorm"
)

var (
	db  *gorm.DB
	err error
)

//New start a connection on a dabasase
func New() {
	db = connect()
	defer db.Close()

}

func connect() *gorm.DB {
	dbBase := os.Getenv("DB_BASE")
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")

	db, err = gorm.Open("mysql", fmt.Sprintf("%v:%v@/%v?charset=utf8&parseTime=True&loc=Local", dbUser, dbPass, dbBase))
	if err != nil {
		panic(fmt.Sprintf("failed to connect database: %v", err.Error()))
	}
	return db
}
