import { useState } from "react";
import Tabs from "../components/Tabs";
import RoomsAttendance from "../components/Rooms/RoomsAttendance";
import SeatsAttendance from "../components/Seats/SeatsAttendance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SiGoogleclassroom } from "react-icons/si";
import { MdEventSeat } from "react-icons/md";

const TABS = [
  { title: "Rooms", icon: <SiGoogleclassroom /> },
  { title: "Seats", icon: <MdEventSeat /> },
];

export default function CheckAttendance() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const isAdmin = user?.isAdmin === true || user?.isAdmin === "true";
  const isEmployee = user?.isEmployee === true || user?.isEmployee === "true";

  useEffect(() => {
    if (!isAdmin && !isEmployee) {
      navigate("/userspace"); 
    }
  }, [isAdmin, isEmployee, navigate]);
  const [selected, setSelected] = useState(0);
  return (
    <>
      <section className="content">
        <div>
          <Tabs tabs={TABS} setSelected={setSelected}>
            {selected === 0 ? (
              <RoomsAttendance />
            ) : (
              <SeatsAttendance />
            )}
          </Tabs>
        </div>
      </section>
    </>
  )
}
