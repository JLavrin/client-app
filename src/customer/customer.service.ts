import { Injectable } from '@nestjs/common'
import { DBService } from 'src/db/db.service'

@Injectable()
export class CustomerService {
  constructor(private readonly dbService: DBService) {
  }

  async getCustomers() {
    try {
      const result = await this.dbService.query(`
          SELECT id,
                 name,
                 customers.email,
                 phone,
                 house,
                 apartment,
                 street,
                 city,
                 zip,
                 nip,
                 regon,
                 founder,
                 founder2,
                 username as created_by
          FROM 
              customers
          JOIN 
                  users ON users.user_id = customers.created_by
          ORDER BY 
              id
      `)
      if (Array.isArray(result) && result.length > 0) {
        return {
          customers: result,
          statusCode: 200,
          message: ['Customers found successfully']
        }
      }
      return {
        statusCode: 404,
        message: ['No customers found']
      }
    } catch (err) {
      return {
        statusCode: 500,
        message: ['Internal server error']
      }
    }
  }

  async getCustomer(id: number) {
    try {
      const result = await this.dbService.query(`
          SELECT id,
                 name,
                 customers.email,
                 phone,
                 house,
                 apartment,
                 street,
                 city,
                 zip,
                 nip,
                 regon,
                 founder,
                 founder2,
                 username as created_by
          FROM customers
                   JOIN
               users ON users.user_id = customers.created_by
          WHERE id = ${id}

      `)
      if (Array.isArray(result) && result.length > 0) {
        return {
          customer: result[0],
          statusCode: 200,
          message: ['Customer found successfully']
        }
      }
      return {
        statusCode: 404,
        message: ['No customer found']
      }
    } catch (err) {
      return {
        statusCode: 500,
        message: ['Internal server error']
      }
    }
  }

  async createCustomer(customer: any) {
    try {
      const result = await this.dbService.query(`
          INSERT INTO customers (name,
                                 email,
                                 phone,
                                 house,
                                 apartment,
                                 street,
                                 city,
                                 zip,
                                 nip,
                                 regon,
                                 founder,
                                 founder2,
                                 created_by)
          VALUES ('${customer.name || null}',
                  '${customer.email || null}',
                  '${customer.phone || null}',
                  '${customer.house || null}',
                  '${customer.apartment || null}',
                  '${customer.street || null}',
                  '${customer.city || null}',
                  '${customer.zip || null}',
                  '${customer.nip || null}',
                  '${customer.regon || null}',
                  '${customer.founder || null}',
                  '${customer.founder2 || null}',
                  '${customer.userId || null}')
          RETURNING id
      `)
      if (Array.isArray(result) && result.length > 0) {
        return {
          user: result[0],
          statusCode: 201,
          message: ['Customer created successfully']
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

  async updateCustomer(id: number, customer: any) {
    try {
      const result = await this.dbService.query(`
          UPDATE customers
          SET name = '${customer.name || null}',
              email = '${customer.email || null}',
              phone = '${customer.phone || null}',
              house = '${customer.house || null}',
              apartment = '${customer.apartment || null}',
              street = '${customer.street || null}',
              city = '${customer.city || null}',
              zip = '${customer.zip || null}',
              nip = '${customer.nip || null}',
              regon = '${customer.regon || null}',
              founder = '${customer.founder || null}',
              founder2 = '${customer.founder2 || null}',
              created_by = '${customer.userId || null}'
          WHERE id = ${id}
          RETURNING id
      `)
      if (Array.isArray(result) && result.length > 0) {
        return {
          customer: result[0],
          statusCode: 201,
          message: ['Customer updated successfully']
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

  async deleteCustomer(id: number) {
    try {
      const result = await this.dbService.query(`
          DELETE FROM customers
          WHERE id = ${id}
          RETURNING id
      `)
      if (Array.isArray(result) && result.length > 0) {
        return {
          customer: result[0],
          statusCode: 201,
          message: ['Customer deleted successfully']
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
}
