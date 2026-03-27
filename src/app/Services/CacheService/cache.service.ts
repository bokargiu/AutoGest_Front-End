import { Injectable } from '@angular/core';

export enum Key{
  Order, Client, Service
}

@Injectable({
  providedIn: 'root'
})

export class CacheService {
  private cache = new Map<Key, any>();

  get<T>(key: Key): T | null {
    return this.cache.get(key) ?? null;
  }

  set<T>(key: Key, value: T): void {
    this.cache.set(key, value);
  }

  clear(key: Key){
    this.cache.delete(key);
  }
}
