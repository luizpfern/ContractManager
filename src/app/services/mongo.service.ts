import { Injectable } from '@angular/core';
import { MongoClient, Db } from 'mongodb';
import * as dotenv from 'dotenv';

@Injectable({
  providedIn: 'root'
})
export class MongoService {
  private client: MongoClient;
  private db!: Db;

  constructor() {
    const uri = process.env['MONGODB_URI'];
    if (!uri) throw new Error('MONGODB_URI is not defined');
    this.client = new MongoClient(uri);
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db('YOUR_DATABASE_NAME');
  }

  async disconnect() {
    await this.client.close();
  }

  getCollection(collectionName: string) {
    return this.db.collection(collectionName);
  }

  async find(collectionName: string, query: any) {
    const collection = this.getCollection(collectionName);
    return await collection.find(query).toArray();
  }

  async insertOne(collectionName: string, document: any) {
    const collection = this.getCollection(collectionName);
    return await collection.insertOne(document);
  }

  async updateOne(collectionName: string, filter: any, update: any) {
    const collection = this.getCollection(collectionName);
    return await collection.updateOne(filter, { $set: update });
  }

  async deleteOne(collectionName: string, filter: any) {
    const collection = this.getCollection(collectionName);
    return await collection.deleteOne(filter);
  }
}