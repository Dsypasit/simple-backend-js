run:
	@ PORT=3000 MYSQL_HOST=localhost MYSQL_USER=dsy MYSQL_PASSWORD=1234 MYSQL_DATABASE=users npm start
test-it:
	docker-compose -f docker-compose.test.yaml down && \
	docker compose -f docker-compose.test.yml up --build --abort-on-container-exit --exit-code-from it_tests

dev:
	docker compose --env-file .env up --build

down:
	docker compose down
