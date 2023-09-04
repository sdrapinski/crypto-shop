# Ustawiamy obraz bazowy na oficjalny obraz Node.js w wersji 16
FROM node:18.17

# Tworzymy katalog aplikacji wewnątrz kontenera
WORKDIR /app

# Kopiujemy pliki package.json i package-lock.json do katalogu aplikacji
COPY package.json .
COPY package-lock.json .

# Instalujemy zależności Node.js
RUN npm install

# Kopiujemy resztę plików aplikacji
COPY . .

# Instalujemy Nodemon globalnie
RUN npm install nodemon --global

# Start prisma
RUN npx prisma generate

# Expose port
EXPOSE 8000

# Uruchamiamy aplikację z Nodemon
CMD ["node", "--watch", "index.js"]
