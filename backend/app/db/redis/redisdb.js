

const redis = require('redis');


class Redisdb {
    static create({ host, port }) {
        return new Redisdb({ host, port });
    }
    constructor({ host, port }) {
        try {
            this._client = redis.createClient({ port, host });
            console.log(`Connect REDIS ${host}:${port} OK`);
        } catch (e) {
            console.log("Connect REDIS ERROR:", e)
        }
    }

    close() {
        this._client.close();
    }

    get client() {
        return this._client
    }

    Hset(key, field, value) {
        try {
            this._client.HSET(key, field, value);
        } catch (e) {
            console.log("REDIS ERROR:", e)
        }
    }

    Hdel(key, field, value) {
        if (!field) {
            this._client.hdel(key);
        } else if (!value) {
            this._client.hdel(key, field);
        } else {
            this._client.hdel(key, field, value);
        }
    }

    HKeys(key) {
        return new Promise((resolve, reject) => {
            this._client.hkeys(key, function (err, res) {
                if (err) {
                    reject(err);
                }
                if (!res) {
                    resolve(null);
                    return;
                }
                resolve(res);
                return;
            });
        });
    }

    Hget(key, field) {
        return new Promise((resolve, reject) => {
            this._client.hget(key, field, function (err, res) {
                if (err) {
                    reject(err);
                }
                if (!res) {
                    resolve(null);
                    return;
                }
                resolve(res);
                return;
            });
        });
    }

    Hgetall(key) {
        return new Promise((resolve, reject) => {
            this._client.hgetall(key, (error, value) => {
                if (error) {
                    reject(error);
                    console.log(`Redis hgetall error] ${error}.red`);
                } else {
                    if (!value)
                        return resolve({})
                    let result = {};
                    for (let [_key, _value] of Object.entries(value)) {
                        try {
                            result[_key] = JSON.parse(_value);
                        } catch (error) {
                            result[_key] = _value;
                        }
                    }
                    resolve(result)
                }
            })
        })
    }

    Keys(key) {
        return new Promise((resolve, reject) => {
            this._client.KEYS(key + '*', function (err, res) {
                if (err) {
                    reject(err);
                }
                if (!res) {
                    resolve([]);
                    return;
                }
                resolve(res);
                return;
            });
        });
    }

    Set(key, value) {
        try {
            this._client.SET(key, value);
        } catch (e) {
            console.log("REDIS ERROR:", e)
        }
    }

    Del(key) {
        try {
            this._client.DEL(key);
        } catch (e) {
            console.log("REDIS ERROR:", e)
        }
    }
    SetExpire(key, value, seconds) {
        try {
            this._client.SETEX(key, seconds, value);
        } catch (e) {
            console.log("REDIS ERROR:", e)
        }
    }

    Get(key) {
        return new Promise((resolve, reject) => {
            this._client.get(key, function (err, res) {
                if (err) {
                    reject(err);
                }
                if (!res) {
                    resolve(null);
                    return;
                }
                resolve(res);
                return;
            });
        });
    }
    Incr(key) {
        try {
            this._client.INCR(key);
        } catch (e) {
            console.log("REDIS ERROR:", e)
        }
    }
    Decr(key) {
        try {
            this._client.DECR(key);
        } catch (e) {
            console.log("REDIS ERROR:", e)
        }
    }
    HIncrBy(key, field, increment) {
        try {
            this._client.HINCRBY(key, field, increment);
        } catch (e) {
            console.log("REDIS ERROR: ", e);
        }
    }
    Hvals(key) {
        try {
            return new Promise((resolve, reject) => {
                this._client.HVALS(key, function (err, res) {
                    if (err) {
                        reject([]);
                    }
                    if (!res) {
                        resolve([]);
                        return;
                    }
                    resolve(res);
                    return;
                });
            });
        } catch (e) {
            console.log("REDIS ERROR: ", e);
        }
    }
}

module.exports = Redisdb;