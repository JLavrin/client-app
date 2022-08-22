import { NestFactory } from '@nestjs/core'
import { config } from 'dotenv'

import { AppModule } from 'src/app/app.module'
import { DBService } from 'src/db/db.service'
import { ValidationPipe } from '@nestjs/common'
import { UserService } from 'src/user/user.service'

const colors = require('colors')

config();

(async () => {
  const PORT = process.env.PORT || 3000
  const DB_NAME = process.env.DB_NAME
  try {
    const app = await NestFactory.create(AppModule)
    const dbService = new DBService()
    const userService = new UserService(dbService)
    app.enableCors()
    app.useGlobalPipes(new ValidationPipe())
    app.use(async (req, res, next) => {
      const data = {
        method: req.method,
        url: req.url,
        body: JSON.stringify(req.body),
        query: JSON.stringify(req.query)
      }
      const me = userService.getMe(req.headers.authorization)
      await dbService.query(`
        INSERT INTO
            events (url, "method", body, params, "user") 
        VALUES 
            ('${data.url}', '${data.method}', '${data.body}', '${data.query}', '${JSON.stringify(me)}')
      `)
      next()
    })
    await app.listen(PORT);
    console.log(colors.blue(`[PID: ${process.pid}] Server running on port ${PORT}`));

    const dbStatus = await dbService.isReady()
    console.log(colors.blue(`[DB_NAME: ${DB_NAME}] Database ${dbStatus ? 'on air' : 'fucked up'}`))
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
