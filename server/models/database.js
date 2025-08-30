import sqlite3 from 'sqlite3';
import { promisify } from 'util';

class Database {
  constructor() {
    this.db = new sqlite3.Database('./database.db');
    this.db.run = promisify(this.db.run.bind(this.db));
    this.db.get = promisify(this.db.get.bind(this.db));
    this.db.all = promisify(this.db.all.bind(this.db));
    this.init();
  }

  async init() {
    try {
      // Create customers table
      await this.db.run(`
        CREATE TABLE IF NOT EXISTS customers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          phone_number TEXT NOT NULL UNIQUE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create addresses table
      await this.db.run(`
        CREATE TABLE IF NOT EXISTS addresses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          customer_id INTEGER NOT NULL,
          address_details TEXT NOT NULL,
          city TEXT NOT NULL,
          state TEXT NOT NULL,
          pin_code TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE CASCADE
        )
      `);

      // Create indexes for better performance
      await this.db.run(`CREATE INDEX IF NOT EXISTS idx_customer_phone ON customers(phone_number)`);
      await this.db.run(`CREATE INDEX IF NOT EXISTS idx_address_customer ON addresses(customer_id)`);
      await this.db.run(`CREATE INDEX IF NOT EXISTS idx_customer_name ON customers(first_name, last_name)`);

      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Database initialization error:', error);
    }
  }

  async close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

export default new Database();