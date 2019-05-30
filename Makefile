run:
	docker run -d -p 69:69 --name open_source_music -t open-source-music

start:
	docker start -a open_source_music

stop:
	docker stop open_source_music

build:
	docker build -t open-source-music .