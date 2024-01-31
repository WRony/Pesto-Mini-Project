import { React, useState } from "react";

function Agecalculator() {
  const [date, setDate] = useState("");
  let [dobValue, setDOB] = useState("");
  const handleSetDate = (e) => {
    setDate(e.target.value);
  };
  let calculatedDOB = "";
  const calculateDOB = () => {
    let [year, day, month] = [0, 0, 0];

    const currentDate = new Date();
    year = parseInt(date.substring(0, 4));
    //console.log("year", date.substring(0, 4));
    month = parseInt(date.substring(5, 7));
    day = parseInt(date.substring(8, 10));
    //console.log("date", date);
    //console.log("month", date.substring(5, 7));
    //console.log("day", date.substring(8, 10));
    if (year === undefined || year === null || year === "" || isNaN(year)) {
      calculatedDOB = "Invalid DOB.";
    } else if (
      year > currentDate.getFullYear() ||
      (year === currentDate.getFullYear() &&
        month > currentDate.getMonth() + 1) ||
      (year === currentDate.getFullYear() && day > currentDate.getDate())
    ) {
      calculatedDOB = "DOB can not be in future";
    } else {
      let ageInYear = currentDate.getFullYear() - Number(year);
      let ageInMonth = currentDate.getMonth() + 1 - Number(month);
      let ageInDay = currentDate.getDate() - Number(day);
      if (
        currentDate.getMonth() + 1 < month ||
        currentDate.getMonth() + 1 === month
      ) {
        ageInYear--;
      }
      if (currentDate.getDate() < day) {
        ageInYear--;
      }
      if (ageInDay < 0) {
        const lastDayOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        ).getDate();
        ageInDay = ageInDay + lastDayOfMonth;
        ageInMonth--;
      }
      if (ageInMonth < 0) {
        ageInMonth = ageInMonth + 12;
      }
      if (ageInMonth >= 12) {
        ageInYear++;
        ageInMonth = 0;
      }

      if (ageInYear > 0 && ageInMonth > 0 && ageInDay > 0)
        calculatedDOB = `Your current age :: ${ageInYear} years ${ageInMonth} months ${ageInDay} days`;
      else if (ageInMonth > 0 && ageInDay > 0)
        calculatedDOB = `Your current age :: ${ageInMonth} months ${ageInDay} days`;
      else calculatedDOB = `Your current age :: ${ageInDay} days`;
    }

    setDOB((dobValue = calculatedDOB));
    //setDate("");
  };

  return (
    <div className="container">
      <h1>Calculate your age</h1>
      <div className="box-border-inner">
        <div className="box-border">
          <div>
            <label className="label" for="txtDOB">
              Your date of birth
            </label>
            <input
              type="date"
              className="date"
              id="txtDOB"
              placeholder="DD/MM/YYYY"
              name="dob"
              value={date}
              onChange={handleSetDate}
            ></input>
          </div>
          <div>
            <button
              className="btn"
              name="btnCalc"
              id="btnC"
              onClick={calculateDOB}
            >
              Calculate
            </button>
          </div>
          <h2>{dobValue}</h2>
        </div>
      </div>
    </div>
  );
}

export default Agecalculator;
