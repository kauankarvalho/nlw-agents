import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { CreateRoom } from "./pages/create-room"
import { Room } from "./pages/room"
import { RecordRoomAudio } from "./pages/record-room-audio"

const queryCliente = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryCliente}>
      <BrowserRouter>
        <Routes>
          <Route index element={<CreateRoom />} />
          <Route path="/sala/:roomId" element={<Room />} />
          <Route path="/sala/:roomId/audio" element={<RecordRoomAudio />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
