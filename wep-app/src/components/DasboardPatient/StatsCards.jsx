import { LuCalendarClock } from "react-icons/lu";
import { MdOutlineMessage } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";
export const StatsCards = () => {
    return (
      <div className="stats-cards">
        <div className="stats-card card_1">
          <div >
            <LuCalendarClock className="steps-icon" />
          </div>
          <div className="stats_text">
            <h4>170</h4>
            <p>Total Appointment Escumed Temp</p>
          </div>
        </div>
        <div className="stats-card card_2">
          <div>
            <MdOutlineMessage className="steps-icon"/>
          </div>
          <div className="stats_text">
            <h4>20</h4>
            <p>New Messages Escumed Temp</p>
          </div>
        </div>
        <div className="stats-card card_3">
          <div>
            <MdOutlineReviews className="steps-icon"/>
          </div>
          <div className="stats_text">
            <h4>50</h4>
            <p>Review Escumed Temp</p>
          </div>
        </div>
      </div>
    );
  };