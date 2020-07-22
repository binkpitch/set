'use strict'

import { tap } from '@supercharge/goodies'

export class SuperchargedSet<T> {
  private readonly set: Set<T>

  /**
   * Create a new set instance.
   *
   * @param values
   */
  constructor (values?: Iterable<T>) {
    this.set = new Set(values)
  }

  /**
   * Create a new set instance of the given `values`.
   *
   * @param {Iterable} values
   *
   * @returns {SuperchargedSet}
   */
  static of<T> (values?: Iterable<T>): SuperchargedSet<T> {
    return new this<T>(values)
  }

  /**
   * Adds the given `value` to the set.
   *
   * @param {*} value
   *
   * @returns {SuperchargedSet}
   */
  add (value: T): this {
    return tap(this, () => {
      this.set.add(value)
    })
  }

  /**
   * Clears the set by removing all items.
   *
   * @returns {SuperchargedSet}
   */
  clear (): this {
    return tap(this, () => {
      this.set.clear()
    })
  }

  /**
   * Delete the given `value` from the set.
   *
   * @param {*} value
   *
   * @returns {Boolean}
   */
  delete (value: T): boolean {
    return this.set.delete(value)
  }

  /**
   * Determine whether the set contains the given `value`.
   *
   * @param {*} value
   *
   * @returns {Boolean}
   */
  has (value: T): boolean {
    return this.set.has(value)
  }

  /**
   * Determine whether the set is empty (contains no entries).
   *
   * @returns {Boolean}
   */
  isEmpty (): boolean {
    return this.size() === 0
  }

  /**
   * Determine whether the set is not empty (contains entries).
   *
   * @returns {Boolean}
   */
  isNotEmpty (): boolean {
    return !this.isEmpty()
  }

  /**
   * Returns the first item in the set matching the given `predicate`
   * function, or `undefined` if no such item was found.
   *
   * @param predicate
   *
   * @returns {*}
   */
  filter (predicate: (item: T, set: SuperchargedSet<T>) => T[]): SuperchargedSet<T> {
    const results: SuperchargedSet<T> = new SuperchargedSet()

    for (const value of this.set.values()) {
      if (predicate(value, this)) {
        results.add(value)
      }
    }

    return results
  }

  /**
   * Returns the first item in the set matching the given `predicate`
   * function, or `undefined` if no such item was found.
   *
   * @param predicate
   *
   * @returns {*}
   */
  find (predicate: (item: T, set: SuperchargedSet<T>) => T | undefined): T | undefined {
    for (const value of this.set.values()) {
      if (predicate(value, this)) {
        return value
      }
    }
  }

  /**
   * Runs the given `action` on each item in the set.
   *
   * @param {Function} action
   */
  forEach (action: (item: T, set: SuperchargedSet<T>) => void): void {
    this.set.forEach((value: T) => {
      action(value, this)
    })
  }

  /**
   * Returns an array containing the results of applying the
   * given `transform` function to each item in the set.
   *
   * @param {Function} transform
   *
   * @returns {Array}
   */
  map<R> (transform: (item: T, set: SuperchargedSet<T>) => R): SuperchargedSet<R> {
    const results: SuperchargedSet<R> = new SuperchargedSet()

    this.forEach((item) => {
      results.add(transform(item, this))
    })

    return results
  }

  /**
   * Returns the size of the set.
   *
   * @returns {number}
   */
  size (): number {
    return this.set.size
  }

  /**
   * Returns an iterable of values in the set.
   *
   * @returns {IterableIterator}
   */
  values (): IterableIterator<T> {
    return this.set.values()
  }

  /**
   * Transforms this set into an array.
   *
   * @returns Array
   */
  toArray (): T[] {
    return Array.from(this.set)
  }
}
