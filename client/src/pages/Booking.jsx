import {useState} from 'react'
import 'react-calendar/dist/Calendar.css'
import { SiGoogleclassroom } from "react-icons/si"
import Tabs from "../components/Tabs"
import RoomsBooking from "../components/Rooms/RoomsBooking"
import SeatsBooking from "../components/Seats/SeatsBooking"
import { MdEventSeat } from "react-icons/md"

const TABS = [
  { title: "Room", icon: <SiGoogleclassroom /> },
  { title: "Seat", icon: <MdEventSeat /> },
];

export default function Booking() {
  const [selected, setSelected] = useState(0);
  return (
    <>
      <section className="content">
        <div>
          <Tabs tabs={TABS} setSelected={setSelected}>
            {selected === 0 ? (
              <RoomsBooking />
            ) : (
              <SeatsBooking />
            )}
          </Tabs>
        </div>
      </section>
    </>
  )
}
