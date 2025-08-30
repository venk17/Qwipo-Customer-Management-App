import db from './database.js';

export class Customer {
  static async create({ first_name, last_name, phone_number }) {
    const query = `
      INSERT INTO customers (first_name, last_name, phone_number)
      VALUES (?, ?, ?)
    `;
    const result = await db.db.run(query, [first_name, last_name, phone_number]);
    return { id: result.lastID, first_name, last_name, phone_number };
  }

  static async findAll({ search = '', sortBy = 'first_name', sortOrder = 'ASC', page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    const searchPattern = `%${search}%`;
    
    let query = `
      SELECT c.*, COUNT(a.id) as address_count
      FROM customers c
      LEFT JOIN addresses a ON c.id = a.customer_id
    `;
    
    let countQuery = `SELECT COUNT(*) as total FROM customers`;
    let params = [];
    
    if (search) {
      const whereClause = ` WHERE (c.first_name LIKE ? OR c.last_name LIKE ? OR c.phone_number LIKE ?)`;
      query += whereClause;
      countQuery += whereClause;
      params = [searchPattern, searchPattern, searchPattern];
    }
    
    query += ` GROUP BY c.id ORDER BY c.${sortBy} ${sortOrder} LIMIT ? OFFSET ?`;
    
    const customers = await db.db.all(query, [...params, limit, offset]);
    const { total } = await db.db.get(countQuery, params);
    
    return {
      customers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async findById(id) {
    const query = `
      SELECT c.*, COUNT(a.id) as address_count
      FROM customers c
      LEFT JOIN addresses a ON c.id = a.customer_id
      WHERE c.id = ?
      GROUP BY c.id
    `;
    return await db.db.get(query, [id]);
  }

  static async update(id, { first_name, last_name, phone_number }) {
    const query = `
      UPDATE customers 
      SET first_name = ?, last_name = ?, phone_number = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    await db.db.run(query, [first_name, last_name, phone_number, id]);
    return await this.findById(id);
  }

  static async delete(id) {
    const query = `DELETE FROM customers WHERE id = ?`;
    const result = await db.db.run(query, [id]);
    return result.changes > 0;
  }

  static async findByPhoneNumber(phone_number, excludeId = null) {
    let query = `SELECT * FROM customers WHERE phone_number = ?`;
    let params = [phone_number];
    
    if (excludeId) {
      query += ` AND id != ?`;
      params.push(excludeId);
    }
    
    return await db.db.get(query, params);
  }
}