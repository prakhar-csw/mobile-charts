FROM node:alpine as BUILD_IMAGE
WORKDIR /
COPY package.json yarn.lock ./
# install dependencies
RUN yarn install --frozen-lockfile
COPY . .
# build
RUN yarn build
# remove dev dependencies
RUN npm prune --production
FROM node:alpine
WORKDIR /

EXPOSE 3005
CMD ["yarn", "start"]