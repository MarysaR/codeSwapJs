FROM node:lts-alpine

WORKDIR /app

# 1. Copier le backend
COPY back ./

# 2. Copier + build logic
COPY logic /tmp/logic
WORKDIR /tmp/logic
RUN npm install
RUN npm run build

# Générer le client Prisma dans le bon environnement (alpine)
RUN npx prisma generate

# 3. Revenir dans le back, installer logic compilé
WORKDIR /app
RUN npm install /tmp/logic
RUN npm install

# 4. Symlink logic vers node_modules
RUN rm -rf node_modules/logic
RUN ln -s /tmp/logic/dist node_modules/logic

# 5. Build du back
RUN npm run build

EXPOSE 3300
CMD ["npm", "start"]
