import React, {useState} from "react";
import {removeOperation, updateOperation} from "../api/operations";
import Button from "./Button";

function Operation({description, id, onRemoveOperation, timeSpent: _timeSpent, status}) {
  const [timeSpentForm, setTimeSpentForm] = useState(false);
  const [timeSpent, setTimeSpent] = useState(_timeSpent);
  const [timeSpentInput, setTimeSpentInput] = useState("");

  /**
   * Update operation and save new time
   * @param {Object} e - Event object
   */
  const handleTimeSave = e => {
    e.preventDefault();

    // Validate input (number > 0)
    if (isNaN(parseInt(timeSpentInput)) || timeSpentInput < 0) {
      return;
    }

    const operation = {
      description,
      timeSpent: parseInt(timeSpent) + parseInt(timeSpentInput)
    };

    /**
     * @function updateOperation - API function
     */
    updateOperation(id, operation, data => {
      // Update local time spent state
      setTimeSpent(data.timeSpent);

      // Hide form
      setTimeSpentForm(false);
      setTimeSpentInput("");
    });
  };

  /**
   * Remove single operation from DB and local state
   */
  const handleRemove = () => {
    /**
     * @function removeOperation - API function
     */
    removeOperation(id, () => {
      /**
       * @function onRemoveOperation - Function from parent component passed by props
       * Function is updating local state
       */
      onRemoveOperation(id);
    });
  };

  const hours = Math.floor(timeSpent / 60);
  const minutes = timeSpent % 60;

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        {description}
        {timeSpent > 0 && (
          <span className="badge badge-success badge-pill ml-2">
            {hours}h {minutes}m
          </span>
        )}
      </div>


      {timeSpentForm && (
        <form onSubmit={handleTimeSave}>
          <div className="input-group input-group-sm">
            <input type="number"
                   className="form-control"
                   placeholder="Spent time in minutes"
                   value={timeSpentInput}
                   style={{width: "12rem"}}
                   onChange={e => setTimeSpentInput(e.target.value)}/>
            <div className="input-group-append">
              <Button color={"success"} outline icon={"fas fa-save"}/>
              <Button color={"dark"} outline icon={"fas fa-times"} onClick={() => setTimeSpentForm(false)}/>
            </div>
          </div>
        </form>
      )}

      {!timeSpentForm && (
        <div>
          {status === "open" && (
            <Button
              icon={"fas fa-clock"}
              color={"success"}
              outline
              small
              className={"mr-2"}
              onClick={() => setTimeSpentForm(true)}>
              Add time
            </Button>
          )}
          <Button icon={"fas fa-trash"} color={"danger"} outline small onClick={handleRemove}/>
        </div>
      )}
    </li>
  );
}

export default Operation;