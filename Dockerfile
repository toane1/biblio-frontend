# Utiliser une image de base qui inclut Node.js
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires à partir de votre projet local vers le conteneur
COPY package.json package-lock.json ./
RUN npm install

# Installer Expo CLI globalement
RUN npm install -g expo-cli

# Copier le reste des fichiers
COPY . .

# Exposer le port nécessaire par votre application
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start", "--web"]
