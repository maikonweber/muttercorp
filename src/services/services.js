// fetch

async function loginIn(email,password) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/loginadm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    const data = await response.json()
    console.log(data)
    return data
}


async function loginIn2(email,password) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/loginadm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    const data = await response.json()
    console.log(data)
    return data
}


async function getAllResult(token) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v2/telegramresult`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': `${token}`
        }
    })
    const data = await response.json()
    return data
}

async function getTable(token) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v2/getTable`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': `${token}`
        }
    })
    const data = await response.json()
    console.log(data)
    return data
}



module.exports = {
    loginIn,
    getAllResult,
    getTable
}
