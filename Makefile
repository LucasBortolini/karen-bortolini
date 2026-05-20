.PHONY: install dev up down logs build preview

install:
	docker compose run --rm install

up: install
	docker compose up dev -d --build

down:
	docker compose down

logs:
	docker compose logs -f dev

dev:
	docker compose up dev

build:
	docker compose run --rm build

preview:
	docker compose --profile preview up preview
