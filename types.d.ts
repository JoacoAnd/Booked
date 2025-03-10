interface Book {
  id: string
  title: string
  author: string
  genre: string
  rating: number
  totalCopies: number
  availableCopies: number
  description: string
  coverColor: string
  coverUrl: string
  summary: string
  createdAt: Date | null
}
interface User {
  id: string
  fullName: string
  email: string
  universityId: number
  password: string
  universityCard: string
  status: "APPROVED" | "PENDING" | "REJECTED" | null
  role: "ADMIN" | "USER" | null
  lastActivityDate: string | null
  createdAt: Date | null
}

interface AuthCredentials {
  fullName: string
  email: string
  password: string
  universityId: number
  universityCard: string
}

interface BookParams {
  title: string
  author: string
  genre: string
  rating: number
  coverUrl: string
  coverColor: string
  description: string
  totalCopies: number
  summary: string
}

interface BorrowBookParams {
  bookId: string
  userId: string
}