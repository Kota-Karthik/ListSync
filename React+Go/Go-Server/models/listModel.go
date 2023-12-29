package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type List struct {
	Id          primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	UserId      primitive.ObjectID `bson:"userId,omitempty" json:"userId,omitempty"`
	Title       string             `bson:"title,omitempty" json:"title,omitempty" validate:"required"`
	Description string             `bson:"description,omitempty" json:"description,omitempty" validate:"required"`
	TargetDate  time.Time          `bson:"targetDate,omitempty" json:"targetDate,omitempty" validate:"required"`
	CreatedAt   time.Time          `bson:"createdAt" json:"createdAt"`
	UpdatedAt   time.Time          `bson:"updatedAt" json:"updatedAt"`
}
