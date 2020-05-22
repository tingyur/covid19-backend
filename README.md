[![](https://img.shields.io/docker/image-size/justable/covid19-backend?label=docker%20image&style=flat-square)](https://hub.docker.com/repository/docker/justable/covid19-backend)
[![](https://img.shields.io/npm/v/egg?label=egg&style=flat-square)](https://www.npmjs.com/package/egg)

作为一个 Node 练习项目，从网上获得最新的疫情数据存到自建 Mongo 数据库中，并提供相关查询 API。

### docker-compose.yml

本项目在 dockerhub 上有镜像，可以直接使用，Docker Compose 配置如下：

```yml
version: '3'
services:
  backend:
    image: justable/covid19-backend:1.0
    environment:
      - DB_HOST=db
    ports:
      - '7001:7001'
    depends_on:
      - db
  db:
    image: mongo:latest
    volumes:
      - mongo_data:/data/db
    ports:
      - '27017:27017'
volumes:
  mongo_data:
```

也可以直接以本项目作为 build 目标，那么就直接使用本项目的`docker-compose.yml`就可以了。

### 启动容器命令

注意要先保证 db 服务处于就绪状态，不然 backend 服务会连接数据库失败。

1. `docker-compose up --no-start`
2. `docker-compose start db`
3. `docker-compose start backend`

修改本项目代码后需要更新镜像然后再重启：

- `docker-compose up backend`
