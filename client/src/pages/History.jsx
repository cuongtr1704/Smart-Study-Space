import { useState } from "react";
import Tabs from "../components/Tabs";
import RoomsHistory from "../components/Rooms/RoomsHistory";
import SeatsHistory from "../components/Seats/SeatsHistory";
import { SiGoogleclassroom } from "react-icons/si";
import { MdEventSeat } from "react-icons/md";
import FilteredBookings from "../components/FilteredBookings";

const TABS = [
  { title: "Rooms", icon: <SiGoogleclassroom /> },
  { title: "Seats", icon: <MdEventSeat /> },
];

export default function History() {
  const [selected, setSelected] = useState(0);
  return (
    <>
      <section className="content">
        <div>
          <FilteredBookings />
          <Tabs tabs={TABS} setSelected={setSelected}>
            {selected === 0 ? (
              <RoomsHistory />
            ) : (
              <SeatsHistory />
            )}
          </Tabs>
        </div>
      </section>
    </>
  )
}
