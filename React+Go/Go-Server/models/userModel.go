package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	Id              primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Name            string             `bson:"name" json:"name" validate:"required"`
	Email           string             `bson:"email" json:"email" validate:"required,email"`
	Password        string             `json:"password,omitempty" validate:"required" bson:"-"`
	PasswordConfirm string             `json:"passwordConfirm,omitempty" validate:"required,eqfield=Password" bson:"-"`
}
