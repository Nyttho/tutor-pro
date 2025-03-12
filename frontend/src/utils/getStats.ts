import { StudentType } from "../types/StudentType"

const backendUrl = import.meta.env.VITE_BACKEND

export const getStudents = async () => {
    try {
        const response = await fetch(`${backendUrl}/api/student`, {
            credentials: 'include'
        })
        const datas = await response.json()
        return datas.filter((student: StudentType) => student?.isActive)
    } catch(err){
        console.error("Error fetching students")
    }
}

export const getCourses = async () => {
    try {
        const today = new Date()
        const year = today.getFullYear()
        const month = today.getMonth() + 1
        const response = await fetch(`${backendUrl}/api/course?year=${year}&month=${month}`, {
             credentials: 'include'
        })
        const datas = await response.json()
        return datas
    } catch (err) {
        console.error("Error fetching courses")
    }
}