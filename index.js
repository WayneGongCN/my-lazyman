function _LazyMan (name) {
    this._taskQueue = []
    
    this._addTask(() => {
        console.log(`Hi ${name}`)
    })
    this._trigger()
}

_LazyMan.prototype._next = function () {
    const task = this._taskQueue.shift()
    task && task()
}

_LazyMan.prototype._makeTask = function (fn, wait) {
    return () => {
        setTimeout(() => {
            fn && fn()
            this._next()
        }, wait)
    }
}

_LazyMan.prototype._addTask = function (fn, wait = 0, first = false) {
    const task = this._makeTask(fn, wait)
    if (first) {
        this._taskQueue.unshift(task)
    } else {
        this._taskQueue.push(task)
    }
}

_LazyMan.prototype._trigger = function () {
    setTimeout(this._next.bind(this))
}

_LazyMan.prototype.eat = function (food) {
    this._addTask(() => {
        console.log(food)
    })
    return this
}

_LazyMan.prototype.sleep = function (wait) {
    this._addTask(() => {
        console.log(`Wait ${wait} after`)
    }, wait)
    return this
}

_LazyMan.prototype.sleepfirst = function (wait) {
    this._addTask(() => {
        console.log(`First wait ${wait}`)
    }, wait, true)
    return this
}

function LazyMan (name) {
    return new _LazyMan(name)
}
