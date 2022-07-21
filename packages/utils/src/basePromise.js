function resolvePromise(prevPromise, currentValue, resolve, reject) {
  if (prevPromise === currentValue) {
    throw new Error('can not wait for self')
  }
  if (typeof currentValue === 'object' && currentValue !== null) {
    let called = false
    const then = currentValue.then
    if (then) {
      try {
        then.call(null, (value) => {
          if (!called) {
            called = true
            resolvePromise(prevPromise, value, resolve, reject)
          }
        }, (err) => {
          if (!called) {
            called = true
            reject(err)
          }
        })
      } catch (err) {
        if (!called) {
          called = true
          reject(err)
        }
      }
    } else {
      resolve(currentValue)
    }
  } else {
    resolve(currentValue)
  }
}
export class BasePromise {
  constructor(executor) {
    this.value = null
    this.reason = null
    this.status = PENDING
    this.onFulfill = []
    this.onReject = []
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onFulfill.forEach((fn) => {
          fn(value)
        })
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onReject.forEach((fn) => {
          fn(reason)
        })
      }
    }
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  then(onResolves, onRejects) {
    const onResolve = onResolves ? onResolves : v => v
    const onReject = onRejects ? onRejects : err => { throw new Error(err) }
    const thenPromise = new Promise((resolve, reject) => {
      if (this.status === PENDING) {
        this.onFulfill.push((value) => {
          setTimeout(() => {
            try {
              const x = onResolve(value)
              resolvePromise(this, x, resolve, reject)
            } catch (err) {
              onReject(err)
            }
          }, 0)
        })
        this.onReject.push((reason) => {
          setTimeout(() => {
            try {
              const x = onReject(reason)
              resolvePromise(this, x, resolve, reject)
            } catch (err) {
              onReject(err)
            }
          }, 0)
        })
      }
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onResolve(this.value)
            resolvePromise(this, x, resolve, reject)
          } catch (err) {
            onReject(err)
          }
        }, 0)
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onReject(this.reason)
            resolvePromise(this, x, resolve, reject)
          } catch (err) {
            onReject(err)
          }
        }, 0)
      }
    })
    return thenPromise
  }
}
