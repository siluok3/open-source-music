FROM golang:latest as builder
LABEL maintainer="Kiriakos Papachristou <kiriakos.papachristou@gmail.com>"
# Build Arguments
ARG APP_NAME=open-source-music
# Set the Current Working Directory inside the container
WORKDIR /go/src/github.com/siluok3/${APP_NAME}
# Copy everything from the current directory to pwd inside the container
COPY . . 
# Download dependencies
RUN go get -d -v ./...
# Build the Go app
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /go/bin/${APP_NAME} .

######## Start a new stage from scratch and reduce the size of the image #######
FROM alpine:latest  
RUN apk --no-cache add ca-certificates
WORKDIR /root/
# Copy the Pre-built binary file from the previous stage
COPY --from=builder /go/bin/${APP_NAME} .
RUN chmod +x ./${APP_NAME}
# Expose on this port the application
EXPOSE 6969
# Run the binary file produced by `go install`
CMD ["./open-source-music"]