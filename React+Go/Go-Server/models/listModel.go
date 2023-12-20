package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type List struct {
	Id          primitive.ObjectID `json:"_id,omitempty"`
	UserId      primitive.ObjectID `json:"userId,omitempty" validate:"required"`
	Title       string             `json:"title,omitempty" validate:"required"`
	Description string             `json:"description,omitempty" validate:"required"`
	TargetDate  time.Time          `json:"targetDate,omitempty" validate:"required"`
}
