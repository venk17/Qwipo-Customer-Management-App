import db from './database.js';

export class Address {
  static async create({ customer_id, address_details, city, state, pin_code }) {
    const query = `
      INSERT INTO addresses (customer_id, address_details, city, state, pin_code)
      VALUES (?, ?, ?, ?, ?)
    `;
    const result = await db.db.run(query, [customer_id, address_details, city, state, pin_code]);
    return { id: result.lastID, customer_id, address_details, city, state, pin_code };
  }

  static async findByCustomerId(customer_id) {
    const query = `
      SELECT * FROM addresses 
      WHERE customer_id = ? 
      ORDER BY created_at DESC
    `;
    return await db.db.all(query, [customer_id]);
  }

  static async findById(id) {
    const query = `SELECT * FROM addresses WHERE id = ?`;
    return await db.db.get(query, [id]);
  }

  static async update(id, { address_details, city, state, pin_code }) {
    const query = `
      UPDATE addresses 
      SET address_details = ?, city = ?, state = ?, pin_code = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    await db.db.run(query, [address_details, city, state, pin_code, id]);
    return await this.findById(id);
  }

  static async delete(id) {
    const query = `DELETE FROM addresses WHERE id = ?`;
    const result = await db.db.run(query, [id]);
    return result.changes > 0;
  }
}