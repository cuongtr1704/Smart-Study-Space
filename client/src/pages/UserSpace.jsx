import { useState } from "react";
import { SiGoogleclassroom } from "react-icons/si";
import { MdEventSeat } from "react-icons/md";
import { useParams, useSearchParams } from "react-router-dom";
import Tabs from "../components/Tabs";
import Rooms from "../components/Rooms/Rooms";
import Seats from "../components/Seats/Seats";
import FilteredBookings from "../components/FilteredBookings";

const TABS = [
  { title: "Rooms", icon: <SiGoogleclassroom /> },
  { title: "Seats", icon: <MdEventSeat /> },
];

export default function UserSpace() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [selected, setSelected] = useState(0);

  return (
    <>
      <section className="content">
        <div>
          <FilteredBookings />
          <Tabs tabs={TABS} setSelected={setSelected}>
            {selected === 0 ? (
              <Rooms />
            ) : (
              <Seats />
            )}
          </Tabs>
        </div>
      </section>
    </>
  );
}
