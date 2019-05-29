run:
	docker run -p 69:69 -t open-source-music

stop:
	docker stop romantic_taussig

build:
	docker build -t open-source-music .