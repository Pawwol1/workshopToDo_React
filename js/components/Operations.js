import React, {useState} from "react";
import Operation from "./Operation";
import {createOperation} from "../api/operations";
import Button from "./Button";

function Operations({taskID, form, setForm, operations, setOperations, status}) {
  const [operationDescription, setOperationDescription] = useState("");

  /**
   * Create new operation in this task
   * @param {Object} e - Event object
   */
  const handleNewOperation = e => {
    e.preventDefault();

    const operation = {
      description: operationDescription,
      timeSpent: 0
    };

    /**
     * @function createOperation - API function
     */
    createOperation(taskID, operation, data => {

      /**
       * @function setOperations - update local state
       */
      setOperations(prevState => {
        return [
          data,
          ...prevState
        ];
      });

      // Hide new operation form
      setForm(false);

      // Reset operation form input
      setOperationDescription("");
    });
  };

  /**
   * Remove operation from local state
   * @param {string} id - ID of operation to remove
   */
  const handleRemoveOperation = id => {
    setOperations(prevState => prevState.filter(operation => operation.id !== id));
  };

  return (
    <>
      {form && (
        <div className="card-body">
          <form onSubmit={handleNewOperation}>
            <div className="input-group">
              <input type="text"
                     className="form-control"
                     placeholder="Operation description"
                     value={operationDescription}
                     onChange={e => setOperationDescription(e.target.value)}/>

              <div className="input-group-append">
                <Button color={"info"} icon="fas fa-plus-circle">Add</Button>
              </div>
            </div>
          </form>
        </div>
      )}

      <ul className="list-group list-group-flush">
        {operations.map(operation => (
          <Operation key={operation.id} {...operation} onRemoveOperation={handleRemoveOperation} status={status}/>
        ))}
      </ul>
    </>
  );
}

export default Operations;