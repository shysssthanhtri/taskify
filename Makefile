start-env:
	docker compose -f ./docker/docker-compose.yml up
start-env-silent:
	docker compose -f ./docker/docker-compose.yml up -d
stop-env:
	docker compose -f ./docker/docker-compose.yml down
