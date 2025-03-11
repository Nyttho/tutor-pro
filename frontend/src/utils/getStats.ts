export const getStudentsNb = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/student", {
            credentials: 'include'
        })
        const datas = await response.json()
        return datas.length
    } catch(err){
        console.error("Error fetching students")
    }
}