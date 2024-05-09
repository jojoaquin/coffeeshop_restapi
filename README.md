npm i

create env

DATABASE_URL="mysql://username:password@localhost:3306/coffeeshop_restapi?connection_limit=5"

PORT=3000

create databases

npx prisma migrate dev

to start: node src/index.js
