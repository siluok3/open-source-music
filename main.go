package main

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	//Set the router as the default one
	router := gin.Default()

	//Serve the frontend static files
	router.Use(static.Serve("/", static.LocalFile("client/build", true)))

	//Setup route group for the API
	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "All good my friend",
			})
		})
	}

	router.NoRoute(func(c *gin.Context) {
		c.File("client/public/index.html")
	})

	router.Run(":6969")
}
