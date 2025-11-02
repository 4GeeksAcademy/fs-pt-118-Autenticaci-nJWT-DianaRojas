const userServices = {}
const url = import.meta.env.VITE_BACKEND_URL
userServices.register = async (formData) => {
    try {
        const resp = await fetch(url + '/api/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if (!resp.ok) throw new Error('error registering')
        const data = await resp.json()

        return data
    } catch (error) {
        console.log(error)
    }
}

userServices.login = async(FormData) => {
    try {
        const resp = await fetch(url + '/api/login', {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(FormData)
        })
        if (!resp.ok) throw new Error("Error login")
        const data = await resp.json()
        return data

    } catch (error) {
        console.log(error)
    }

}


userServices.private = async () => {
    try {
        const resp = await fetch(url + '/api/private', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });
        if (!resp.ok) throw new Error('Error en private');
        const data = await resp.json();
        return data; // data debe tener { name, email, id, ... }
    } catch (error) {
        console.log(error);
        throw error;
    }
}



export default userServices