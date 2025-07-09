import { Navigate, useParams } from "react-router-dom"

type RoomParams = {
  id: string
}

export function Room() {
  const params: RoomParams = useParams()

  if (!params.id) {
    return <Navigate to="/" replace />
  }

  return <div>Room details</div>
}
