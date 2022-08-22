import { Injectable } from '@nestjs/common'
import { config } from 'dotenv'

import { BasicUser } from 'src/user/user.type'
import { DBService } from 'src/db/db.service'

const jwt = require('jsonwebtoken')

config()

@Injectable()
export class UserService {
  constructor(private readonly dbService: DBService) {
  }

  async getUser(value: number | string, searchByUserId: boolean = true): Promise<BasicUser | string> {
    let searchKey;
    if (searchByUserId) {
      searchKey = `user_id = ${value}`
    } else {
      searchKey = `username = '${value}'`
    }
    try {
      const user = await this.dbService.query(`
          SELECT users.user_id,
                 users.username,
                 users.password,
                 users.email,
                 user_roles.name as role_name
          FROM users
                   INNER JOIN
               user_roles ON user_roles.id = users.role_id
          WHERE ${searchKey}
          LIMIT 1
      `)
      if (Array.isArray(user) && user.length > 0) {
        return user[0]
      }
      return null
    } catch (err) {
      console.error(err)
      return null
    }
  }

  async getUserList(limit: number): Promise<BasicUser[] | string> {
    try {
      const users = await this.dbService.query(
        `
            SELECT users.user_id as user_Id,
                   users.username,
                   users.password,
                   users.email,
                   ur.name       as role_name
            FROM 
                users
            INNER JOIN
                 user_roles as ur ON ur.id = users.role_id
            ORDER BY user_id
            LIMIT ${limit}
        `
      )
      if (Array.isArray(users) && users.length > 0) {
        return users
      }
      return null
    } catch (err) {
      console.error(err)
      return null
    }
  }

  async createUser(user: BasicUser) {
    try {
      const result = await this.dbService.query(`
          INSERT INTO users (username, password, email, role_id)
          VALUES ('${user.username}', '${user.password}', '${user.email}', ${user.roleId})
          RETURNING user_id
      `)
      if (Array.isArray(result) && result.length > 0) {
        return {
          user: result[0],
          statusCode: 201,
          message: ['User created successfully']
        }
      }
      return {
        statusCode: 400,
        message: [result.detail],
        prop: result.constraint
      }
    } catch (err) {
      return {
        statusCode: 500,
        message: ['Internal server error']
      }
    }
  }

  async updateUser(user: number, data: BasicUser) {
    try {
      const result = await this.dbService.query(`
          UPDATE
              users
          SET username = '${data.username}',
              password = '${data.password}',
              email    = '${data.email}',
              role_id  = ${data.roleId}
          WHERE user_id = ${user}
          RETURNING username, password, email, user_id
      `)
      if (Array.isArray(result) && result.length > 0) {
        return {
          user: result[0],
          statusCode: 201,
          message: ['User updated successfully']
        }
      }
      return {
        statusCode: 400,
        message: [result.detail || 'User not found'],
        prop: result.constraint
      }
    } catch (err) {
      return {
        statusCode: 500,
        message: ['Internal server error']
      }
    }
  }

  async deleteUser(user: number, operatorRoleId: number) {
    try {
      if (operatorRoleId !== 5) {
        return {
          statusCode: 403,
          message: ['Forbidden']
        }
      }
      const result = await this.dbService.query(`
          DELETE
          FROM users
          WHERE user_id = ${user}
          RETURNING user_id
      `)
      if (Array.isArray(result) && result.length > 0) {
        return {
          user: result[0],
          statusCode: 201,
          message: ['User deleted successfully']
        }
      }
      return {
        statusCode: 400,
        message: [result.detail || 'User not found'],
        prop: result.constraint
      }
    } catch (err) {
      return {
        statusCode: 500,
        message: ['Internal server error']
      }
    }
  }

  async getMe(token: string) {
    const secret = process.env.SECRET_KEY
    const cutBearer = token.split(' ')[1]

    try {
      const result = jwt.verify(cutBearer, secret, (err, decoded) => {
        if (err) {
          return {
            statusCode: 401,
            message: ['Unauthorized']
          }
        }
        return {
          statusCode: 200,
          message: ['Authorized'],
          user: decoded
        }
      })
      const userId = await this.dbService.query(`
        SELECT 
            user_id, role_id 
        FROM 
            users 
        WHERE 
            username='${result?.user?.username}';
      `)
      return {
        username: result?.user?.username,
        userId: userId[0]?.user_id,
        roleId: userId[0]?.role_id
      }
    } catch (err) {
      return {
        statusCode: 500,
        message: ['Internal server error']
      }
    }
  }
}
